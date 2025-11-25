import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Removed react-icons import
import { Send, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Assets
import molohImg from "@assets/generated_images/dark_atmospheric_2d_pixel_art_game_screenshot.png";
import goldyImg from "@assets/generated_images/bright_colorful_2d_pixel_art_platformer_game_screenshot.png";

// --- Types & Data ---

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contacts", label: "Contacts" },
];

// --- Components ---

const Header = ({ activeSection }: { activeSection: string }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40 h-16 md:h-20 flex items-center justify-center">
      <div className="container max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div 
          className="text-2xl font-bold font-display tracking-tight cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          320KETER
        </div>
        
        <nav className="grid grid-cols-4 gap-2 md:flex md:gap-8">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                px-3 py-1.5 text-sm md:text-base transition-all duration-300 rounded-md
                ${activeSection === section.id 
                  ? "text-foreground shadow-neon bg-secondary/50 font-medium" 
                  : "text-muted-foreground hover:text-foreground"}
              `}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

const ToolIcon = ({ label, icon }: { label: string, icon?: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-[70px] h-[70px] bg-secondary flex items-center justify-center rounded-lg text-muted-foreground hover:scale-105 transition-transform duration-300 shadow-sm border border-border/50">
       {icon || <span className="text-xs font-mono opacity-50">ICON</span>}
    </div>
    <span className="text-[0.85rem] text-muted-foreground font-medium">{label}</span>
  </div>
);

const GameCard = ({ 
  title, 
  description, 
  image, 
  status, 
  downloadLink,
  isDark 
}: { 
  title: string, 
  description: string, 
  image: string, 
  status: string, 
  downloadLink: string,
  isDark?: boolean
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="w-full max-w-2xl mx-auto bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-display font-bold">{title}</h3>
          {isExpanded && (
            <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
              {status}
            </span>
          )}
        </div>

        {/* Main Screenshot Placeholder */}
        <div className="relative aspect-video w-full bg-secondary rounded-lg overflow-hidden group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <img 
            src={image} 
            alt={`${title} Screenshot`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-black/10 ${isDark ? 'opacity-20' : 'opacity-0'}`} />
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 flex flex-col gap-6">
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-secondary rounded-md flex items-center justify-center text-xs text-muted-foreground/50 border border-border/50">
                Скриншот 2
              </div>
              <div className="aspect-video bg-secondary rounded-md flex items-center justify-center text-xs text-muted-foreground/50 border border-border/50">
                Скриншот 3
              </div>
            </div>

            <div className="pt-2">
              <a 
                href={downloadLink} 
                className="inline-block relative group text-foreground font-medium pb-1 cursor-pointer"
              >
                Download Now
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-green translate-y-[3px] transition-all duration-300 group-hover:h-[3px] group-hover:shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
              </a>
            </div>
          </div>
        </motion.div>

        {!isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full py-2 mt-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded hover:border-foreground/20 hover:bg-secondary/50"
          >
            БОЛЬШЕ
          </button>
        )}
        
        {isExpanded && (
             <button 
            onClick={() => setIsExpanded(false)}
            className="w-full py-2 mt-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded"
          >
            Close
          </button>
        )}
      </div>
    </motion.div>
  );
};

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (const section of sections) {
        if (!section) continue;
        const { offsetTop, offsetHeight } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-neon-green/20">
      <Header activeSection={activeSection} />

      <main className="container max-w-5xl mx-auto px-6 flex flex-col">
        
        {/* HOME SECTION */}
        <section 
          id="home" 
          className="min-h-screen flex flex-col items-center justify-center text-center scroll-mt-0 pt-16 relative"
        >
          <div className="absolute inset-x-0 top-0 h-[120px] hero-gradient pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-6 leading-[0.9]">
              Добро пожаловать<br/>в моё портфолио
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Creating immersive 2D experiences with passion and precision.
              <br />
              Exploring worlds through pixel art and code.
              <br />
              Building games that tell a story.
            </p>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section 
          id="about" 
          className="min-h-[60vh] flex flex-col items-center justify-center scroll-mt-[120px] py-20"
        >
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            <h2 className="text-3xl font-display font-bold mb-8">About Me</h2>
            <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
              I am a solo developer handling every aspect of game creation: from crafting pixel-perfect graphics and composing atmospheric soundscapes to writing clean, efficient code. My journey is driven by a love for storytelling and interactive art.
            </p>

            <div className="flex justify-center gap-8 md:gap-16">
              <ToolIcon label="Aseprite" icon={<div className="font-bold text-xs text-foreground/70">ASP</div>} />
              <ToolIcon label="Godot" icon={<div className="font-bold text-xs text-foreground/70">GDT</div>} />
              <ToolIcon label="Photoshop" icon={<div className="font-bold text-xs text-foreground/70">PS</div>} />
            </div>
          </motion.div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section 
          id="portfolio" 
          className="min-h-screen scroll-mt-[120px] py-20 pt-[120px]" 
        >
          <h2 className="text-3xl font-display font-bold text-center mb-16">Портфолио</h2>
          
          <div className="flex flex-col gap-12">
            <GameCard 
              title="Tale of Moloh" 
              status="Released"
              description="A dark, atmospheric 2D game exploring themes of isolation and mystery. Features a unique mixed Russian/English narrative style and low-light mechanics that challenge the player's perception."
              image={molohImg}
              isDark={true}
              downloadLink="#"
            />
            
            <GameCard 
              title="Goldy’s Journey" 
              status="In Development (25%)"
              description="A bright, dynamic 2D platformer focused on speed and precision. Currently 4 levels are complete, showcasing colorful environments and tight controls."
              image={goldyImg}
              isDark={false}
              downloadLink="#"
            />
          </div>
        </section>

        {/* CONTACTS SECTION */}
        <section 
          id="contacts" 
          className="min-h-[80vh] scroll-mt-[120px] py-20 flex flex-col justify-center"
        >
          <div className="w-full max-w-xl pl-0 md:pl-[50px] self-start mx-auto md:mx-0">
             <h2 className="text-3xl font-display font-bold mb-20">Контакты</h2> 
             
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="bg-secondary/50 border-transparent focus:border-neon-green focus:ring-0 transition-all shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} className="bg-secondary/50 border-transparent focus:border-neon-green focus:ring-0 transition-all shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can I help you?" className="min-h-[120px] bg-secondary/50 border-transparent focus:border-neon-green focus:ring-0 transition-all shadow-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto min-w-[140px] bg-transparent text-foreground border border-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all duration-300"
                >
                  Send
                </Button>
              </form>
            </Form>
            
            <div className="h-[3rem]" /> {/* Vertical spacer */}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 mt-12">
        <div className="container max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-sm font-medium text-white/60">Свяжитесь со мной:</span>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a href="tg://resolve?user=@KeTeR320" className="hover:text-neon-green transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="mailto:twiink320@gmail.com" className="hover:text-neon-green transition-colors font-bold text-lg leading-none">
                G
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
             <p className="text-xs italic text-white/40 mb-1">При поддержке Qwen</p>
             <p className="text-sm text-white/60">© {new Date().getFullYear()} 320KETER. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
