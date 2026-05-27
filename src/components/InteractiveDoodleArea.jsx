import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEdit, FiStar, FiMove } from 'react-icons/fi';
import { playPop, playSlide } from '../utils/audio';

const colors = [
  { name: 'Ink Blue 🖊️', value: '#221a0f' },
  { name: 'Royal Gold 🟡', value: '#d4af37' },
  { name: 'Forest Mint 🟢', value: '#006c52' },
  { name: 'Sweet Peach 🟠', value: '#ba1a1a' }
];

export default function InteractiveDoodleArea({ isMuted }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const stickerTrayRef = useRef(null);
  const doodleAreaRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#221a0f');
  const [brushSize, setBrushSize] = useState(5);
  const [selectedStickerId, setSelectedStickerId] = useState(null);

  const [activeStickers, setActiveStickers] = useState([]);

  const addSticker = (icon) => {
    if (!isMuted) playPop();
    const newId = Date.now();
    const randomLeft = `${20 + Math.random() * 50}%`;
    const randomTop = `${20 + Math.random() * 50}%`;
    setActiveStickers((prev) => [
      ...prev,
      { id: newId, icon, left: randomLeft, top: randomTop }
    ]);
  };

  const deleteSticker = (id, e) => {
    e.stopPropagation();
    if (!isMuted) playPop();
    setActiveStickers((prev) => prev.filter((s) => s.id !== id));
  };

  // Set up Drawing Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Scale for high DPI screens with fallback
    const width = canvas.offsetWidth || 400;
    const height = canvas.offsetHeight || 300;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Fill white-ish background initially
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update stroke values when color or size changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  // Handle Resize of drawing pad
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const tempImage = canvas.toDataURL();
    
    const width = canvas.offsetWidth || 400;
    const height = canvas.offsetHeight || 300;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    contextRef.current = context;

    const img = new Image();
    img.src = tempImage;
    img.onload = () => {
      context.drawImage(img, 0, 0, width, height);
    };
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [brushColor, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    setSelectedStickerId(null);
    let clientX, clientY;
    if (nativeEvent.touches) {
      clientX = nativeEvent.touches[0].clientX;
      clientY = nativeEvent.touches[0].clientY;
    } else {
      clientX = nativeEvent.clientX;
      clientY = nativeEvent.clientY;
    }

    const { left, top } = canvasRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    
    let clientX, clientY;
    if (nativeEvent.touches) {
      clientX = nativeEvent.touches[0].clientX;
      clientY = nativeEvent.touches[0].clientY;
      // Prevent scrolling when drawing on touch screens
      if (nativeEvent.cancelable) nativeEvent.preventDefault();
    } else {
      clientX = nativeEvent.clientX;
      clientY = nativeEvent.clientY;
    }

    const { left, top } = canvasRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    if (!isMuted) playPop();
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Clear stickers
    setActiveStickers([]);
  };

  return (
    <section id="doodles" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 bg-background relative">
      {/* Scribble divider */}
      <div className="absolute top-0 left-0 w-full px-6">
        <div className="scribble-divider"></div>
      </div>

      <div className="text-center mb-12 mt-8">
        <h2 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-5xl text-on-background mb-3 sm:mb-4">
          Whimsical <span className="text-secondary relative">Doodle Pad</span>
        </h2>
        <p className="font-body text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl mx-auto font-semibold">
          Sketch your own Eid drawings on the notebook page, or drag and play with cute stickers!
        </p>
      </div>

      <div ref={doodleAreaRef} className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-8 items-start max-w-5xl mx-auto">
        {/* Draw controls: Full width on mobile, Col span 3 on desktop */}
        <div className="w-full lg:col-span-3 bg-surface-container-high border-[3px] border-on-background rounded-2xl wobbly-border-sm p-4 sm:p-5 sticker-shadow flex flex-col gap-3 sm:gap-4">
          <h3 className="font-headline font-bold text-lg text-on-surface mb-2 flex items-center gap-1.5">
            <FiEdit className="text-secondary" />
            Drawing Tools
          </h3>

          {/* Color pickers */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-xs text-outline">Ink Color</span>
            <div className="flex flex-row flex-wrap sm:flex-col gap-1.5">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    if (!isMuted) playPop();
                    setBrushColor(c.value);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-lg text-xs font-headline font-bold border-2 transition-all flex items-center gap-2 ${
                    brushColor === c.value
                      ? 'border-on-background bg-surface-container-lowest shadow-sticker'
                      : 'border-outline-variant/30 bg-surface/50 opacity-90'
                  }`}
                >
                  <span className="w-4.5 h-4.5 rounded-full border border-on-background" style={{ backgroundColor: c.value }}></span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Widths */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="font-headline font-bold text-xs text-outline">Pen Nib Thickness</span>
            <div className="flex gap-2">
              {[3, 6, 12].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    if (!isMuted) playPop();
                    setBrushSize(size);
                  }}
                  className={`flex-1 py-1.5 text-xs font-headline font-bold rounded-lg border-2 text-center transition-all ${
                    brushSize === size
                      ? 'border-on-background bg-secondary text-on-secondary shadow-sticker'
                      : 'border-outline-variant/30 bg-surface/50 text-on-surface-variant'
                  }`}
                >
                  {size === 3 ? 'Thin' : size === 6 ? 'Medium' : 'Thick'}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Canvas */}
          <button
            onClick={clearCanvas}
            className="w-full bg-surface text-on-surface border-2 border-on-background hover:bg-surface-dim font-headline font-bold py-2.5 px-4 rounded-xl sticker-shadow sticker-btn flex items-center justify-center gap-1.5 text-xs mt-2"
          >
            <FiTrash2 />
            Clear Notebook
          </button>
        </div>

        {/* Notebook draw board: Full width on mobile, Col span 6 on desktop */}
        <div className="w-full lg:col-span-6 bg-surface-container-lowest border-[3px] border-on-background wobbly-border p-2 sm:p-3 relative sticker-shadow-lg overflow-hidden box-border">
          {/* Lined Notebook Side Hole Pattern */}
          <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-4 z-10 pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-background border-2 border-on-background rounded-full shadow-[inset_1px_1px_1px_rgba(0,0,0,0.2)]"></div>
            ))}
          </div>

          {/* Interactive drawing canvas */}
          <div 
            ref={canvasWrapperRef}
            className="w-full aspect-square sm:aspect-[4/3] relative overflow-hidden rounded-lg ml-4 sm:ml-5" 
            style={{ maxWidth: 'calc(100% - 1rem)' }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair bg-white border border-outline-variant/50 rounded-lg shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)] touch-none block"
            />

            {/* Draggable Stickers constrained strictly inside the drawing pad */}
            {activeStickers.map((sticker) => {
              const isSelected = selectedStickerId === sticker.id;
              return (
                <motion.div
                  key={sticker.id}
                  drag
                  dragConstraints={canvasWrapperRef}
                  dragElastic={0.05}
                  dragMomentum={false}
                  onPointerDown={() => setSelectedStickerId(sticker.id)}
                  onDragStart={() => {
                    setSelectedStickerId(sticker.id);
                    if (!isMuted) playSlide();
                  }}
                  onDragEnd={() => {
                    if (!isMuted) playPop();
                  }}
                  whileDrag={{ scale: 1.15, zIndex: 40 }}
                  className={`absolute text-4.5xl sm:text-5xl w-14 h-14 flex items-center justify-center cursor-grab active:cursor-grabbing select-none z-30 p-1 touch-none rounded-xl border-2 transition-all duration-200 ${
                    isSelected ? 'border-dashed border-secondary/50 bg-secondary/5' : 'border-transparent'
                  }`}
                  style={{ left: sticker.left, top: sticker.top }}
                >
                  {sticker.icon}
                  {isSelected && (
                    <button
                      onClick={(e) => deleteSticker(sticker.id, e)}
                      className="absolute -top-1 -right-1 bg-[#ba1a1a] text-white rounded-full w-5 h-5 text-[9px] flex items-center justify-center border-2 border-on-background shadow-md hover:scale-110 transition-transform cursor-pointer font-extrabold z-40"
                      title="Remove sticker"
                    >
                      ✕
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating sticker panel: Full width on mobile, Col span 3 on desktop */}
        <div className="w-full lg:col-span-3 bg-surface-container-low border-[3px] border-on-background rounded-2xl wobbly-border-sm p-4 sm:p-5 sticker-shadow flex flex-col gap-3 sm:gap-4 min-h-[220px] sm:min-h-[300px] relative bg-paper-grid z-20">
          <h3 className="font-headline font-bold text-base text-on-surface mb-1 flex items-center gap-1.5">
            <FiMove className="text-secondary animate-bounce" />
            Sticker Tray
          </h3>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-2 font-semibold">
            Tap a sticker to add it to your doodle board, then drag it around!
          </p>

          <div 
            ref={stickerTrayRef}
            className="relative flex-grow border-2 border-dashed border-outline-variant/50 rounded-xl min-h-[160px] p-2 bg-background/50"
          >
            {/* Stickers laid out as clickable buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center h-full min-h-[140px]">
              {['🐑', '🌙', '⭐'].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => addSticker(icon)}
                  className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl border-2 border-dashed border-outline-variant hover:border-solid hover:border-on-background hover:bg-surface-container-high hover:scale-110 active:scale-95 transition-all select-none cursor-pointer shadow-sm bg-surface"
                  title={`Add ${icon} sticker`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
