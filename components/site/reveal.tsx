"use client";

/**
 * Subtle entrance animation for premium marketing sections and cards.
 */
import { Children, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
};

function createRevealVariants(distance: number): Variants {
  return {
    hidden: {
      opacity: 0,
      y: distance,
      scale: 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
  duration = 0.7,
  amount = 0.22,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={createRevealVariants(distance)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
};

/**
 * Coordinates card-level reveals so repeated sections enter with a calmer rhythm.
 */
export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  distance = 18,
  amount = 0.18,
  once = true,
}: RevealGroupProps) {
  const items = Children.toArray(children);

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          variants={createRevealVariants(distance)}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
