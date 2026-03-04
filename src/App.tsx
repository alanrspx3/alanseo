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
  Facebook
} from 'lucide-react';
import { motion, LazyMotion, domAnimation } from 'motion/react';
import { useState, useEffect, Suspense, lazy } from 'react';

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
    title: 'Fale Conosco no WhatsApp',
    subtitle: 'Atendimento imediato e personalizado',
    Icon: MessageCircle,
    iconColor: '#25D366',
    url: 'https://wa.me/5569992198494?text=Olá%20gostaria%20de%20fazer%20uma%20consultoria.',
    color: 'bg-[#25D366]/10'
  },
  {
    id: 'conteudo',
    title: 'Criação de Conteúdo Otimizado',
    subtitle: 'Textos que ranqueiam e convertem',
    Icon: PenTool,
    iconColor: '#34A853',
    url: '#',
    color: 'bg-[#34A853]/10'
  },
  {
    id: 'linkbuilding',
    title: 'Link Building Estratégico',
    subtitle: 'Autoridade real para o seu domínio',
    Icon: LinkIcon,
    iconColor: '#4285F4',
    url: '#',
    color: 'bg-[#4285F4]/10'
  },
  {
    id: 'ecommerce',
    title: 'SEO para e-commerce',
    subtitle: 'Aumente as vendas da sua loja virtual',
    Icon: ShoppingBag,
    iconColor: '#EA4335',
    url: '#',
    color: 'bg-[#EA4335]/10'
  },
  {
    id: 'consultoria',
    title: 'Consultoria de SEO',
    subtitle: 'Estratégia personalizada para seu negócio',
    Icon: UserCheck,
    iconColor: '#4285F4',
    url: '#',
    color: 'bg-[#4285F4]/10'
  },
  {
    id: 'tecnico',
    title: 'SEO Técnico',
    subtitle: 'Auditorias, velocidade e UX',
    Icon: Settings,
    iconColor: '#FBBC05',
    url: '#',
    color: 'bg-[#FBBC05]/10'
  },
  {
    id: 'local',
    title: 'SEO Local',
    subtitle: 'Domine as buscas na sua região',
    Icon: MapPin,
    iconColor: '#EA4335',
    url: '#',
    color: 'bg-[#EA4335]/10'
  },
  {
    id: 'cro',
    title: 'CRO',
    subtitle: 'Otimização de Taxa de Conversão',
    Icon: Target,
    iconColor: '#FBBC05',
    url: '#',
    color: 'bg-[#FBBC05]/10'
  },
  {
    id: 'geo',
    title: 'GEO',
    subtitle: 'Generative Engine Optimization',
    Icon: Globe,
    iconColor: '#34A853',
    url: '#',
    color: 'bg-[#34A853]/10'
  }
];

export default function App() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

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
          src="https://raw.githubusercontent.com/alanrspx3/alanseo/main/src/alanseo.webp" 
          alt="" 
          role="presentation"
          className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]"
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
                  src="https://raw.githubusercontent.com/alanrspx3/alanseo/main/src/alanseo.webp" 
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
            
            <h1 className="text-2xl font-bold text-gray-900 mb-1">ALAN SEO</h1>
            <h2 className="text-[#1967D2] font-semibold text-sm tracking-wide uppercase mb-4">A sua marca no topo das pesquisas</h2>
            
            <div className="max-w-[280px]">
              <p className="text-gray-800 text-sm leading-relaxed">
                Aumente o tráfego orgânico, conquiste clientes qualificados e transforme seu site em uma máquina de vendas.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Links Section - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
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
