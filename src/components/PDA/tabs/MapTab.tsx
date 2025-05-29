
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MapTab = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isTracking, setIsTracking] = useState(false);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<string | null>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };

  const waypoints = [
    { id: 'lab', name: 'Lab Base', distance: '500m NW', x: 30, y: 20 },
    { id: 'river', name: 'River Delta', distance: '800m N', x: 60, y: 15 },
    { id: 'redwoods', name: 'Redwood Grove', distance: '1.2km E', x: 75, y: 45 },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Map Display */}
      <div className="relative flex-1 bg-jungle-green/20 rounded border border-bio-cyan/30 overflow-hidden">
        {/* Map Background */}
        <div 
          className="w-full h-full bg-gradient-to-br from-jungle-green/40 to-obsidian-black/60 relative transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Terrain Features */}
          <div className="absolute inset-0">
            {/* Rivers */}
            <div className="absolute top-2 left-8 w-16 h-1 bg-bio-cyan/40 rounded transform rotate-12"></div>
            <div className="absolute top-6 left-12 w-12 h-1 bg-bio-cyan/40 rounded transform -rotate-6"></div>
            
            {/* Redwood indicators */}
            <div className="absolute bottom-8 right-4 w-2 h-3 bg-jungle-green rounded-t-full"></div>
            <div className="absolute bottom-6 right-6 w-1 h-2 bg-jungle-green rounded-t-full"></div>
          </div>

          {/* Waypoints */}
          {waypoints.map(waypoint => (
            <div
              key={waypoint.id}
              className="absolute w-2 h-2 transform -translate-x-1 -translate-y-1 cursor-pointer"
              style={{ left: `${waypoint.x}%`, top: `${waypoint.y}%` }}
              onMouseEnter={() => setHoveredWaypoint(waypoint.id)}
              onMouseLeave={() => setHoveredWaypoint(null)}
            >
              <div className="w-full h-full bg-amber-orange rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-amber-orange/50 rounded-full animate-ping"></div>
              
              {/* Tooltip */}
              {hoveredWaypoint === waypoint.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-obsidian-black/90 text-bone-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  <div className="relative">
                    <div className="w-0 h-0.5 bg-obsidian-black/70 transition-all duration-200 animate-slide-in"></div>
                    {waypoint.name}: {waypoint.distance}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Player Position */}
          <div className="absolute w-2 h-2 bg-bio-cyan rounded-full animate-pulse" style={{ left: '45%', top: '60%' }}>
            <div className="absolute inset-0 bg-bio-cyan/50 rounded-full animate-ping"></div>
          </div>

          {/* Tracked Dinosaur */}
          {isTracking && (
            <div className="absolute w-2 h-2" style={{ left: '65%', top: '40%' }}>
              <div className="w-full h-full bg-amber-orange rounded-full animate-pulse"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-bone-white text-xs whitespace-nowrap">
                Spinosaurus: 300m E
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-2">
        {/* Zoom Controls */}
        <div className="flex gap-1">
          <button
            onClick={handleZoomIn}
            className="w-6 h-6 bg-bio-cyan/20 border border-bio-cyan/50 rounded text-bio-cyan hover:bg-bio-cyan/30 hover:text-bone-white transition-colors duration-200 flex items-center justify-center"
          >
            <Plus size={12} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-6 h-6 bg-bio-cyan/20 border border-bio-cyan/50 rounded text-bio-cyan hover:bg-bio-cyan/30 hover:text-bone-white transition-colors duration-200 flex items-center justify-center"
          >
            <Minus size={12} />
          </button>
        </div>

        {/* Track Button */}
        <button
          onClick={() => setIsTracking(!isTracking)}
          className={cn(
            "px-3 py-1 rounded text-xs font-exo transition-all duration-200 relative group",
            isTracking 
              ? "bg-amber-orange text-obsidian-black" 
              : "bg-amber-orange/20 border border-amber-orange/50 text-amber-orange hover:bg-amber-orange/30"
          )}
        >
          {isTracking ? 'Tracking' : 'Track'}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-obsidian-black/70 transition-all duration-200 group-hover:w-6"></div>
        </button>
      </div>
    </div>
  );
};
