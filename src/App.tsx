/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { User, ScrollText, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Person {
  name: string;
  year?: string | number;
}

interface NodeProps {
  person1: Person;
  person2?: Person;
  label?: string;
  accentColor?: string;
  level?: number;
}

const NodeCard = ({ person1, person2, label, accentColor = 'border-l-accent', level = 0 }: NodeProps) => {
  const [showYears, setShowYears] = useState(false);

  return (
    <div className={`flex flex-col mb-4 ${level > 0 ? `ml-${level * 6}` : ''}`}>
      {level > 0 && <div className="shajara-line h-6 mb-0" />}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setShowYears(!showYears)}
        className={`node-card p-4 rounded-lg w-full border-l-4 cursor-pointer select-none ${accentColor}`}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-ink md:text-base text-sm">
            {person1.name} {person2 ? `& ${person2.name}` : ''}
          </span>
          <AnimatePresence>
            {showYears && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-1"
              >
                {person1.year && <span className="year-pill">{person1.year}</span>}
                {person2?.year && <span className="year-pill">{person2.year}</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="text-[10px] uppercase text-gray-500 mt-1 tracking-widest font-semibold flex items-center justify-between gap-1">
          <span className="flex items-center gap-1">
            <ScrollText className="w-3 h-3 text-accent/60" />
            {label}
          </span>
          {!showYears && <span className="text-[8px] italic opacity-50 px-2 py-0.5 border border-border-subtle rounded text-slate-gray">Yilni ko'rish</span>}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeSide, setActiveSide] = useState<'both' | 'maternal' | 'paternal'>('both');
  const [showSamiraYear, setShowSamiraYear] = useState(false);

  return (
    <div className="min-h-screen bg-parchment p-6 md:p-20 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-border-line p-8 md:p-16 flex flex-col min-h-[90vh] text-ink relative">
        
        {/* Subtle Decorative corner */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-accent/20 -translate-x-4 -translate-y-4" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-accent/20 translate-x-4 translate-y-4" />

        {/* Header - Modern Minimalist */}
        <header className="flex flex-col items-center border-b border-border-line pb-12 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent mb-6" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-ink text-center mb-4 uppercase">
              Oila Shajarasi
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-accent/30" />
              <p className="text-[10px] text-slate-gray uppercase tracking-[0.6em] font-black">
                Naslnoma Ma'lumotnomasi
              </p>
              <div className="h-[1px] w-8 bg-accent/30" />
            </div>
          </motion.div>
        </header>

        {/* Navigation */}
        <div className="flex justify-center gap-8 mb-16">
          {(['both', 'maternal', 'paternal'] as const).map((side) => (
            <button
              key={side}
              onClick={() => setActiveSide(side)}
              className={`pb-1 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 border-b-2 ${
                activeSide === side 
                  ? 'text-ink border-accent' 
                  : 'text-slate-gray/40 border-transparent hover:text-slate-gray hover:border-accent/40'
              }`}
            >
              {side === 'both' ? 'To\'liq' : side === 'maternal' ? 'Ona Tarafi' : 'Ota Tarafi'}
            </button>
          ))}
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Maternal Branch */}
          <AnimatePresence mode="wait">
            {(activeSide === 'both' || activeSide === 'maternal') && (
              <motion.section 
                key="maternal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <h3 className="branch-label mb-6 text-lg pb-1 uppercase tracking-widest font-medium">Ona taraf avlodlari</h3>
                
                <div className="flex flex-col">
                  <NodeCard 
                    label="Ildiz Avlod"
                    person1={{ name: "Tobaxon", year: 1911 }}
                    person2={{ name: "Mamojon", year: 1905 }}
                    accentColor="border-l-accent/40"
                  />
                  <NodeCard 
                    label="Katta Oila"
                    person1={{ name: "Tursunxon", year: 1934 }}
                    person2={{ name: "Ilhomjon", year: 1934 }}
                    accentColor="border-l-accent/40"
                    level={1}
                  />
                  <NodeCard 
                    label="Kichkina Oila"
                    person1={{ name: "Habiba", year: 1966 }}
                    person2={{ name: "Najmitin", year: 1962 }}
                    accentColor="border-l-accent/40"
                    level={2}
                  />
                  <NodeCard 
                    label="Oila"
                    person1={{ name: "Sherzot", year: 1993 }}
                    person2={{ name: "Dildora", year: 1991 }}
                    accentColor="border-l-accent"
                    level={3}
                  />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Paternal Branch */}
          <AnimatePresence mode="wait">
            {(activeSide === 'both' || activeSide === 'paternal') && (
              <motion.section 
                key="paternal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <h3 className="branch-label mb-6 text-lg pb-1 uppercase tracking-widest font-medium">Ota taraf avlodlari</h3>
                
                <div className="flex flex-col">
                  <NodeCard 
                    label="Katta Oila"
                    person1={{ name: "Omina" }}
                    person2={{ name: "Qaxorhon" }}
                    accentColor="border-l-slate-gray/40"
                  />
                  <NodeCard 
                    label="Katta Oila (Ota)"
                    person1={{ name: "Zaynab", year: 1938 }}
                    person2={{ name: "Vahobjon", year: 1935 }}
                    accentColor="border-l-slate-gray/40"
                    level={1}
                  />
                  <NodeCard 
                    label="Ota Oila"
                    person1={{ name: "Tohir", year: 1968 }}
                    person2={{ name: "O'lug'bek", year: 1984 }}
                    accentColor="border-l-slate-gray/40"
                    level={2}
                  />
                </div>

                {/* Legacy Section for Samira */}
                <div className="mt-auto pt-8">
                   <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    onClick={() => setShowSamiraYear(!showSamiraYear)}
                    className="p-6 border border-border-subtle rounded-sm flex flex-col items-center justify-center bg-white cursor-pointer select-none ring-1 ring-border-subtle ring-offset-4 transition-all hover:ring-accent/40"
                   >
                      <div className="text-[8px] uppercase tracking-[0.3em] text-accent mb-3 font-black">Shajara Nuri</div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink mb-2 tracking-tighter italic text-center">Samira Qaxarova</h2>
                      <div className="flex items-center gap-3 h-6">
                        <AnimatePresence mode="wait">
                          {showSamiraYear ? (
                            <motion.span 
                              key="year"
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="year-pill"
                            >
                              2012
                            </motion.span>
                          ) : (
                            <motion.span 
                              key="hint"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[8px] text-slate-gray/30 tracking-widest font-bold uppercase"
                            >
                              Tug'ilgan yil
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <div className="h-[1px] w-12 bg-accent/20" />
                        <span className="text-[9px] text-slate-gray font-bold tracking-widest uppercase">Yangi Avlod</span>
                      </div>
                   </motion.div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-border-line flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-gray/40 uppercase tracking-[0.3em] font-black gap-6 md:gap-0 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-accent/20" />
            Toshkent, O'zbekiston
          </div>
          <div>© {new Date().getFullYear()} Shajara Arvixi</div>
          <div className="italic font-serif lowercase tracking-normal text-xs text-slate-gray/60">Arxiv ma'lumotlari asosida tuzilgan</div>
        </footer>
      </div>
      
      {/* Background decoration */}
      <div className="mt-12 opacity-10 hover:opacity-30 transition-opacity duration-1000">
        <ScrollText className="w-10 h-10 text-accent" />
      </div>
    </div>
  );
}

