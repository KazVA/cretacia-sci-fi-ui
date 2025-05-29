
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  title: string;
  avatar: string;
  lastMessage: string;
  fullMessage: string;
  responses: string[];
}

const contacts: Contact[] = [
  {
    id: 'elara',
    name: 'Dr. Elara',
    title: 'Lead Geneticist',
    avatar: '👩‍🔬',
    lastMessage: 'We need that Velociraptor DNA ASAP.',
    fullMessage: 'Player, the Velociraptor DNA is critical for our next experiment. Head to Sector 3 and report back once you have the sample.',
    responses: ['On my way', 'Need more time']
  },
  {
    id: 'kane',
    name: 'Dr. Kane',
    title: 'Field Operations',
    avatar: '👨‍💼',
    lastMessage: 'T-Rex activity increasing in Sector 7.',
    fullMessage: 'Heads up - we\'re seeing increased T-Rex territorial behavior in Sector 7. Avoid the area unless absolutely necessary.',
    responses: ['Understood', 'Send backup']
  },
  {
    id: 'nova',
    name: 'Nova Base',
    title: 'Command Center',
    avatar: '📡',
    lastMessage: 'Weather alert: Storm incoming.',
    fullMessage: 'Storm system approaching from the northwest. Estimated arrival in 2 hours. Seek shelter and secure all equipment.',
    responses: ['Copy that', 'Status update']
  }
];

export const CommsTab = () => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleSendReply = (response: string) => {
    console.log(`Sending reply: ${response}`);
    setSelectedContact(null);
  };

  return (
    <div className="h-full flex flex-col">
      {selectedContact ? (
        // Message View
        <div className="h-full">
          {(() => {
            const contact = contacts.find(c => c.id === selectedContact);
            if (!contact) return null;
            
            return (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{contact.avatar}</span>
                    <div>
                      <div className="text-bone-white font-exo text-sm">{contact.name}</div>
                      <div className="text-bone-white/70 text-xs">{contact.title}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-bio-cyan hover:text-bone-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Message */}
                <div className="flex-1 bg-jungle-green/10 rounded border border-bio-cyan/30 p-2 mb-2">
                  <div className="text-bone-white/90 text-xs font-exo leading-relaxed">
                    {contact.fullMessage}
                  </div>
                </div>

                {/* Response Options */}
                <div className="space-y-1">
                  {contact.responses.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendReply(response)}
                      className="w-full py-1 bg-bio-cyan/20 border border-bio-cyan/50 rounded text-bio-cyan text-xs hover:bg-bio-cyan/30 hover:text-bone-white transition-colors duration-200"
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        // Contact List
        <div className="h-full overflow-auto">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className="flex items-center p-2 rounded mb-1 cursor-pointer transition-all duration-200 relative group"
              onMouseEnter={() => setHoveredContact(contact.id)}
              onMouseLeave={() => setHoveredContact(null)}
            >
              {/* Avatar */}
              <div 
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-lg mr-2 transition-transform duration-200",
                  hoveredContact === contact.id ? "scale-120" : "scale-100"
                )}
              >
                {contact.avatar}
                {hoveredContact === contact.id && (
                  <div className="absolute inset-0 bg-bio-cyan/20 rounded-full"></div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="text-bone-white font-exo text-sm">{contact.name}</div>
                {hoveredContact === contact.id && (
                  <div className="text-bone-white/70 text-xs mt-1 transition-opacity duration-200">
                    {contact.lastMessage}
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <button
                onClick={() => setSelectedContact(contact.id)}
                className="w-8 h-6 bg-bio-cyan/20 border border-bio-cyan/50 rounded text-bio-cyan text-xs hover:bg-bio-cyan/30 hover:text-bone-white transition-colors duration-200"
              >
                Call
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
