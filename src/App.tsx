/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  MessageCircle, 
  Instagram, 
  ChevronRight, 
  Search,
  TrendingUp,
  UserCheck,
  ShoppingBag,
  Settings,
  PenTool,
  Link as LinkIcon,
  MapPin,
  Target,
  Globe,
  Facebook,
  Award,
  ShieldCheck,
  Star,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react';
import { motion, LazyMotion, domAnimation, AnimatePresence } from 'motion/react';
import { useState, useEffect, Suspense, lazy, useRef, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";

// Lazy load the floating button to reduce initial bundle size and execution time
const FloatingWhatsApp = lazy(() => Promise.resolve({
  default: () => (
    <motion.a 
      href="https://wa.me/5569992198494?text=Olá%20gostaria%20de%20fazer%20uma%20consultoria."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  )
}));

// Deferred Icon component to prioritize text rendering
const DeferredIcon = ({ Icon, color, delay = 0 }: { Icon: any, color: string, delay?: number }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!mounted) {
    return <div className="w-6 h-6 rounded-full bg-gray-100/20 animate-pulse" />;
  }

  return <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />;
};

const LINKS = [
  {
    id: 'whatsapp',
    title: 'Consultoria de SEO no WhatsApp',
    subtitle: 'Atendimento imediato e personalizado para seu negócio',
    Icon: MessageCircle,
    iconColor: '#25D366',
    url: 'https://wa.me/5569992198494?text=Olá%20gostaria%20de%20fazer%20uma%20consultoria.',
    color: 'bg-[#25D366]/10'
  },
  {
    id: 'conteudo',
    title: 'Criação de Conteúdo SEO Otimizado',
    subtitle: 'Textos estratégicos que ranqueiam no Google e convertem',
    Icon: PenTool,
    iconColor: '#34A853',
    url: '#',
    color: 'bg-[#34A853]/10'
  },
  {
    id: 'linkbuilding',
    title: 'Link Building de Alta Autoridade',
    subtitle: 'Conquiste autoridade real para o seu domínio com backlinks',
    Icon: LinkIcon,
    iconColor: '#4285F4',
    url: '#',
    color: 'bg-[#4285F4]/10'
  },
  {
    id: 'ecommerce',
    title: 'SEO para E-commerce e Lojas Virtuais',
    subtitle: 'Aumente as vendas e a visibilidade da sua loja online',
    Icon: ShoppingBag,
    iconColor: '#EA4335',
    url: '#',
    color: 'bg-[#EA4335]/10'
  },
  {
    id: 'consultoria',
    title: 'Consultoria de SEO Personalizada',
    subtitle: 'Estratégias sob medida para o crescimento do seu negócio',
    Icon: UserCheck,
    iconColor: '#4285F4',
    url: '#',
    color: 'bg-[#4285F4]/10'
  },
  {
    id: 'tecnico',
    title: 'SEO Técnico e Auditoria de Sites',
    subtitle: 'Otimização de velocidade, UX e indexação técnica',
    Icon: Settings,
    iconColor: '#FBBC05',
    url: '#',
    color: 'bg-[#FBBC05]/10'
  },
  {
    id: 'local',
    title: 'SEO Local e Google Meu Negócio',
    subtitle: 'Domine as buscas na sua região e atraia clientes locais',
    Icon: MapPin,
    iconColor: '#EA4335',
    url: '#',
    color: 'bg-[#EA4335]/10'
  },
  {
    id: 'cro',
    title: 'CRO – Otimização de Conversão',
    subtitle: 'Transforme visitantes em clientes com foco em resultados',
    Icon: Target,
    iconColor: '#FBBC05',
    url: '#',
    color: 'bg-[#FBBC05]/10'
  },
  {
    id: 'geo',
    title: 'GEO – Otimização para IA',
    subtitle: 'Prepare seu site para as buscas generativas da nova era',
    Icon: Globe,
    iconColor: '#34A853',
    url: '#',
    color: 'bg-[#34A853]/10'
  }
];

const TRUST_CARDS = [
  {
    id: 'experience',
    title: 'Experiência',
    description: 'Anos de atuação no mercado digital, entregando resultados consistentes para diversos nichos.',
    Icon: Award,
    color: 'text-blue-600'
  },
  {
    id: 'expertise',
    title: 'Especialização',
    description: 'Domínio técnico avançado em SEO, Link Building e Otimização de Conversão.',
    Icon: Star,
    color: 'text-yellow-500'
  },
  {
    id: 'authority',
    title: 'Autoridade',
    description: 'Reconhecido como referência em posicionamento orgânico e estratégias de topo de funil.',
    Icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    id: 'trust',
    title: 'Confiança',
    description: 'Transparência total em relatórios e foco absoluto no ROI do cliente.',
    Icon: ShieldCheck,
    color: 'text-red-500'
  }
];

