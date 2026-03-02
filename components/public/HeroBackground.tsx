"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy" />

      {/* Topographic contour lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="white" strokeWidth="0.8">
          <path d="M-100,200 Q200,150 400,220 T800,180 T1200,250 T1600,200" />
          <path d="M-100,280 Q250,230 500,300 T900,260 T1300,330 T1600,280" />
          <path d="M-100,360 Q300,310 600,380 T1000,340 T1400,410 T1600,360" />
          <path d="M-100,440 Q200,400 450,460 T850,420 T1250,490 T1600,440" />
          <path d="M-100,520 Q250,470 500,540 T900,500 T1300,570 T1600,520" />
          <path d="M-100,600 Q300,560 600,620 T1000,580 T1400,650 T1600,600" />
          <path d="M-100,680 Q200,640 450,700 T850,660 T1250,730 T1600,680" />
          <path d="M-100,760 Q250,720 500,780 T900,740 T1300,810 T1600,760" />
        </g>
      </svg>

      {/* Bronze gradient accent bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-brand-bronze/5 to-transparent rounded-full blur-3xl" />

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[8%] w-20 h-20 border border-brand-bronze/15 rounded-full"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[15%] right-[12%] w-16 h-16 bg-white/5 rotate-45"
      />

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-warm to-transparent" />
    </div>
  );
}
