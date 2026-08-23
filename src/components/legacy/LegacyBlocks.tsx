import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../../data/portfolio.ts';

// 1. LegacyAnimatedHero
export function LegacyAnimatedHero({ content, settings }: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white w-full">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-600/30 rounded-full blur-[100px] animate-pulse mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }} />
      </div>
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20"
        
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full relative"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-blue-200">{content?.badge || "AI-POWERED DIGITAL AGENCY"}</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
          <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
            {content?.titleLine1 || "WE BUILD"}
          </span>
          <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600">
            {content?.titleLine2 || "DIGITAL"}
          </span>
          <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
            {content?.titleLine3 || "EXPERIENCES"}
          </span>
        </h1>
        <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mb-12 font-medium">
          {content?.desc || "We craft your digital presence to achieve real results."}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link to={content?.btn1Url || "/contact"} className="px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest">
            {content?.btn1Text || "Start Your Project"} <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link to={content?.btn2Url || "/portfolio"} className="px-10 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-md uppercase tracking-widest">
            {content?.btn2Text || "View Our Work"}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// 2. LegacyAboutStats
export function LegacyAboutStats({ content, settings }: any) {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 w-full bg-slate-950 text-white">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/2">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            {content?.title1 || "WE TURN VISION"} <br/>
            <span className="text-blue-600">{content?.title2 || "INTO"}</span> <br/>
            {content?.title3 || "REALITY"}
          </h2>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-8 md:gap-16 w-full">
          {[
            { num: content?.stat1Number || '500+', label: content?.stat1Label || 'PROJECTS' },
            { num: content?.stat2Number || '15+', label: content?.stat2Label || 'YEARS' },
            { num: content?.stat3Number || '98%', label: content?.stat3Label || 'SATISFACTION' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-4">{stat.num}</span>
              <span className="text-sm md:text-base font-bold text-blue-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. LegacyInteractiveServices
export function LegacyInteractiveServices({ content, settings }: any) {
  const [activeService, setActiveService] = useState(0);
  const services = [
    { slug: 'web-design', title: 'Web Design', desc: 'Custom, high-converting websites.', num: '01', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop' },
    { slug: 'digital-marketing', title: 'Digital Marketing', desc: 'SEO and performance marketing.', num: '02', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
    { slug: 'seo-optimization', title: 'SEO Optimization', desc: 'Rank higher on Google.', num: '03', img: 'https://images.unsplash.com/photo-1572177191856-3cbde618072f?q=80&w=800&auto=format&fit=crop' },
    { slug: 'mobile-apps', title: 'Mobile Apps', desc: 'Native and cross-platform applications.', num: '04', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
    { slug: 'branding', title: 'Branding', desc: 'Brand identity and visual design.', num: '05', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop' },
    { slug: 'motion-graphic', title: 'Motion Graphic', desc: 'Stunning animations and dynamic video visuals.', num: '06', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' },
    { slug: 'marketing-strategy', title: 'Marketing Strategy', desc: 'Data-driven marketing plans.', num: '07', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' },
    { slug: 'content-creation', title: 'Content Creation', desc: 'Engaging content for all platforms.', num: '08', img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop' },
    { slug: 'media-buying', title: 'Media Buying & SEM', desc: 'Targeted ad campaigns and media planning.', num: '09', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop' },
    { slug: 'email-marketing', title: 'Email Marketing', desc: 'Automated email campaigns and newsletters.', num: '10', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop' },
    { slug: '360-vr', title: '360 VR', desc: 'Immersive 360-degree virtual reality experiences.', num: '11', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-[#060913] border-y border-white/5 w-full text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex justify-between items-end">
          <div>
            <p className="text-blue-500 font-bold tracking-widest uppercase mb-4">{content?.label || "WHAT WE DO"}</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{content?.title || "OUR SERVICES"}</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start relative">
          <div className="w-full md:w-[55%] flex flex-col justify-center">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`group py-8 md:py-10 border-b border-white/10 cursor-pointer transition-all duration-500 ${activeService === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                onMouseEnter={() => setActiveService(i)}
                onClick={() => setActiveService(i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter transition-all duration-500">
                    {s.title}
                  </h3>
                  <span className="text-lg md:text-xl font-bold font-mono ml-4">{s.num}</span>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeService === i ? 'max-h-[800px] opacity-100 mt-4 md:mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                  <p className="text-lg md:text-xl text-slate-400 max-w-md">{s.desc}</p>
                  <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 mt-4 text-blue-500 font-bold hover:text-blue-400 transition-colors uppercase tracking-widest text-sm">
                    Discover More <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block md:w-[45%] sticky top-32 h-[600px] lg:h-[750px] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5">
            {services.map((s, i) => (
              <div key={i} className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeService === i ? 'opacity-100 z-10 visible' : 'opacity-0 z-0 invisible'}`}>
                <img src={s.img} alt={s.title} className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${activeService === i ? 'scale-100' : 'scale-110'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. LegacyHorizontalPortfolio
export function LegacyHorizontalPortfolio({ content, settings }: any) {
  const portfolio = portfolioData.slice(0, 10);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.65;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="relative bg-slate-950 w-full text-white py-24 md:py-32 overflow-hidden select-none" dir="ltr">
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-blue-500 font-bold tracking-widest uppercase mb-4">{content?.label || "SELECTED WORKS"}</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{content?.title || "FEATURED WORK"}</h2>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Slider Arrow Buttons for entering right & left */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll Left"
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                canScrollLeft ? 'bg-white/10 hover:bg-blue-600 hover:border-transparent text-white' : 'opacity-40 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll Right"
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                canScrollRight ? 'bg-white/10 hover:bg-blue-600 hover:border-transparent text-white' : 'opacity-40 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>

          <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors">
            {content?.viewAllText || "View All Projects"} <ArrowUpRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-12 w-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`} 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {portfolio.map((p, i) => (
          <a 
            key={i} 
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isDragging) e.preventDefault();
            }}
            className="group relative w-[85vw] md:w-[60vw] h-[50vh] md:h-[65vh] shrink-0 snap-center rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 block cursor-pointer"
          >
            <img 
              src={p.img} 
              alt={p.name} 
              draggable={false}
              className="w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pointer-events-none">
              <div>
                <p className="text-blue-400 uppercase tracking-widest text-sm font-bold mb-2">{p.cat}</p>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors">{p.name}</h3>
              </div>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-blue-600 transition-colors">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// 5. LegacyProcess
export function LegacyProcess({ content, settings }: any) {
  return (
    <section className="py-32 bg-blue-600 text-white relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-20 text-center">{content?.title || "HOW WE WORK"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { num: '01', title: content?.step1Title || 'STRATEGY', desc: content?.step1Desc || 'Strategy description' },
            { num: '02', title: content?.step2Title || 'DESIGN', desc: content?.step2Desc || 'Design description' },
            { num: '03', title: content?.step3Title || 'DEVELOPMENT', desc: content?.step3Desc || 'Dev description' }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-8xl font-black text-white/20 mb-6">{step.num}</span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{step.title}</h3>
              <p className="text-blue-100 text-lg max-w-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
