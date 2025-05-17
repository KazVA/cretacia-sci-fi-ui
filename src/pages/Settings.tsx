
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Settings = () => {
  const navigate = useNavigate();
  const [spores, setSpores] = useState<{ id: number; left: string; top: string; animationDuration: string }[]>([]);
  
  useEffect(() => {
    // Generate spores for the bioluminescent effect
    const generateSpores = () => {
      const newSpores = [];
      const sporeCount = 20; // Number of spores to generate
      
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
  }, []);

  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
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

      {/* Dark overlay with holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 backdrop-blur-[2px] z-0"></div>
      
      {/* Settings content */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full h-full pt-8 px-8">
        <h1 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-bio-cyan title-glow mb-8">
          SETTINGS
        </h1>
        
        <div className="w-full max-w-5xl bg-jungle-green/80 rounded-lg p-6 backdrop-blur-md border border-bio-cyan/30">
          <Tabs defaultValue="gameplay" className="w-full">
            <TabsList className="w-full grid grid-cols-5 mb-6">
              <TabsTrigger value="gameplay" className="font-orbitron text-bone-white data-[state=active]:text-bio-cyan transition-all">GAMEPLAY</TabsTrigger>
              <TabsTrigger value="graphics" className="font-orbitron text-bone-white data-[state=active]:text-bio-cyan transition-all">GRAPHICS</TabsTrigger>
              <TabsTrigger value="audio" className="font-orbitron text-bone-white data-[state=active]:text-bio-cyan transition-all">AUDIO</TabsTrigger>
              <TabsTrigger value="controls" className="font-orbitron text-bone-white data-[state=active]:text-bio-cyan transition-all">CONTROLS</TabsTrigger>
              <TabsTrigger value="accessibility" className="font-orbitron text-bone-white data-[state=active]:text-bio-cyan transition-all">ACCESSIBILITY</TabsTrigger>
            </TabsList>
            
            {/* Gameplay Tab Content */}
            <TabsContent value="gameplay" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-8">
                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Difficulty</label>
                  <ToggleGroup type="single" defaultValue="normal" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="easy" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Easy</ToggleGroupItem>
                    <ToggleGroupItem value="normal" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Normal</ToggleGroupItem>
                    <ToggleGroupItem value="hard" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Hard</ToggleGroupItem>
                    <ToggleGroupItem value="nightmare" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Nightmare</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* HUD Visibility */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">HUD Visibility</label>
                  <ToggleGroup type="single" defaultValue="on" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="on" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">On</ToggleGroupItem>
                    <ToggleGroupItem value="off" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Off</ToggleGroupItem>
                    <ToggleGroupItem value="custom" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Custom</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* Tooltips */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Tooltips</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="tooltips" defaultChecked />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
                
                {/* Autosave Frequency */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Autosave Frequency</label>
                  <ToggleGroup type="single" defaultValue="10" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="5" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">5 mins</ToggleGroupItem>
                    <ToggleGroupItem value="10" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">10 mins</ToggleGroupItem>
                    <ToggleGroupItem value="15" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">15 mins</ToggleGroupItem>
                    <ToggleGroupItem value="manual" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Manual</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* More gameplay options would go here */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Sprint Toggle</label>
                  <ToggleGroup type="single" defaultValue="hold" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="hold" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Hold</ToggleGroupItem>
                    <ToggleGroupItem value="toggle" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Toggle</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Crouch Toggle</label>
                  <ToggleGroup type="single" defaultValue="toggle" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="hold" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Hold</ToggleGroupItem>
                    <ToggleGroupItem value="toggle" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Toggle</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Fear Effect Intensity</label>
                  <ToggleGroup type="single" defaultValue="medium" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="low" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Low</ToggleGroupItem>
                    <ToggleGroupItem value="medium" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Medium</ToggleGroupItem>
                    <ToggleGroupItem value="high" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">High</ToggleGroupItem>
                    <ToggleGroupItem value="off" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Off</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </TabsContent>
            
            {/* Graphics Tab Content */}
            <TabsContent value="graphics" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-8">
                {/* Resolution */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Resolution</label>
                  <ToggleGroup type="single" defaultValue="1920x1080" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="1280x720" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">1280x720</ToggleGroupItem>
                    <ToggleGroupItem value="1920x1080" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">1920x1080</ToggleGroupItem>
                    <ToggleGroupItem value="2560x1440" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">2560x1440</ToggleGroupItem>
                    <ToggleGroupItem value="3840x2160" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">3840x2160</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* Display Mode */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Display Mode</label>
                  <ToggleGroup type="single" defaultValue="fullscreen" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="fullscreen" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Fullscreen</ToggleGroupItem>
                    <ToggleGroupItem value="windowed" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Windowed</ToggleGroupItem>
                    <ToggleGroupItem value="borderless" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Borderless</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* Graphics Quality */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Graphics Quality</label>
                  <ToggleGroup type="single" defaultValue="high" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="low" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Low</ToggleGroupItem>
                    <ToggleGroupItem value="medium" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Medium</ToggleGroupItem>
                    <ToggleGroupItem value="high" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">High</ToggleGroupItem>
                    <ToggleGroupItem value="ultra" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Ultra</ToggleGroupItem>
                    <ToggleGroupItem value="custom" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Custom</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* FOV Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">Field of View</label>
                    <span className="font-exo text-bone-white/70 text-sm">90°</span>
                  </div>
                  <Slider defaultValue={[90]} min={60} max={120} step={1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">60°</span>
                    <span className="font-exo text-bone-white/50 text-xs">120°</span>
                  </div>
                </div>
                
                {/* Motion Blur */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Motion Blur</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="motion-blur" />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
                
                {/* V-Sync */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">V-Sync</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="vsync" defaultChecked />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Audio Tab Content */}
            <TabsContent value="audio" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-8">
                {/* Master Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">Master Volume</label>
                    <span className="font-exo text-bone-white/70 text-sm">80%</span>
                  </div>
                  <Slider defaultValue={[80]} min={0} max={100} step={1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">0%</span>
                    <span className="font-exo text-bone-white/50 text-xs">100%</span>
                  </div>
                </div>
                
                {/* Music Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">Music Volume</label>
                    <span className="font-exo text-bone-white/70 text-sm">70%</span>
                  </div>
                  <Slider defaultValue={[70]} min={0} max={100} step={1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">0%</span>
                    <span className="font-exo text-bone-white/50 text-xs">100%</span>
                  </div>
                </div>
                
                {/* SFX Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">SFX Volume</label>
                    <span className="font-exo text-bone-white/70 text-sm">90%</span>
                  </div>
                  <Slider defaultValue={[90]} min={0} max={100} step={1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">0%</span>
                    <span className="font-exo text-bone-white/50 text-xs">100%</span>
                  </div>
                </div>
                
                {/* Ambient Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">Ambient Volume</label>
                    <span className="font-exo text-bone-white/70 text-sm">85%</span>
                  </div>
                  <Slider defaultValue={[85]} min={0} max={100} step={1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">0%</span>
                    <span className="font-exo text-bone-white/50 text-xs">100%</span>
                  </div>
                </div>
                
                {/* Predator Vocalization Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">Predator Vocalization</label>
                    <span className="font-exo text-bone-white/70 text-sm">100%</span>
                  </div>
                  <Slider defaultValue={[100]} min={0} max={100} step={1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">0%</span>
                    <span className="font-exo text-bone-white/50 text-xs">100%</span>
                  </div>
                </div>
                
                {/* Audio Output */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Audio Output</label>
                  <ToggleGroup type="single" defaultValue="headphones" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="stereo" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Stereo</ToggleGroupItem>
                    <ToggleGroupItem value="surround" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Surround</ToggleGroupItem>
                    <ToggleGroupItem value="headphones" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Headphones</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </TabsContent>
            
            {/* Controls Tab Content */}
            <TabsContent value="controls" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-8">
                {/* Mouse Sensitivity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">Mouse Sensitivity</label>
                    <span className="font-exo text-bone-white/70 text-sm">5.5</span>
                  </div>
                  <Slider defaultValue={[5.5]} min={0.1} max={10} step={0.1} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">Low</span>
                    <span className="font-exo text-bone-white/50 text-xs">High</span>
                  </div>
                </div>
                
                {/* Invert Y-Axis */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Invert Y-Axis</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="invert-y" />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
                
                {/* Controller Support */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Controller Support</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="controller" defaultChecked />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
                
                {/* Keybind Remapping */}
                <div className="space-y-4">
                  <h3 className="font-orbitron text-bio-cyan text-xl">Key Bindings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between bg-obsidian-black/50 p-3 rounded-md">
                      <span className="font-exo text-bone-white/90">Move Forward</span>
                      <button className="px-4 py-1 bg-jungle-green border border-bio-cyan/50 text-bio-cyan font-exo hover:bg-bio-cyan hover:text-obsidian-black transition-colors">W</button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-obsidian-black/50 p-3 rounded-md">
                      <span className="font-exo text-bone-white/90">Move Backward</span>
                      <button className="px-4 py-1 bg-jungle-green border border-bio-cyan/50 text-bio-cyan font-exo hover:bg-bio-cyan hover:text-obsidian-black transition-colors">S</button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-obsidian-black/50 p-3 rounded-md">
                      <span className="font-exo text-bone-white/90">Move Left</span>
                      <button className="px-4 py-1 bg-jungle-green border border-bio-cyan/50 text-bio-cyan font-exo hover:bg-bio-cyan hover:text-obsidian-black transition-colors">A</button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-obsidian-black/50 p-3 rounded-md">
                      <span className="font-exo text-bone-white/90">Move Right</span>
                      <button className="px-4 py-1 bg-jungle-green border border-bio-cyan/50 text-bio-cyan font-exo hover:bg-bio-cyan hover:text-obsidian-black transition-colors">D</button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-obsidian-black/50 p-3 rounded-md">
                      <span className="font-exo text-bone-white/90">Jump</span>
                      <button className="px-4 py-1 bg-jungle-green border border-bio-cyan/50 text-bio-cyan font-exo hover:bg-bio-cyan hover:text-obsidian-black transition-colors">SPACE</button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-obsidian-black/50 p-3 rounded-md">
                      <span className="font-exo text-bone-white/90">Sprint</span>
                      <button className="px-4 py-1 bg-jungle-green border border-bio-cyan/50 text-bio-cyan font-exo hover:bg-bio-cyan hover:text-obsidian-black transition-colors">SHIFT</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Accessibility Tab Content */}
            <TabsContent value="accessibility" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-8">
                {/* Colorblind Mode */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Colorblind Mode</label>
                  <ToggleGroup type="single" defaultValue="off" className="bg-obsidian-black/50 p-1 rounded-md">
                    <ToggleGroupItem value="off" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Off</ToggleGroupItem>
                    <ToggleGroupItem value="protanopia" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Protanopia</ToggleGroupItem>
                    <ToggleGroupItem value="deuteranopia" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Deuteranopia</ToggleGroupItem>
                    <ToggleGroupItem value="tritanopia" className="font-exo text-sm data-[state=on]:bg-bio-cyan data-[state=on]:text-obsidian-black">Tritanopia</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* High Contrast Mode */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">High Contrast Mode</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="high-contrast" />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
                
                {/* UI Scale */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-exo text-bone-white/90 text-xl">UI Scale</label>
                    <span className="font-exo text-bone-white/70 text-sm">100%</span>
                  </div>
                  <Slider defaultValue={[100]} min={50} max={150} step={5} className="w-full" />
                  <div className="flex justify-between">
                    <span className="font-exo text-bone-white/50 text-xs">50%</span>
                    <span className="font-exo text-bone-white/50 text-xs">150%</span>
                  </div>
                </div>
                
                {/* Motion Sickness Reduction */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Motion Sickness Reduction</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="motion-sickness" />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
                
                {/* Dyslexia-Friendly Font */}
                <div className="flex items-center justify-between">
                  <label className="font-exo text-bone-white/90 text-xl">Dyslexia-Friendly Font</label>
                  <div className="flex items-center gap-3">
                    <span className="text-bone-white/70 font-exo">Off</span>
                    <Switch id="dyslexia-font" />
                    <span className="text-bone-white/70 font-exo">On</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Bottom buttons */}
        <div className="w-full max-w-5xl flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="font-exo text-bone-white border-bio-cyan hover:bg-bio-cyan hover:text-obsidian-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <div className="space-x-4">
            <Button 
              variant="outline" 
              className="font-exo text-bone-white border-bio-cyan hover:bg-amber-orange hover:text-obsidian-black"
            >
              Reset to Defaults
            </Button>
            <Button 
              className="font-exo bg-bio-cyan text-obsidian-black hover:bg-amber-orange"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
      
      {/* Version info */}
      <div className="absolute bottom-4 left-4 text-bone-white/40 font-exo text-xs z-10">
        ALPHA v0.1 | © 2025 Cretacia Studios
      </div>
    </div>
  );
};

export default Settings;
