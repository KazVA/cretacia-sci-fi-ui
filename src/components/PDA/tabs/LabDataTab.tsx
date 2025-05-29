
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface LabEntry {
  id: string;
  title: string;
  type: 'report' | 'task';
  preview: string;
  content: string;
  isActive?: boolean;
}

const labEntries: LabEntry[] = [
  {
    id: 'sp-004-report',
    title: 'Lab Report: Spinosaurus SP-004',
    type: 'report',
    preview: 'Spinosaurus SP-004 deployed at 07:09 PM IST, May 29, 2025.',
    content: 'Genetic modifications successful. Enhanced bioluminescence in dorsal sail. Speed reduced by 15% but aggression lowered by 30%. Recommend continued monitoring.'
  },
  {
    id: 'vr-dna-task',
    title: 'Task: Collect Velociraptor DNA Sample',
    type: 'task',
    preview: 'Priority: High. Location: Sector 3.',
    content: 'Locate Velociraptor in Sector 3. Use tranquilizer rifle to collect DNA sample. Exercise extreme caution - pack behavior detected.',
    isActive: false
  },
  {
    id: 'tr-analysis',
    title: 'Analysis: T-Rex Behavioral Patterns',
    type: 'report',
    preview: 'Aggression spikes detected during feeding hours.',
    content: 'T-Rex Alpha shows increased territorial behavior at dawn and dusk. Recommend avoiding direct contact during these periods.'
  }
];

export const LabDataTab = () => {
  const [hoveredEntry, setHoveredEntry] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [entries, setEntries] = useState(labEntries);

  const handleSetActive = (entryId: string) => {
    setEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, isActive: true } : entry
    ));
  };

  return (
    <div className="h-full flex flex-col">
      {selectedEntry ? (
        // Detailed View
        <div className="h-full">
          {(() => {
            const entry = entries.find(e => e.id === selectedEntry);
            if (!entry) return null;
            
            return (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-bone-white font-exo text-sm">{entry.title}</h3>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="text-bio-cyan hover:text-bone-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex-1 bg-jungle-green/10 rounded border border-bio-cyan/30 p-2 mb-2">
                  <div className="text-bone-white/90 text-xs font-exo leading-relaxed">
                    {entry.content}
                  </div>
                </div>

                {entry.type === 'task' && (
                  <button
                    onClick={() => handleSetActive(entry.id)}
                    className={cn(
                      "w-full py-1 rounded text-xs font-exo transition-colors duration-200",
                      entry.isActive
                        ? "bg-amber-orange text-obsidian-black"
                        : "bg-amber-orange/20 border border-amber-orange/50 text-amber-orange hover:bg-amber-orange/30"
                    )}
                  >
                    {entry.isActive ? 'Active Task' : 'Set Active'}
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        // List View
        <div className="h-full overflow-auto">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="p-2 rounded mb-1 cursor-pointer transition-all duration-200 relative group"
              onMouseEnter={() => setHoveredEntry(entry.id)}
              onMouseLeave={() => setHoveredEntry(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-bone-white font-exo text-sm">{entry.title}</div>
                    {entry.type === 'task' && entry.isActive && (
                      <div className="w-2 h-2 bg-amber-orange rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {hoveredEntry === entry.id && (
                    <div className="text-bone-white/70 text-xs mt-1 transition-opacity duration-200">
                      {entry.preview}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedEntry(entry.id)}
                  className="w-8 h-6 bg-bio-cyan/20 border border-bio-cyan/50 rounded text-bio-cyan text-xs hover:bg-bio-cyan/30 hover:text-bone-white transition-colors duration-200"
                >
                  View
                </button>
              </div>

              {/* Hover Strip */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-obsidian-black/70 transition-all duration-200 group-hover:w-32"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
