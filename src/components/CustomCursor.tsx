import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.classList.contains('magnetic')) {
        setIsHovering(true);
        if (target.dataset.cursorText) {
          setHoverText(target.dataset.cursorText);
        } else if (target.closest('[data-cursor-text]')) {
          setHoverText((target.closest('[data-cursor-text]') as HTMLElement).dataset.cursorText || '');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center text-white text-[8px] font-bold"
        animate={{
          x: mousePosition.x - (isHovering && hoverText ? 32 : isHovering ? 24 : 8),
          y: mousePosition.y - (isHovering && hoverText ? 32 : isHovering ? 24 : 8),
          scale: isHovering && hoverText ? 4 : isHovering ? 3 : 1,
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 1)' : 'rgba(255, 255, 255, 1)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {isHovering && hoverText && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tracking-widest"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
