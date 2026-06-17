"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Drop = {
  id: string;
  title: string;
  slug: string;
  description: string;
  manifesto: string;
  status: string;
};

interface Props {
  drop: Drop;
  index: number;
}

const gradients = [
  "from-zinc-950 via-black to-zinc-900",
  "from-red-950 via-black to-black",
  "from-violet-950 via-black to-black",
  "from-cyan-950 via-black to-black",
  "from-stone-900 via-black to-black",
  "from-slate-900 via-black to-black",
  "from-emerald-950 via-black to-black",
  "from-black via-zinc-950 to-black",
];

const glowColors = [
  "bg-white/20",
  "bg-red-500/20",
  "bg-violet-500/20",
  "bg-cyan-500/20",
  "bg-amber-300/20",
  "bg-slate-300/20",
  "bg-emerald-400/20",
  "bg-white/10",
];

const quotes: Record<string, string> = {
  genesis: "Everything Starts Ugly.",
  scars: "Pain Printed.",
  "after-hours": "Sleep Can Wait.",
  static: "Become The Signal.",
  offline: "Log Out.",
  echoes: "Some Things Stay.",
  unknown: "Lost On Purpose.",
  void: "Nothing To Prove.",
};

export default function DropSection({ drop, index }: Props) {
  return (
    <section className="relative h-screen snap-start overflow-hidden">
      <Link
            href={`/drops/${drop.slug}`}
            className=""
          >

      {/* Background */}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradients[index % gradients.length]
        }`}
      />

      {/* Animated Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute left-1/2 top-1/2 h-[900px] w-[900px]
        -translate-x-1/2 -translate-y-1/2 rounded-full
        blur-[180px]
        ${glowColors[index % glowColors.length]}`}
      />

      {/* Grain */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Huge Background Title */}

      <motion.h1
        initial={{ opacity: 0, scale: .9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: .4 }}
        className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        whitespace-nowrap
        text-[20vw]
        font-black
        uppercase
        text-transparent
        [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]
        "
      >
        {drop.title}
      </motion.h1>

      {/* Number */}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: .06, y: 0 }}
        transition={{ duration: 1 }}
        className="
        absolute
        right-10
        top-8
        text-[150px]
        font-black
        leading-none
        text-white
        "
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* Content */}

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="
          mb-5
          uppercase
          tracking-[0.6em]
          text-zinc-500
          text-xs
          "
        >
          RAAVN DROP
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .1 }}
          className="
          text-6xl
          md:text-8xl
          lg:text-9xl
          font-black
          uppercase
          "
        >
          {drop.title}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 140 }}
          transition={{ delay: .2 }}
          className="mt-8 h-px bg-white"
        />

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="
          mt-10
          text-4xl
          md:text-6xl
          font-semibold
          italic
          "
        >
          {quotes[drop.slug]}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="
          mt-10
          max-w-2xl
          text-zinc-400
          leading-8
          "
        >
          {drop.manifesto}
        </motion.p>
                {/* Status */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <span
            className="
            rounded-full
            border
            border-white/20
            bg-white/5
            px-6
            py-2
            text-xs
            uppercase
            tracking-[0.35em]
            backdrop-blur-xl
            "
          >
            {drop.status}
          </span>
        </motion.div>

        {/* Explore */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          
            <motion.div
              whileHover={{ width: 180 }}
              transition={{
                duration: .4,
              }}
              className="h-px w-28 bg-white"
            />

            <div
              className="
              flex
              items-center
              gap-3
              uppercase
              tracking-[0.45em]
              text-sm
              "
            >
              Explore Collection

              <motion.span
                whileHover={{
                  x: 10,
                }}
              >
                →
              </motion.span>
            </div>

        </motion.div>

      </div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
        absolute
        bottom-10
        left-1/2
        -translate-x-1/2
        text-white/40
        "
      >
        <div className="flex flex-col items-center gap-3">

          <span
            className="
            text-[10px]
            uppercase
            tracking-[0.4em]
            "
          >
            Scroll
          </span>

          <div
            className="
            h-12
            w-px
            bg-white/30
            "
          />

        </div>
      </motion.div>
          </Link>
    </section>
  );
}