import React, { useMemo } from 'react';

const Background: React.FC = () => {
  // Extended list of symbols for Math, Physics, and Chemistry
  const symbols = [
    // Math
    "∑", "∫", "π", "√", "∞", "∆", "∂", "∇", "∀", "∃", "∈", "≠", "≈", 
    "sin", "cos", "tan", "log", "ln", "lim", "f(x)", "dy/dx", 
    "x", "y", "z", "α", "β", "θ", "λ",
    // Physics
    "Ω", "μ", "E=mc²", "F=ma", "λ", "ν", "ℏ", "ρ", "Φ", "Ψ", "ω",
    // Chemistry
    "H₂O", "CO₂", "NaCl", "O₂", "pH", "H⁺", "e⁻", "⏣", "⌬", "⚛", "→", "⇌"
  ];
  
  // Color palette specifically tuned for visibility
  // Dark mode colors made brighter/more opaque
  const colors = [
    'text-blue-600/40 dark:text-blue-400/50',    // Physics/Math - Blue
    'text-purple-600/40 dark:text-purple-400/50', // Math - Purple
    'text-slate-600/40 dark:text-slate-400/50',   // General - Slate
    'text-indigo-600/40 dark:text-indigo-400/50', // Chemistry - Indigo
    'text-cyan-600/40 dark:text-cyan-400/50',     // Physics - Cyan
    'text-emerald-600/40 dark:text-emerald-400/50' // Biology/Chem - Emerald
  ];

  // Generate evenly distributed particles using a grid system + noise
  const particles = useMemo(() => {
    const items = [];
    // Create a grid of e.g. 10x20 cells to ensure coverage
    const cols = 10;
    const rows = 20;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Base position based on grid
            const baseX = (c / cols) * 100;
            const baseY = (r / rows) * 100;
            
            // Add randomness within the cell
            const randomX = (Math.random() * (100 / cols)); 
            const randomY = (Math.random() * (100 / rows));

            items.push({
                id: `${r}-${c}`,
                char: symbols[Math.floor(Math.random() * symbols.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                left: (baseX + randomX) + "%",
                top: (baseY + randomY) + "%",
                size: Math.random() * 1.5 + 1.0 + "rem", // Slightly larger minimum size
                duration: Math.random() * 40 + 30 + "s", // Slower float
                delay: Math.random() * -50 + "s",
                // Higher opacity range: 0.3 to 0.7 for clear visibility
                opacity: Math.random() * 0.4 + 0.3, 
                rotation: Math.floor(Math.random() * 360)
            });
        }
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-100 dark:bg-slate-950 transition-colors duration-500">
      {/* Enhanced Radial Gradient for Dark Mode Visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200/80 via-transparent to-blue-100/50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-900/40"></div>

      {/* Stronger Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]" 
           style={{ 
             backgroundImage: `
                linear-gradient(#64748b 1px, transparent 1px), 
                linear-gradient(90deg, #64748b 1px, transparent 1px)
             `, 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Evenly Distributed Symbols */}
      {particles.map((p) => (
        <div 
            key={p.id}
            className={`absolute font-mono font-bold select-none animate-float ${p.color}`}
            style={{
                left: p.left,
                top: p.top,
                fontSize: p.size,
                opacity: p.opacity,
                transform: `rotate(${p.rotation}deg)`,
                animationDuration: p.duration,
                animationDelay: p.delay,
                filter: 'blur(0.3px)', // Minimal blur for crispness
                zIndex: -1,
                textShadow: '0 0 5px rgba(255,255,255,0.1)' // Subtle glow
            }}
        >
            {p.char}
        </div>
      ))}
      
      <style>{`
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(5deg); }
            66% { transform: translateY(15px) rotate(-5deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default Background;
