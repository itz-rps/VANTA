import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface RiskScoreProps {
  score: number;
  max?: number;
  size?: number;
  className?: string;
}

export function RiskScore({ score, max = 10, size = 160, className }: RiskScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / max) * circumference;
  
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 8) return 'var(--color-vanta-crimson)';
    if (s >= 6) return 'var(--color-vanta-crimson)'; // High
    if (s >= 3) return 'var(--color-vanta-amber)';
    return 'var(--color-vanta-green)';
  };

  const getSeverity = (s: number) => {
    if (s >= 8) return 'CRITICAL';
    if (s >= 6) return 'HIGH';
    if (s >= 3) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-vanta-bg-tertiary)"
          strokeWidth="8"
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold font-mono tracking-tighter" style={{ color: getColor(score) }}>
          {animatedScore.toFixed(1)}
        </span>
        <span className="text-[10px] text-vanta-text-muted mt-1 font-bold tracking-widest uppercase">
          {getSeverity(score)} RISK
        </span>
      </div>
    </div>
  );
}
