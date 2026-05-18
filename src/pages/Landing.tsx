import React from 'react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Shield, Search, Zap, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingProps {
  onNavigate: (path: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="flex flex-col items-center px-4 py-20 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-vanta-bg-secondary border border-vanta-border px-4 py-1.5 rounded-full flex items-center gap-2">
            <span className="text-vanta-blue text-[10px] font-bold tracking-widest uppercase">Version 1.0 MVP</span>
          </div>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-vanta-text-secondary bg-clip-text text-transparent">
          Find how your AI agent breaks.<br />Before attackers do.
        </h1>
        <p className="text-xl text-vanta-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
          Automated red-teaming for any enterprise AI agent. 
          Powered by Gemini 2.0 + Lobster Trap deep inspection.
        </p>
        
        <div className="flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-vanta-blue fill-vanta-blue" />
            <span className="font-bold text-sm tracking-widest uppercase">Gemini 2.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-vanta-crimson fill-vanta-crimson" />
            <span className="font-bold text-sm tracking-widest uppercase">Lobster Trap</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative group cursor-not-allowed"
          onClick={(e) => e.preventDefault()}
        >
          {/* Tooltip */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-[#1A1A24] text-white text-xs p-4 rounded-xl border border-vanta-border/50 shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-center">
            Direct endpoint testing coming in v2.0 — paste your agent's API URL and Vanta attacks it live
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1A1A24] border-r border-b border-vanta-border/50"></div>
          </div>

          <Card className="p-8 h-full flex flex-col border-dashed opacity-60 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 tracking-widest">
              COMING SOON
            </div>
            <div className="w-12 h-12 bg-vanta-text-muted/10 rounded-lg flex items-center justify-center mb-6">
              <LinkIcon className="w-6 h-6 text-vanta-text-muted" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Direct Agent Testing</h2>
            <p className="text-vanta-text-secondary mb-8 leading-relaxed text-sm">
              Connect Vanta directly to your live agent endpoint. Real-time attack 
              simulation against your deployed agent API.
            </p>
            <div className="mt-auto">
              <Button 
                disabled
                className="w-full bg-vanta-bg-secondary text-vanta-text-muted border-vanta-border cursor-not-allowed hover:bg-vanta-bg-secondary"
              >
                Coming Soon
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 h-full flex flex-col hover:border-vanta-blue hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group">
            <div className="w-12 h-12 bg-vanta-blue/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-vanta-blue/20 transition-colors">
              <Zap className="w-6 h-6 text-vanta-blue" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Proactive Red Team</h2>
            <p className="text-vanta-text-secondary mb-8 leading-relaxed text-sm">
              Paste your agent's system prompt. Vanta fires 15 targeted attacks 
              and shows exactly where it leaks PII, ignores instructions, or exposes credentials.
            </p>
            <div className="mt-auto">
              <Button 
                onClick={() => onNavigate('/mode2')}
                className="w-full justify-between"
              >
                Test My Agent 
                <span className="ml-2">→</span>
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 h-full flex flex-col hover:border-vanta-crimson hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] group">
            <div className="w-12 h-12 bg-vanta-crimson/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-vanta-crimson/20 transition-colors">
              <Search className="w-6 h-6 text-vanta-crimson" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Forensic Audit</h2>
            <p className="text-vanta-text-secondary mb-8 leading-relaxed text-sm">
              Upload conversation logs from your deployed agent. Vanta finds 
              vulnerabilities that already happened in production — before you even knew they existed.
            </p>
            <div className="mt-auto">
              <Button 
                onClick={() => onNavigate('/mode3')}
                variant="danger"
                className="w-full justify-between"
              >
                Audit My Logs
                <span className="ml-2">→</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl opacity-80">
        <div>
          <div className="text-vanta-text-muted mb-2 font-bold text-xs tracking-widest uppercase">Step 01</div>
          <h3 className="text-lg font-bold mb-2">Input Context</h3>
          <p className="text-sm text-vanta-text-secondary">Paste your system prompt or upload production logs.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 -left-6 w-12 h-px bg-vanta-border" />
          <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-vanta-border" />
          <div className="text-vanta-text-muted mb-2 font-bold text-xs tracking-widest uppercase">Step 02</div>
          <h3 className="text-lg font-bold mb-2">AI Execution</h3>
          <p className="text-sm text-vanta-text-secondary">Gemini fires 15+ adversarial attacks. Lobster Trap scores every byte.</p>
        </div>
        <div>
          <div className="text-vanta-text-muted mb-2 font-bold text-xs tracking-widest uppercase">Step 03</div>
          <h3 className="text-lg font-bold mb-2">CISO Report</h3>
          <p className="text-sm text-vanta-text-secondary">Download a PDF vulnerability report with specific fix recommendations.</p>
        </div>
      </div>
    </div>
  );
}
