/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  MessageCircle, 
  Instagram, 
  FileText, 
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
import { motion } from 'motion/react';
import { useState, useEffect, Suspense, lazy } from 'react';

// Lazy load the floating button to reduce initial bundle size and execution time
const FloatingWhatsApp = lazy(() => Promise.resolve({
  default: () => (
    <motion.a 
      href="https://wa.me/5569992198494"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="floating-whatsapp"
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  )
}));

const LINKS = [
  {
    id: 'whatsapp',
    title: 'Fale Conosco no WhatsApp',
    subtitle: 'Atendimento imediato e personalizado',
    icon: <MessageCircle className="w-6 h-6 text-[#25D366]" />,
    url: 'https://wa.me/5569992198494',
    color: 'bg-[#25D366]/10'
  },
  {
    id: 'consultoria',
    title: 'Consultoria de SEO',
    subtitle: 'Estratégia personalizada para seu negócio',
    icon: <UserCheck className="w-6 h-6 text-[#4285F4]" />,
    url: '#',
    color: 'bg-[#4285F4]/10'
  },
  {
    id: 'ecommerce',
    title: 'SEO para e-commerce',
    subtitle: 'Aumente as vendas da sua loja virtual',
    icon: <ShoppingBag className="w-6 h-6 text-[#EA4335]" />,
    url: '#',
    color: 'bg-[#EA4335]/10'
  },
  {
    id: 'tecnico',
    title: 'SEO Técnico',
    subtitle: 'Auditorias, velocidade e UX',
    icon: <Settings className="w-6 h-6 text-[#FBBC05]" />,
    url: '#',
    color: 'bg-[#FBBC05]/10'
  },
  {
    id: 'conteudo',
    title: 'Criação de Conteúdo Otimizado',
    subtitle: 'Textos que ranqueiam e convertem',
    icon: <PenTool className="w-6 h-6 text-[#34A853]" />,
    url: '#',
    color: 'bg-[#34A853]/10'
  },
  {
    id: 'linkbuilding',
    title: 'Link Building Estratégico',
    subtitle: 'Autoridade real para o seu domínio',
    icon: <LinkIcon className="w-6 h-6 text-[#4285F4]" />,
    url: '#',
    color: 'bg-[#4285F4]/10'
  },
  {
    id: 'local',
    title: 'SEO Local',
    subtitle: 'Domine as buscas na sua região',
    icon: <MapPin className="w-6 h-6 text-[#EA4335]" />,
    url: '#',
    color: 'bg-[#EA4335]/10'
  },
  {
    id: 'cro',
    title: 'CRO',
    subtitle: 'Otimização de Taxa de Conversão',
    icon: <Target className="w-6 h-6 text-[#FBBC05]" />,
    url: '#',
    color: 'bg-[#FBBC05]/10'
  },
  {
    id: 'geo',
    title: 'GEO',
    subtitle: 'Generative Engine Optimization',
    icon: <Globe className="w-6 h-6 text-[#34A853]" />,
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
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">
      {/* Background Accent Image */}
      <div className="absolute top-0 left-0 w-full h-[320px] -z-10 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/seo-agency/1200/600" 
          alt="Background" 
          className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]"
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4285F4]/40 to-[#F8F9FA]" />
      </div>

      <main className="max-w-md mx-auto px-6 pt-12">
        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white profile-img-container">
              <img 
                src="https://storage.googleapis.com/generativeai-downloads/images/alan_seo_profile_v2.jpg" 
                alt="alan SEO" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                width="128"
                height="128"
                decoding="sync"
                onLoad={(e) => (e.currentTarget.classList.add('loaded'), e.currentTarget.parentElement?.classList.remove('animate-pulse'))}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#4285F4] text-white p-2 rounded-full shadow-lg">
              <Search className="w-5 h-5" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-1">ALAN SEO</h1>
          <p className="text-[#4285F4] font-medium text-sm tracking-wide uppercase mb-4">A sua marca no topo das pesquisas</p>
          
          <div className="max-w-[280px]">
            <p className="text-gray-600 text-sm leading-relaxed">
              Aumente o tráfego orgânico, conquiste clientes qualificados e transforme seu site em uma máquina de vendas.
            </p>
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="space-y-4 mb-12">
          {LINKS.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="link-card group"
            >
              <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mr-4 shrink-0 transition-transform group-hover:scale-110`}>
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{link.title}</h3>
                <p className="text-xs text-gray-500 truncate">{link.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Alan SEO Agency<br/>
            Todos os direitos reservados.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="https://instagram.com/alan.google.seo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/malan.silva.18" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <div className="opacity-30 grayscale hover:grayscale-0 transition-all">
              <TrendingUp className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp Button - Deferred and Lazy Loaded */}
      {showWhatsApp && (
        <Suspense fallback={null}>
          <FloatingWhatsApp />
        </Suspense>
      )}
    </div>
  );
}
