
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  type: 'weapon' | 'consumable' | 'sample' | 'tool';
}

const initialItems: InventoryItem[] = [
  {
    id: 'tranq-rifle',
    name: 'Tranquilizer Rifle',
    icon: '🔫',
    count: 1,
    description: 'Tranquilizer Rifle: 10 darts remaining',
    type: 'weapon'
  },
  {
    id: 'medkit',
    name: 'Medkit',
    icon: '🏥',
    count: 3,
    description: 'Medkit: Restores 50 HP',
    type: 'consumable'
  },
  {
    id: 'flare-gun',
    name: 'Flare Gun',
    icon: '🔥',
    count: 1,
    description: 'Flare Gun: Scares predators, 5 flares remaining',
    type: 'tool'
  },
  {
    id: 'spino-dna',
    name: 'Spinosaurus DNA',
    icon: '🧬',
    count: 3,
    description: 'Spinosaurus DNA Sample: High quality genetic material',
    type: 'sample'
  },
  {
    id: 'bio-scanner',
    name: 'Bio Scanner',
    icon: '📱',
    count: 1,
    description: 'Bio Scanner: Analyzes dinosaur genetic markers',
    type: 'tool'
  }
];

export const InventoryTab = () => {
  const [items, setItems] = useState(initialItems);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleUseItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'consumable' && item.count > 0) {
      setItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, count: Math.max(0, i.count - 1) } : i
      ));
      
      if (item.id === 'medkit') {
        console.log('Using medkit - healing 50 HP');
      }
    } else if (item.type === 'weapon' || item.type === 'tool') {
      console.log(`Equipping ${item.name}`);
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'weapon': return 'border-amber-orange/50 bg-amber-orange/10';
      case 'consumable': return 'border-bio-cyan/50 bg-bio-cyan/10';
      case 'sample': return 'border-jungle-green/50 bg-jungle-green/10';
      case 'tool': return 'border-bone-white/50 bg-bone-white/10';
      default: return 'border-bio-cyan/50 bg-bio-cyan/10';
    }
  };

  return (
    <div className="h-full">
      {/* Inventory Grid */}
      <div className="grid grid-cols-5 gap-1 h-full">
        {[...Array(15)].map((_, index) => {
          const item = items[index];
          return (
            <div
              key={index}
              className={cn(
                "aspect-square border rounded flex flex-col items-center justify-center cursor-pointer transition-all duration-200 relative group",
                item 
                  ? getItemTypeColor(item.type) + " hover:scale-105" 
                  : "border-obsidian-black/30 bg-obsidian-black/10"
              )}
              onMouseEnter={() => item && setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => item && handleUseItem(item.id)}
            >
              {item && (
                <>
                  {/* Item Icon */}
                  <div className="text-lg mb-1">{item.icon}</div>
                  
                  {/* Item Count */}
                  {item.count > 1 && (
                    <div className="absolute bottom-0 right-0 text-bone-white text-xs font-exo bg-obsidian-black/70 rounded-tl px-1">
                      x{item.count}
                    </div>
                  )}

                  {/* Hover Glow Effect */}
                  {hoveredItem === item.id && (
                    <div className="absolute inset-0 bg-bio-cyan/20 rounded animate-pulse pointer-events-none"></div>
                  )}

                  {/* Hover Strip */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-obsidian-black/70 transition-all duration-200 group-hover:w-4"></div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredItem && (
        <div className="absolute bottom-2 left-2 right-2 bg-obsidian-black/90 border border-bio-cyan/30 rounded p-2">
          {(() => {
            const item = items.find(i => i.id === hoveredItem);
            if (!item) return null;
            
            return (
              <div className="text-bone-white text-xs font-exo">
                {item.description}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
