
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import { ArrowRight } from 'lucide-react';

const MainMenu = () => {
  const [spores, setSpores] = useState<{ id: number; left: string; top: string; animationDuration: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate spores for the bioluminescent effect
    const generateSpores = () => {
      const newSpores = [];
      const sporeCount = 30; // Number of spores to generate
      
      for (let i = 0; i < sporeCount; i++) {
        newSpores.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 10}s`, // Random duration between 5-15s
        });
      }
      
      setSpores(newSpores);
    };

    generateSpores();

    // Simulate T-Rex rumble every 20 seconds
    const trexInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('shake');
        
        // Play T-Rex sound (we'll just simulate this with console log)
        console.log('T-Rex rumble played');
        
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove('shake');
          }
        }, 1000);
      }
    }, 20000);

    return () => {
      clearInterval(trexInterval);
    };
  }, []);

  const menuItems = [
    { label: 'New Game', action: () => console.log('New Game clicked') },
    { label: 'Load Game', action: () => console.log('Load Game clicked') },
    { label: 'Settings', action: () => navigate('/settings') },
    { label: 'Credits', action: () => console.log('Credits clicked') },
    { label: 'Exit', action: () => console.log('Exit clicked') },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-jungle-green overflow-hidden flex flex-col items-center justify-center"
      style={{ 
        backgroundImage: `url('/lovable-uploads/04dcea0c-65c6-4052-a6c2-05befcf1277c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bioluminescent spores */}
      {spores.map((spore) => (
        <div
          key={spore.id}
          className="floating-spore"
          style={{
            left: spore.left,
            top: spore.top,
            animationDuration: spore.animationDuration,
          }}
        />
      ))}

      {/* Dark overlay - reducing opacity to make background image more visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-0"></div>
      
      {/* T-Rex silhouette */}
      <div className="absolute right-20 bottom-10 h-40 w-56 opacity-30 z-10">
        <img src="/t-rex-silhouette.png" alt="T-Rex" className="h-full w-full object-contain" />
      </div>

      {/* Menu content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="font-orbitron font-bold text-5xl md:text-7xl lg:text-8xl text-bone-white title-glow animate-pulse-glow">
          <span className="text-bio-cyan">CRE</span>TACIA
        </h1>

        {/* Menu buttons - positioned in the bottom left corner */}
        <div className="absolute bottom-32 left-10 flex flex-col items-start space-y-2 z-20">
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              label={item.label} 
              onClick={item.action} 
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="absolute bottom-24 left-10 font-exo text-xs text-bone-white/60 flex items-center gap-2 z-20">
          <span>Press</span>
          <ArrowRight size={14} className="text-bio-cyan" />
          <span>to select</span>
        </div>
      </div>

      {/* Version info */}
      <div className="absolute bottom-4 left-4 text-bone-white/40 font-exo text-xs z-10">
        ALPHA v0.1 | © 2025 Cretacia Studios
      </div>
    </div>
  );
};

export default MainMenu;
