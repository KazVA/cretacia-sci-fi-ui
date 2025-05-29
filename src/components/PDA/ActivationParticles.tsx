
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export const ActivationParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      initialParticles.push({
        id: i,
        x: 50, // Center
        y: 50, // Center
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
      });
    }
    setParticles(initialParticles);

    // Animate particles
    const animate = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
          }))
          .filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-bio-cyan rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.life,
            boxShadow: `0 0 4px 1px rgba(0, 196, 180, ${particle.life * 0.8})`,
          }}
        />
      ))}
    </div>
  );
};
