'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SleepManagerProps {
  timeoutMs?: number; // default: 180,000ms (3 minutes)
  onSleepStateChange?: (sleeping: boolean) => void;
  onToast?: (msg: string, type: 'info' | 'success' | 'error') => void;
}

export default function SleepManager({
  timeoutMs = 180000, // 3 minutes
  onSleepStateChange,
  onToast,
}: SleepManagerProps) {
  const [isSleeping, setIsSleeping] = useState(false);
  const [secondsIdle, setSecondsIdle] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const wakeUp = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSecondsIdle(0);

    if (isSleeping) {
      setIsSleeping(false);
      window.dispatchEvent(new CustomEvent('app:wake'));
      if (onSleepStateChange) onSleepStateChange(false);
      if (onToast) onToast('Application resumed. 3D WebGL and serverless connections active.', 'info');
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      enterSleep();
    }, timeoutMs);
  }, [isSleeping, onSleepStateChange, onToast, timeoutMs]);

  const enterSleep = useCallback(() => {
    setIsSleeping(true);
    window.dispatchEvent(new CustomEvent('app:sleep'));
    if (onSleepStateChange) onSleepStateChange(true);
  }, [onSleepStateChange]);

  useEffect(() => {
    // Activity event listeners
    const handleActivity = () => {
      if (isSleeping) {
        wakeUp();
      } else {
        lastActivityRef.current = Date.now();
        setSecondsIdle(0);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          enterSleep();
        }, timeoutMs);
      }
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));

    // Start initial inactivity timer
    timerRef.current = setTimeout(() => {
      enterSleep();
    }, timeoutMs);

    // Idle ticker for display
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      setSecondsIdle(elapsed);
    }, 1000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enterSleep, isSleeping, timeoutMs, wakeUp]);

  if (!isSleeping) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Standby Energy & Serverless Saver Mode"
      onClick={wakeUp}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-grayscale transition-all duration-300 cursor-pointer select-none"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          wakeUp();
        }}
        className="relative bg-[var(--bg-card)] border border-[rgba(37,99,235,0.4)] rounded-lg max-w-md w-full p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center gap-4 animate-fade-in"
      >
        {/* Pulsing Standby Indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-amber-400"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
          </span>
        </div>

        <div>
          <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest font-semibold">
            Inactivity Standby (&gt; 3 Mins)
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--text-heading)] mt-1">
            Session Suspended
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
            No interaction detected for 3 minutes. Three.js 3D WebGL rendering, CPU cycles, and serverless connections are paused to conserve client and cloud resources.
          </p>
        </div>

        {/* Serverless Scale-to-Zero Info Badge */}
        <div className="w-full bg-[#030611] border border-[var(--border-subtle)] rounded p-3 text-left space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span>Cloud Compute:</span>
            <span className="text-emerald-400 font-semibold">Scale-to-Zero (0 W / $0)</span>
          </div>
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span>Neon DB State:</span>
            <span className="text-sky-400">Auto-Suspend Ready</span>
          </div>
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span>Local 3D WebGL:</span>
            <span className="text-amber-400">Render Loop Halted</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={wakeUp}
          className="w-full bg-[var(--accent-blue)] hover:bg-[#1d4ed8] text-white py-2.5 px-4 rounded-md text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Click Anywhere to Wake Up &amp; Resume</span>
        </button>

        <span className="text-[10px] text-[var(--text-faint)] font-mono">
          Moving your cursor or tapping also automatically wakes the application.
        </span>
      </div>
    </div>
  );
}
