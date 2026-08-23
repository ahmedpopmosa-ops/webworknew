import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 flex flex-col items-center justify-center">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-8xl font-black mb-4"
      >
        404
      </motion.h1>
      <p className="text-2xl text-slate-400 mb-8">Page Not Found</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition-colors">
        Go Home
      </Link>
    </div>
  );
}
