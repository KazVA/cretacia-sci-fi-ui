
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MapTab } from './tabs/MapTab';
import { DinosaursTab } from './tabs/DinosaursTab';
import { LabDataTab } from './tabs/LabDataTab';
import { CommsTab } from './tabs/CommsTab';
import { InventoryTab } from './tabs/InventoryTab';
import { ActivationParticles } from './ActivationParticles';
import { Map, Beef, FlaskConical, Radio, Package } from 'lucide-react';

type TabType = 'map' | 'dinosaurs' | 'lab-data' | 'comms' | 'inventory';

interface Tab {
  id: TabType;
  name: string;
  icon: React.ComponentType<any>;
}

const tabs: Tab[] = [
  { id: 'map', name: 'Map', icon: Map },
  { id: 'dinosaurs', name: 'Dinosaurs', icon: Beef },
  { id: 'lab-data', name: 'Lab Data', icon: FlaskConical },
  { id: 'comms', name: 'Comms', icon: Radio },
  { id: 'inventory', name: 'Inventory', icon: Package },
];

export const PDA = () => {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [isActivating, setIsActivating] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });
      const dateString = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      setCurrentTime(`${timeString} IST, ${dateString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Activation sequence
    setTimeout(() => setIsActivating(false), 300);

    return () => clearInterval(interval);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return <MapTab />;
      case 'dinosaurs':
        return <DinosaursTab />;
      case 'lab-data':
        return <LabDataTab />;
      case 'comms':
        return <CommsTab />;
      case 'inventory':
        return <InventoryTab />;
      default:
        return <MapTab />;
    }
  };

  return (
    <div className="fixed inset-0 bg-jungle-green/20 flex items-center justify-center p-8">
      {/* Activation Particles */}
      {isActivating && <ActivationParticles />}
      
      {/* Main PDA Container */}
      <div 
        className={cn(
          "relative w-[350px] h-[250px] transition-all duration-300",
          isActivating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        {/* Holographic Screen */}
        <div className="relative w-full h-full bg-obsidian-black/80 border-2 border-bio-cyan rounded-lg backdrop-blur-sm">
          {/* Holographic Glow Effect */}
          <div className="absolute -inset-1 bg-bio-cyan/20 rounded-lg blur-sm animate-pulse-subtle"></div>
          
          {/* Time Display */}
          <div className="absolute top-2 right-3 text-bone-white font-exo text-xs animate-pulse">
            {currentTime}
          </div>

          {/* Content Area */}
          <div className="flex h-full">
            {/* Tab Navigation */}
            <div className="w-12 flex flex-col border-r border-bio-cyan/30">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "h-10 flex items-center justify-center transition-all duration-200 relative group",
                      activeTab === tab.id 
                        ? "bg-bio-cyan/20 text-bio-cyan" 
                        : "text-bone-white/70 hover:text-bio-cyan hover:bg-bio-cyan/10"
                    )}
                  >
                    <IconComponent size={16} />
                    
                    {/* Hover Effect Strip */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-obsidian-black/70 transition-all duration-200 group-hover:w-8"></div>
                    
                    {/* Active Indicator */}
                    {activeTab === tab.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-bio-cyan"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
