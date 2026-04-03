'use client';

import { motion, type Variants } from 'framer-motion';

const variants: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

export default function SectionTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