export default function App() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiResponseRef = useRef<HTMLDivElement>(null);

  const handleAiConsult = async (e: FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setIsAiLoading(true);
    setAiResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Você é um consultor de SEO especialista da agência Alan SEO. Responda de forma curta e profissional em português. Pergunta: ${aiInput}`,
        config: {
          systemInstruction: "Você é o Alan, um especialista em SEO. Seja prestativo, técnico e focado em resultados orgânicos.",
        }
      });
      setAiResponse(response.text || 'Desculpe, não consegui processar sua dúvida agora.');
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse('Erro ao conectar com a consultoria de IA. Tente novamente mais tarde.');
    } finally {
      setIsAiLoading(false);
      setTimeout(() => {
        aiResponseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  useEffect(() => {
    // Defer the loading of the WhatsApp button to after the main content is ready
    const timer = setTimeout(() => setShowWhatsApp(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">
      {/* Skip to content link for keyboard accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4285F4] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4]"
      >
        Pular para o conteúdo principal
      </a>

      {/* Background Accent Image */}
      <div className="absolute top-0 left-0 w-full h-[320px] -z-10 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/seo-marketing/1200/320?blur=2" 
          alt="" 
          role="presentation"
          className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority="high"
          width="1200"
          height="320"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4285F4]/40 to-[#F8F9FA]" />
      </div>

      <main id="main-content" className="max-w-2xl mx-auto px-6 pt-12">
        {/* Profile Section */}
        <header>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white profile-img-container animate-pulse">
                <img 
                  src="https://unavatar.io/instagram/alan.gseo" 
                  alt="Foto de perfil de Alan SEO" 
                  className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                  width="128"
                  height="128"
                  decoding="sync"
                  onLoad={(e) => {
                    e.currentTarget.classList.remove('opacity-0');
                    e.currentTarget.parentElement?.classList.remove('animate-pulse');
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#4285F4] text-white p-2 rounded-full shadow-lg">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Alan SEO – Especialista em Posicionamento no Google</h1>
            <h2 className="text-[#1967D2] font-semibold text-sm tracking-wide uppercase mb-4">Consultoria de SEO e Estratégias de Marketing Digital</h2>
            
            <div className="max-w-[280px]">
              <p className="text-gray-800 text-sm leading-relaxed">
                Aumente o tráfego orgânico do seu site, conquiste clientes qualificados e transforme sua presença digital em uma máquina de vendas com estratégias de SEO personalizadas.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Links Section - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {LINKS.map((link, index) => {
            const isClickable = link.url !== '#';
            const CardWrapper = isClickable ? motion.a : motion.div;
            const isFullWidth = link.id === 'whatsapp';
            
            return (
              <CardWrapper
                key={link.id}
                {...(isClickable ? { 
                  href: link.url, 
                  target: "_blank", 
                  rel: "noopener noreferrer",
                  'aria-label': `${link.title}: ${link.subtitle}`
                } : {})}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2 ${
                  isFullWidth ? 'sm:col-span-2' : ''
                } ${
                  isClickable ? 'hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer group' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mr-4 shrink-0 transition-transform ${isClickable ? 'group-hover:scale-110' : ''}`}>
                  <DeferredIcon Icon={link.Icon} color={link.iconColor} delay={index * 50 + 200} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900">{link.title}</h3>
                  <p className="text-xs text-gray-700 font-medium leading-tight">{link.subtitle}</p>
                </div>
                {isClickable && (
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" aria-hidden="true" />
                )}
              </CardWrapper>
            );
          })}
        </div>

        {/* Trust Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <ShieldCheck className="w-6 h-6 text-[#1967D2]" />
            <h2 className="text-xl font-bold text-gray-900">Por que escolher Alan SEO?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUST_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-gray-50 ${card.color}`}>
                    <card.Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI SEO Consultant Section */}
        <section className="mb-16 bg-gradient-to-br from-[#4285F4]/5 to-[#34A853]/5 p-6 rounded-3xl border border-[#4285F4]/10 shadow-inner">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-[#4285F4]" />
            <h2 className="text-xl font-bold text-gray-900">Consultoria de IA Alan SEO</h2>
          </div>
          <p className="text-sm text-gray-700 mb-6">
            Tire suas dúvidas sobre SEO instantaneamente com nossa inteligência artificial treinada.
          </p>
          
          <form onSubmit={handleAiConsult} className="relative mb-4">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ex: Como melhorar meu SEO local?"
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] shadow-sm"
              disabled={isAiLoading}
            />
            <button
              type="submit"
              disabled={isAiLoading || !aiInput.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 bg-[#4285F4] text-white rounded-xl hover:bg-[#1967D2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>

          <AnimatePresence>
            {aiResponse && (
              <motion.div
                ref={aiResponseRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#4285F4]/20 text-sm text-gray-800 leading-relaxed shadow-sm"
              >
                <div className="flex items-center space-x-2 mb-2 text-[#4285F4] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Resposta da IA</span>
                </div>
                {aiResponse}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-xs text-gray-700 font-medium">
            © {new Date().getFullYear()} Alan SEO Agency<br/>
            Todos os direitos reservados.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="https://instagram.com/alan.google.seo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#E4405F] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2 rounded-lg p-1" aria-label="Seguir no Instagram">
              <Instagram className="w-6 h-6" aria-hidden="true" />
            </a>
            <a href="https://www.facebook.com/malan.silva.18" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1877F2] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2 rounded-lg p-1" aria-label="Seguir no Facebook">
              <Facebook className="w-6 h-6" aria-hidden="true" />
            </a>
            <div className="opacity-50 grayscale hover:grayscale-0 transition-all" aria-hidden="true">
              <TrendingUp className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp Button - Deferred and Lazy Loaded */}
      {showWhatsApp && (
        <Suspense fallback={null}>
          <div className="fixed bottom-6 right-6 z-50">
            <FloatingWhatsApp />
          </div>
        </Suspense>
      )}
    </div>
    </LazyMotion>
  );
}
