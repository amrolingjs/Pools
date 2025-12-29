import React, { useEffect, useState } from 'react';

// SVG Paths for coins
const BitcoinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.24 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-8.088-3.087l.497-1.995-1.942.484.46-1.854-1.55-.386-.464 1.87c-.39-.1-.796-.192-1.203-.28l.45-1.83-1.55-.386-.466 1.86c-.32-.075-.638-.15-.95-.224l.004-.01-2.14.534.524 2.1s1.46-.365 1.482-.333c.27-.066.398.05.46.204l.76 3.053s-.103-.024.03.02l1.096 4.394c-.066.164-.236.415-.615.32l-1.5-.373-.77 3.094 2.015.503c.365.093.72.18 1.07.26l-.47 1.884 1.553.387.465-1.874c.42.115.828.22 1.23.318l-.466 1.88 1.55.385.474-1.91c2.645.5 4.636.295 5.472-2.094.676-1.928-.033-3.04-1.427-3.766.97-.224 1.7-.86 1.895-2.167.38-1.343-.035-2.12-.992-2.613z" />
  </svg>
);

const EthIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M15.925 23.96l-9.82-5.8 9.82 13.84 9.825-13.84-9.825 5.8zm0-23.96l-9.82 16.325 9.82 5.83 9.83-5.83-9.83-16.325zM15.925 18l-9.82-5.8 9.82-2.235 9.825 2.235-9.825 5.8z" />
  </svg>
);

const GenericCoin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" />
    <path d="M12 6v12M8 10h8M8 14h8" strokeWidth="2" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

interface CoinParticle {
  id: number;
  type: 'btc' | 'eth' | 'generic';
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
}

const CryptoBackground: React.FC = () => {
  const [particles, setParticles] = useState<CoinParticle[]>([]);

  useEffect(() => {
    // Generate random particles on client side to avoid hydration mismatch
    const count = 35; // Number of coins
    const newParticles: CoinParticle[] = [];

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let type: 'btc' | 'eth' | 'generic' = 'generic';
      if (typeRand > 0.6) type = 'btc';
      else if (typeRand > 0.3) type = 'eth';

      newParticles.push({
        id: i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10, // 10px to 40px
        duration: Math.random() * 10 + 10, // 10s to 20s rotation
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 base opacity
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep space gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020408]/50 to-[#020408] z-10" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute coin-3d"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-rotate ${p.duration}s infinite linear, twinkle ${p.duration * 0.5}s infinite ease-in-out alternate`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          {p.type === 'btc' && <BitcoinIcon className="w-full h-full text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />}
          {/* Swapped Indigo to Cyan for contrast against Purple theme */}
          {p.type === 'eth' && <EthIcon className="w-full h-full text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />}
          {p.type === 'generic' && <GenericCoin className="w-full h-full text-slate-600" />}
        </div>
      ))}
      
      {/* Extra "Stars" (tiny dots) for the Rolls Royce effect */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.5,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
            animationDelay: `-${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CryptoBackground;