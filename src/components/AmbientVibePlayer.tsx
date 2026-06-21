import { useEffect, useRef } from "react";

interface AmbientVibePlayerProps {
  isPlaying: boolean;
  onStateChange: (isPlaying: boolean, trackName: string) => void;
}

export default function AmbientVibePlayer({ isPlaying, onStateChange }: AmbientVibePlayerProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const padOscRef = useRef<OscillatorNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      startSynthesizer();
    } else {
      stopSynthesizer();
    }

    return () => {
      stopSynthesizer();
    };
  }, [isPlaying]);

  const startSynthesizer = () => {
    try {
      if (!audioCtxRef.current) {
        // Initialize AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Configure Main Output Gain
      mainGainRef.current = ctx.createGain();
      mainGainRef.current.gain.setValueAtTime(0, ctx.currentTime);
      mainGainRef.current.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5); // Warm fade-in
      mainGainRef.current.connect(ctx.destination);

      // 1. Create a warm base drone (Pad) mimicking a cello/acoustic acoustic resonance
      const padOsc = ctx.createOscillator();
      const padFilter = ctx.createBiquadFilter();
      const padGain = ctx.createGain();

      padOsc.type = "sine";
      padOsc.frequency.setValueAtTime(110, ctx.currentTime); // A2 chord root

      padFilter.type = "lowpass";
      padFilter.frequency.setValueAtTime(350, ctx.currentTime);

      padGain.gain.setValueAtTime(0.08, ctx.currentTime); // Quiet humming base

      padOsc.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(mainGainRef.current);

      padOsc.start();
      padOscRef.current = padOsc;
      padGainRef.current = padGain;

      // 2. Schedule airy pentatonic bell rings
      const pentatonicScales = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 698.46, 783.99]; // Warm min-pentatonic chord map

      const triggerBell = () => {
        if (!ctx || !mainGainRef.current) return;

        const now = ctx.currentTime;
        const frequency = pentatonicScales[Math.floor(Math.random() * pentatonicScales.length)];
        
        const bellOsc = ctx.createOscillator();
        const bellFilter = ctx.createBiquadFilter();
        const bellGain = ctx.createGain();

        // Elegant physical modeling structure
        bellOsc.type = "triangle";
        bellOsc.frequency.setValueAtTime(frequency, now);

        bellFilter.type = "bandpass";
        bellFilter.frequency.setValueAtTime(frequency * 1.5, now);
        bellFilter.Q.setValueAtTime(1.0, now);

        // Slow attack, long aesthetic decay bell envelope
        bellGain.gain.setValueAtTime(0, now);
        bellGain.gain.linearRampToValueAtTime(0.06, now + 0.1);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        bellOsc.connect(bellFilter);
        bellFilter.connect(bellGain);
        bellGain.connect(mainGainRef.current);

        bellOsc.start();
        bellOsc.stop(now + 5);

        // Schedule next note with humanized pacing
        const nextDelay = 1800 + Math.random() * 2500;
        synthTimerRef.current = window.setTimeout(triggerBell, nextDelay);
      };

      // Trigger first bells
      triggerBell();
      onStateChange(true, "ATELIER NO.4");
    } catch (e) {
      console.warn("Web Audio API not supported or gesture blocked", e);
      onStateChange(false, "ATELIER NO.4");
    }
  };

  const stopSynthesizer = () => {
    // Clear recurring bell scheduler
    if (synthTimerRef.current) {
      window.clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }

    // Wrap-up continuous ambient pad
    if (padOscRef.current) {
      try {
        padOscRef.current.stop();
      } catch (e) {}
      padOscRef.current = null;
    }

    // Fade out and release context
    if (mainGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      mainGainRef.current.gain.cancelScheduledValues(now);
      mainGainRef.current.gain.setValueAtTime(mainGainRef.current.gain.value, now);
      mainGainRef.current.gain.linearRampToValueAtTime(0, now + 0.5);
    }

    onStateChange(false, "ATELIER NO.4");
  };

  return null; // Silent controller
}
