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
    
    // Synthesize a cartoonish "goat moo" sound (blend of low cow moo and fast goat bleat)
    const fundamental = 120; // Low moo base pitch
    const oscs = [];
    const gainNode = ctx.createGain();
    
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.12, time);
    gainNode.gain.linearRampToValueAtTime(0.12, time + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
    
    // LFO for goat-like vibrato (waver)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(18, time); // 18Hz fast vibrato
    lfoGain.gain.setValueAtTime(15, time); // depth of 15Hz
    lfo.connect(lfoGain);
    
    // Harmonics for a rich brassy/bleaty texture
    const harmonics = [1, 1.8, 2.4, 3];
    harmonics.forEach((h, index) => {
      const osc = ctx.createOscillator();
      // Mix sawtooth (goat bleat) and triangle (cow moo)
      osc.type = index % 2 === 0 ? 'sawtooth' : 'triangle';
      
      // Pitch sweeps up from cow-moo level to a goat bleat, then back down
      osc.frequency.setValueAtTime(fundamental * h, time);
      osc.frequency.exponentialRampToValueAtTime(260 * h, time + 0.18);
      osc.frequency.linearRampToValueAtTime(160 * h, time + 0.55);
      
      // Connect LFO for that characteristic vibrating bleat
      lfoGain.connect(osc.frequency);
      
      const hGain = ctx.createGain();
      hGain.gain.setValueAtTime(0.8 / (index + 1), time);
      
      osc.connect(hGain);
      hGain.connect(gainNode);
      oscs.push(osc);
    });

    lfo.start(time);
    oscs.forEach(osc => osc.start(time));
    
    lfo.stop(time + 0.6);
    oscs.forEach(osc => osc.stop(time + 0.6));
  } catch (e) {
    console.warn("Could not play goat moo sound", e);
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
