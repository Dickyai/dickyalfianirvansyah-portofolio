'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import type { ComponentType } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import { Container } from '../components/common/Container';
import { SOCIAL_ICON_MAP } from '../components/icons/SocialIcons';
import { CONTACT_LINKS } from '../data/contact';
import type { ContactIconKey } from '../types/contact';
import type { Translation } from '../i18n/types';

const CONTACT_ICON_MAP: Record<ContactIconKey, ComponentType<{ className?: string }>> = {
  mail: Mail,
  ...SOCIAL_ICON_MAP,
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactProps {
  sectionCopy: Translation['contactSection'];
  formCopy: Translation['contact'];
}

export function Contact({ sectionCopy, formCopy }: ContactProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailCopyStatus, setEmailCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const reduceMotion = useReducedMotion();

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopyStatus('copied');
    } catch {
      setEmailCopyStatus('error');
    }
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setFormStatus('submitting');
    setErrorMessage(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          website_url: formData.get('website_url'),
        }),
      });

      clearTimeout(timeoutId);

      let data: { error?: string; success?: boolean } = {};
      try {
        data = await res.json();
      } catch {
        // Fallback if response is non-JSON
      }

      if (!res.ok) {
        throw new Error(data.error || sectionCopy.errorMessage);
      }

      setFormStatus('success');
      form.reset();
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (err) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof DOMException && err.name === 'AbortError';
      const msg = isAbort
        ? 'Waktu pengiriman habis. Silakan periksa koneksi Anda dan coba lagi.'
        : err instanceof Error
        ? err.message
        : sectionCopy.errorMessage;
      setErrorMessage(msg);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <Reveal className="relative z-10 w-full">
        <Container className="desktop-container max-w-[78rem]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channel Information & Socials */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="mb-4 font-display text-[clamp(1.605rem,3.77vw,2.4075rem)] font-extrabold leading-[1.111] tracking-tight text-slate-900 dark:text-white">
                {sectionCopy.heading}
              </h2>
              <p className="max-w-lg text-left font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:text-justify">
                {sectionCopy.description}
              </p>
            </div>

            {/* Social & Direct Links */}
            <div className="mt-8 border-y border-border/80 divide-y divide-border/70">
              {CONTACT_LINKS.map((link, idx) => {
                const Icon = CONTACT_ICON_MAP[link.icon];
                return (
                  <div key={idx} className="flex min-h-[68px] items-center justify-between gap-3 py-3">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${link.label}: ${link.value}`}
                      className="group flex min-w-0 flex-1 items-center justify-between gap-4"
                    >
                      <span className="flex min-w-0 items-center gap-3.5">
                        <Icon className="h-4 w-4 shrink-0 text-blue-600 transition-colors group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            {link.label}
                          </span>
                          <span className="block truncate font-mono text-xs font-semibold text-slate-800 transition-colors group-hover:text-blue-700 dark:text-slate-200 dark:group-hover:text-blue-300">
                            {link.value}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" />
                    </a>
                    {link.icon === 'mail' && (
                      <div className="flex shrink-0 items-center gap-2">
                        {emailCopyStatus !== 'idle' && (
                          <span role="status" aria-live="polite" className="font-mono text-[10px] text-muted-foreground">
                            {emailCopyStatus === 'copied' ? sectionCopy.copiedEmail : sectionCopy.copyEmailFailed}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => void handleCopyEmail(link.value)}
                          aria-label={emailCopyStatus === 'copied' ? sectionCopy.copiedEmail : sectionCopy.copyEmail}
                          className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-transform duration-premium ease-premium hover:text-accent active:scale-[0.98] motion-reduce:transform-none"
                        >
                          <Copy className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-6">
            <div className="border-t border-border/80 pt-6 sm:pt-8">
              <h3 className="mb-6 font-display text-[clamp(1.3375rem,2.52vw,1.605rem)] font-bold leading-[1.333] text-slate-900 dark:text-white">
                {formCopy.secureHeading}
              </h3>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Honeypot field for anti-spam bots */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="new-password"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="font-mono text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {formCopy.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      name="name"
                      maxLength={200}
                      autoComplete="name"
                      className="w-full bg-muted border border-border rounded-xl p-3.5 text-xs sm:text-sm font-body focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-sm"
                      placeholder={formCopy.namePlaceholder}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="font-mono text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {formCopy.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      className="w-full bg-muted border border-border rounded-xl p-3.5 text-xs sm:text-sm font-body focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-sm"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="font-mono text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {formCopy.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      name="message"
                      rows={4}
                      maxLength={3000}
                      className="w-full bg-muted border border-border rounded-xl p-3.5 text-xs sm:text-sm font-body focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-900 dark:text-white resize-none transition-all shadow-sm"
                      placeholder={formCopy.messagePlaceholder}
                    ></textarea>
                  </div>

                  <button
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    type="submit"
                    className="w-full py-4 min-h-[48px] mt-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-transform duration-premium ease-premium disabled:opacity-60 flex items-center justify-center gap-2 rounded-xl uppercase tracking-wider shadow-md hover:shadow-blue-600/25 active:scale-[0.98] motion-reduce:transform-none"
                  >
                    {formStatus === 'idle' && (
                      <>
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{formCopy.buttonIdle}</span>
                      </>
                    )}
                    {formStatus === 'submitting' && (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden="true"></span>
                        <span>{formCopy.buttonSubmitting}</span>
                      </>
                    )}
                    {formStatus === 'success' && (
                      <>
                        <Check className="w-4 h-4 text-white" aria-hidden="true" />
                        <span>{formCopy.buttonSuccess}</span>
                      </>
                    )}
                    {formStatus === 'error' && (
                      <>
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{formCopy.buttonIdle}</span>
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {formStatus === 'error' && errorMessage && (
                      <motion.p
                        role="status"
                        aria-live="polite"
                        initial={reduceMotion ? false : { opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.24 }}
                        className="text-xs font-mono text-red-500 text-center pt-2"
                      >
                        {errorMessage}
                      </motion.p>
                    )}
                    {formStatus === 'success' && (
                      <motion.p
                        role="status"
                        aria-live="polite"
                        initial={reduceMotion ? false : { opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.24 }}
                        className="text-xs font-mono text-blue-600 dark:text-blue-400 text-center pt-2 font-medium"
                      >
                        {sectionCopy.successMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
          </div>
        </div>
        </Container>
      </Reveal>
    </section>
  );
}
