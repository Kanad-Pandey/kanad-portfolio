"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // NOTE: For production, get your FREE Access Key from https://web3forms.com
    const accessKey = "23a59298-edf1-487a-8a2e-3e301a8c9cdf"; // Placeholder

    if (accessKey === "23a59298-edf1-487a-8a2e-3e301a8c9cdf") {
      // SIMULATION MODE: Triggers if no key is provided so you can see the UI
      console.warn("Contact form is in SIMULATION MODE. Get a free key at web3forms.com to receive real emails.");
      setTimeout(() => {
        setStatus('success');
        form.reset();
      }, 2000);
      return;
    }

    try {
      formData.append("access_key", accessKey);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-obsidian py-32 flex items-center overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Copy */}
          <div>
            <h2 className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em] mb-4">
              Next Steps
            </h2>
            <h3 className="text-5xl md:text-8xl font-bold text-white font-display uppercase tracking-tighter mb-8">
              Let's <br />
              <span className="text-accent-cyan italic">Connect</span>
            </h3>
            <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-md">
              Whether you have a challenge to solve or just want to talk about the future of AI, my door is always open.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:kanadpandey19946@gmail.com"
                className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-cyan transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-accent-cyan group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Email</div>
                    <div className="text-white font-bold tracking-tight">kanadpandey19946@gmail.com</div>
                  </div>
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-accent-cyan transition-colors" />
              </a>

              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/kanad-pandey-b1264a200/"
                  target="_blank"
                  className="flex-1 flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-violet transition-all group"
                >
                  <div className="p-3 rounded-xl bg-white/5 text-accent-violet group-hover:scale-110 transition-transform">
                    <Linkedin size={24} />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-[10px]">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Kanad-Pandey"
                  target="_blank"
                  className="flex-1 flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-white/5 text-white group-hover:scale-110 transition-transform">
                    <Github size={24} />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-[10px]">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-violet/20 to-accent-cyan/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative p-10 rounded-3xl bg-ink border border-white/10 glass-card min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center text-center gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight font-display">Signal Received</h4>
                      <p className="text-gray-400">Thanks for reaching out, Kanad. I'll get back to you shortly.</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setStatus('idle')}
                      className="mt-4 rounded-xl font-mono text-[10px] uppercase tracking-widest border-white/10 hover:bg-white/5"
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <label className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-transparent border-none border-b border-white/10 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Email Address</label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-transparent border-none border-b border-white/10 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Message</label>
                      <textarea
                        required
                        name="message"
                        placeholder="Hello, I'd like to talk about..."
                        className="w-full h-32 bg-white/5 rounded-xl border border-white/5 p-4 text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono"
                      >
                        Transmission failed. Check your Formspree ID configuration.
                      </motion.div>
                    )}

                    <Button
                      disabled={status === 'submitting'}
                      className="w-full py-8 rounded-2xl bg-accent-cyan text-obsidian font-bold uppercase tracking-[0.2em] gap-3 group disabled:opacity-50 relative overflow-hidden"
                    >
                      <span className="relative z-10">
                        {status === 'submitting' ? 'Transmitting Signal...' : 'Send Signal'}
                      </span>
                      {status !== 'submitting' && (
                        <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      )}
                      {status === 'submitting' && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                      )}
                    </Button>
                    <p className="text-[9px] text-gray-600 font-mono text-center uppercase tracking-widest">
                      Powered by Formspree API • Secure Channel
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
    </section>
  );
};
