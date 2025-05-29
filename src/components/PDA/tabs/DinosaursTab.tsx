
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Dinosaur {
  id: string;
  name: string;
  species: string;
  speed: number;
  aggression: number;
  bioluminescence: number;
  thumbnail: string;
}

const dinosaurs: Dinosaur[] = [
  {
    id: 'SP-004',
    name: 'Spinosaurus SP-004',
    species: 'Spinosaurus',
    speed: 70,
    aggression: 40,
    bioluminescence: 80,
    thumbnail: '🦕'
  },
  {
    id: 'TR-001',
    name: 'T-Rex Alpha',
    species: 'Tyrannosaurus Rex',
    speed: 85,
    aggression: 95,
    bioluminescence: 30,
    thumbnail: '🦖'
  },
  {
    id: 'VR-003',
    name: 'Velociraptor Pack',
    species: 'Velociraptor',
    speed: 95,
    aggression: 80,
    bioluminescence: 60,
    thumbnail: '🦎'
  }
];

export const DinosaursTab = () => {
  const [hoveredDino, setHoveredDino] = useState<string | null>(null);
  const [selectedDino, setSelectedDino] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {selectedDino ? (
        // Detailed View
        <div className="h-full">
          {(() => {
            const dino = dinosaurs.find(d => d.id === selectedDino);
            if (!dino) return null;
            
            return (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-bone-white font-exo text-sm">{dino.name}</h3>
                  <button
                    onClick={() => setSelectedDino(null)}
                    className="text-bio-cyan hover:text-bone-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                
                {/* 3D Hologram */}
                <div className="flex-1 flex items-center justify-center bg-jungle-green/10 rounded border border-bio-cyan/30 mb-2">
                  <div className="text-4xl animate-spin" style={{ animationDuration: '12s' }}>
                    {dino.thumbnail}
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="floating-spore"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + (i % 3) * 20}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-1 text-xs font-exo">
                  <div className="flex justify-between">
                    <span className="text-bone-white/70">Speed:</span>
                    <span className="text-bio-cyan">{dino.speed}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bone-white/70">Aggression:</span>
                    <span className="text-amber-orange">{dino.aggression}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bone-white/70">Bioluminescence:</span>
                    <span className="text-bio-cyan">{dino.bioluminescence}%</span>
                  </div>
                </div>

                {/* Track Button */}
                <button className="mt-2 w-full py-1 bg-amber-orange/20 border border-amber-orange/50 rounded text-amber-orange text-xs hover:bg-amber-orange/30 transition-colors duration-200">
                  Track on Map
                </button>
              </div>
            );
          })()}
        </div>
      ) : (
        // List View
        <div className="h-full overflow-auto">
          {dinosaurs.map(dino => (
            <div
              key={dino.id}
              className="flex items-center p-2 rounded mb-1 cursor-pointer transition-all duration-200 relative group"
              onMouseEnter={() => setHoveredDino(dino.id)}
              onMouseLeave={() => setHoveredDino(null)}
            >
              {/* Thumbnail */}
              <div 
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-lg mr-2 transition-transform duration-200",
                  hoveredDino === dino.id ? "scale-120" : "scale-100"
                )}
              >
                {dino.thumbnail}
                {hoveredDino === dino.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="floating-spore"
                        style={{
                          left: `${10 + i * 15}%`,
                          top: `${20 + (i % 2) * 30}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="text-bone-white font-exo text-sm">{dino.name}</div>
                {hoveredDino === dino.id && (
                  <div className="text-bone-white/70 text-xs mt-1 transition-opacity duration-200">
                    Speed {dino.speed}%, Aggression {dino.aggression}%
                  </div>
                )}
              </div>

              {/* Details Button */}
              <button
                onClick={() => setSelectedDino(dino.id)}
                className="w-8 h-6 bg-bio-cyan/20 border border-bio-cyan/50 rounded text-bio-cyan text-xs hover:bg-bio-cyan/30 hover:text-bone-white transition-colors duration-200"
              >
                View
              </button>

              {/* Hover Strip */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-obsidian-black/70 transition-all duration-200 group-hover:w-24"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
