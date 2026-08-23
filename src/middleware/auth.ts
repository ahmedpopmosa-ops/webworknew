import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { db } from '../db/index.ts';
import { users } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split('Bearer ')[1];

  // Hardcoded Admin bypass
  if (token === 'admin-token-123') {
    req.user = { uid: 'admin', email: 'admin@webwork.com', role: 'admin' };
    next();
    return;
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    
    // Sync user to db
    const email = decodedToken.email || '';
    if (email) {
      await db.insert(users)
        .values({
          uid: decodedToken.uid,
          email: email,
          name: decodedToken.name || '',
          photo: decodedToken.picture || '',
        })
        .onConflictDoUpdate({
          target: users.uid,
          set: {
            email: email,
            name: decodedToken.name || '',
            photo: decodedToken.picture || '',
          },
        });
    }

    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};
