'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GlowButton from '@/components/ui/GlowButton';
import StarField from './StarField';

export default function LandingHero() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-void overflow-hidden">
      <StarField count={120} />

      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.06] bg-arcane blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-[0.04] bg-oracle blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-4 text-center max-w-2xl">
        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-arcane/50 text-5xl"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          ✦
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h1
            className="font-serif text-6xl md:text-7xl font-light tracking-[0.15em] text-white/90 text-glow-arcane"
            style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.12em' }}
          >
            Tarot Within
          </h1>
          <p
            className="font-serif text-xl text-arcane-light/70 tracking-[0.25em] font-light"
            style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.3em' }}
          >
            塔 罗 之 内
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="font-sans font-light text-white/35 text-base md:text-lg tracking-wider leading-relaxed max-w-md"
        >
          答案早已存在于你的内心深处
          <br />
          <span className="text-white/20">塔罗是镜，映照你已知的一切</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
        >
          <GlowButton
            onClick={() => router.push('/reading')}
            size="lg"
            variant="arcane"
          >
            开始占卜
          </GlowButton>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center gap-4 mt-4"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-arcane/40" />
          <span className="text-white/20 text-xs font-sans tracking-widest">MAJOR ARCANA</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-arcane/40" />
        </motion.div>
      </div>
    </div>
  );
}
