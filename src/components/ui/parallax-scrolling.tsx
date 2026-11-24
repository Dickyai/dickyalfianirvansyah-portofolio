'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import type gsap from 'gsap';
import { useLenis } from '../common/LenisProvider';

export interface ParallaxImageSet {
  sky: string;
  mid?: string;
  ground?: string;
  silhouetteAlt?: string;
}

export interface ParallaxImages {
  night: ParallaxImageSet;
  day: ParallaxImageSet;
}

interface ParallaxComponentProps {
  images?: ParallaxImages;
  className?: string;
  isDarkMode: boolean;
}

const DEFAULT_IMAGES: ParallaxImages = {
  night: { sky: '/images/parallax/night-scene.png' },
  day: { sky: '/images/parallax/day-scene.png' },
};

const LAYERS = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 40 },
  { layer: '4', yPercent: 10 },
] as const;

export function ParallaxComponent({
  images = DEFAULT_IMAGES,
  className = '',
  isDarkMode,
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context: gsap.Context | undefined;
    let updateScrollTrigger: (() => void) | undefined;
    let request = 0;
    let disposed = false;

    const detachScrollUpdate = () => {
      if (!updateScrollTrigger) return;
      lenis?.off('scroll', updateScrollTrigger);
      updateScrollTrigger = undefined;
    };

    const updateParallax = async () => {
      const currentRequest = ++request;
      context?.revert();
      context = undefined;
      detachScrollUpdate();

      if (reduceMotion || mobile.matches || reducedMotion.matches) return;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (
        disposed ||
        currentRequest !== request ||
        reduceMotion ||
        mobile.matches ||
        reducedMotion.matches
      ) return;

      gsap.registerPlugin(ScrollTrigger);
      updateScrollTrigger = () => ScrollTrigger.update();
      lenis?.on('scroll', updateScrollTrigger);
      context = gsap.context(() => {
        const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
        if (!triggerElement) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: '0% 0%',
            end: '100% 0%',
            scrub: 0,
          },
        });

        LAYERS.forEach(({ layer, yPercent }, index) => {
          timeline.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layer}"]`),
            { yPercent, ease: 'none' },
            index === 0 ? undefined : '<'
          );
        });
      }, parallaxRef);
    };

    updateParallax();
    mobile.addEventListener('change', updateParallax);
    reducedMotion.addEventListener('change', updateParallax);

    return () => {
      disposed = true;
      request++;
      mobile.removeEventListener('change', updateParallax);
      reducedMotion.removeEventListener('change', updateParallax);
      detachScrollUpdate();
      context?.revert();
    };
  }, [lenis, reduceMotion]);

  const scene = isDarkMode ? images.night : images.day;

  return (
    <div ref={parallaxRef} className={`parallax ${className}`.trim()}>
      <div id="parallax-cover" className="parallax__header" aria-hidden="true">
        <div className="parallax__visuals">
          <div data-parallax-layers className="parallax__layers">
            <div data-parallax-layer="1" className="parallax__layer-image">
              <Image
                key={scene.sky}
                src={scene.sky}
                alt=""
                fill
                priority
                sizes="100vw"
                className="parallax__layer-img"
              />
            </div>
            <div data-parallax-layer="2" className="parallax__layer-mid">
              {scene.mid && (
                <Image
                  src={scene.mid}
                  alt={scene.silhouetteAlt ?? 'A silhouette in the landscape'}
                  fill
                  sizes="100vw"
                  className="parallax__layer-img"
                />
              )}
            </div>

            <div data-parallax-layer="3" className="parallax__layer-atmosphere" aria-hidden="true" />

            <div data-parallax-layer="4" className="parallax__fade">
              {scene.ground && (
                <Image
                  src={scene.ground}
                  alt=""
                  fill
                  sizes="100vw"
                  className="parallax__ground-img"
                />
              )}
            </div>
          </div>
        </div>
        <motion.span
          className="parallax__scroll-cue"
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ArrowDown />
        </motion.span>
      </div>
    </div>
  );
}
