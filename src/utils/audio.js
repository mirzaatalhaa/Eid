// Web Audio API Synthesizer for Whimsical Sound Effects
// Ensures no asset loading issues, works completely client-side.

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playPop = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    // Fast pitch sweep for pop sound
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.warn("Audio Context blocked or not supported", e);
  }
};

export const playTwinkle = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    // High-pitched crystal bell sound
    const pitch = 800 + Math.random() * 400;
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn(e);
  }
};

export const playBaa = () => {
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    // Synthesize a sheep-like "Maa/Baa" vibrato sound using multiple oscillators
    const fundamental = 160 + Math.random() * 20; // base sheep pitch
    const oscs = [];
    const gainNode = ctx.createGain();
    
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.08, time);
    gainNode.gain.linearRampToValueAtTime(0.08, time + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
    
    // Add LFO for vibrato/wavering effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(14, time); // Vibrato frequency (Hz)
    lfoGain.gain.setValueAtTime(12, time); // Vibrato depth (Hz)
    
    lfo.connect(lfoGain);
    
    // Add fundamental & harmonics
    const harmonics = [1, 1.5, 2, 2.5, 3];
    harmonics.forEach((h, index) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(fundamental * h, time);
      
      // Connect LFO to pitch for vibrato
      lfoGain.connect(osc.frequency);
      
      // Mute high harmonics more to sound softer/woolier
      const hGain = ctx.createGain();
      hGain.gain.setValueAtTime(1.0 / (index + 1), time);
      
      osc.connect(hGain);
      hGain.connect(gainNode);
      
      oscs.push(osc);
    });

    lfo.start(time);
    oscs.forEach(osc => osc.start(time));
    
    lfo.stop(time + 0.45);
    oscs.forEach(osc => osc.stop(time + 0.45));
  } catch (e) {
    console.warn(e);
  }
};

export const playSlide = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    // Swishing sound
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    console.warn(e);
  }
};
