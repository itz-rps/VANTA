import React, { useState } from 'react';
import { Attack } from '../types';
import { cn } from '../lib/utils';
import { Card, Badge } from './ui/Card';
import { Shield, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AttackCardProps {
  attack: Attack;
  index: number;
  key?: React.Key;
}

export function AttackCard({ attack, index }: AttackCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (attack.status) {
      case 'blocked': return 'border-vanta-green text-vanta-green';
      case 'passed': return 'border-vanta-crimson text-vanta-crimson';
      case 'firing': return 'border-vanta-blue text-vanta-blue animate-pulse-blue';
      default: return 'border-vanta-border text-vanta-text-muted';
    }
  };

  const getStatusIcon = () => {
    switch (attack.status) {
      case 'blocked': return <CheckCircle2 className="w-4 h-4" />;
      case 'passed': return <AlertTriangle className="w-4 h-4" />;
      case 'firing': return <Loader2 className="w-4 h-4 animate-spin" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-vanta-border" />;
    }
  };

  return (
    <Card className={cn(
      "border-l-4 transition-all duration-300",
      getStatusColor(),
      attack.status === 'pending' ? 'opacity-40' : 'opacity-100'
    )}>
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-4">
          <div className="text-vanta-text-muted text-xs font-mono font-bold w-6">#{String(index + 1).padStart(2, '0')}</div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              {getStatusIcon()}
              <span className="font-bold text-sm uppercase tracking-wide">
                {attack.status === 'pending' ? 'Queued' : attack.status === 'firing' ? 'Testing...' : attack.status.toUpperCase()}
              </span>
              <Badge variant="default" className="ml-2">{attack.attackType.replace('_', ' ')}</Badge>
            </div>
            <p className="text-vanta-text-secondary text-sm font-mono truncate max-w-md">
              {attack.attackMessage}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {attack.lobsterTrapResult && (
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-vanta-text-muted uppercase tracking-widest font-bold">Risk Score</span>
              <span className="text-lg font-bold font-mono">{attack.lobsterTrapResult.riskScore.toFixed(1)}</span>
            </div>
          )}
          {isExpanded ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-vanta-border bg-vanta-bg-tertiary/20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-bold text-vanta-text-muted uppercase tracking-widest mb-2 flex items-center gap-1">
                    Attack Vector
                  </h4>
                  <div className="bg-vanta-bg-primary border border-vanta-border p-4 rounded-lg font-mono text-xs leading-relaxed">
                    {attack.attackMessage}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-vanta-text-muted uppercase tracking-widest mb-2 flex items-center gap-1">
                    Agent Response
                  </h4>
                  <div className="bg-vanta-bg-primary border border-vanta-border p-4 rounded-lg font-mono text-xs leading-relaxed text-vanta-text-secondary">
                    {attack.agentResponse || (attack.status === 'firing' ? 'Generating...' : 'Awaiting simulation...')}
                  </div>
                </div>
              </div>

              {attack.lobsterTrapResult && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-vanta-border">
                  <div className="space-y-1">
                    <span className="text-[10px] text-vanta-text-muted uppercase tracking-widest">Action</span>
                    <div className="font-bold text-sm">{attack.lobsterTrapResult.action}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-vanta-text-muted uppercase tracking-widest">Intent Detected</span>
                    <div className="font-bold text-sm truncate">{attack.lobsterTrapResult.detectedIntent}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-vanta-text-muted uppercase tracking-widest">PII Detected</span>
                    <div className={cn("font-bold text-sm", attack.lobsterTrapResult.piiDetected ? "text-vanta-crimson" : "text-vanta-green")}>
                      {attack.lobsterTrapResult.piiDetected ? 'YES' : 'NO'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-vanta-text-muted uppercase tracking-widest">Injection</span>
                    <div className={cn("font-bold text-sm", attack.lobsterTrapResult.injectionDetected ? "text-vanta-crimson" : "text-vanta-green")}>
                      {attack.lobsterTrapResult.injectionDetected ? 'YES' : 'NO'}
                    </div>
                  </div>
                </div>
              )}

              {attack.analysis && (
                <div className="bg-vanta-blue/5 border border-vanta-blue/20 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-vanta-blue/10 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-vanta-blue" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-bold text-sm mb-1">Security Analysis</h5>
                        <p className="text-xs text-vanta-text-secondary leading-relaxed">{attack.analysis.explanation}</p>
                      </div>
                      <div className="bg-vanta-bg-primary/50 p-4 rounded-lg border border-vanta-blue/10">
                        <h5 className="font-bold text-[10px] uppercase tracking-widest text-vanta-blue mb-2">Recommended System Prompt Fix</h5>
                        <code className="text-xs text-vanta-text-primary block leading-relaxed italic">
                          {attack.analysis.fix}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
