'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));
}

export default function StarField({ count = 100 }: { count?: number }) {
  const stars = useMemo(() => generateStars(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          animate={{
            opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.3],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(200, 190, 255, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
