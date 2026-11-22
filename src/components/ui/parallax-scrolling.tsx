'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={parallaxRef} className={`parallax ${className}`.trim()}>
      <section id="parallax-cover" className="parallax__header" aria-label="Parallax cover">
        <div className="parallax__visuals">
          <div data-parallax-layers className="parallax__layers">
            <div data-parallax-layer="1" className="parallax__layer-image dark:hidden">
              <Image
                src={images.day.sky}
                alt=""
                fill
                priority
                sizes="100vw"
                className="parallax__layer-img"
              />
            </div>
            <div data-parallax-layer="1" className="parallax__layer-image hidden dark:block">
              <Image
                src={images.night.sky}
                alt=""
                fill
                loading="lazy"
                sizes="100vw"
                className="parallax__layer-img"
              />
            </div>

            <div data-parallax-layer="2" className="parallax__layer-mid">
              {images.day.mid && (
                <Image
                  src={images.day.mid}
                  alt={images.day.silhouetteAlt ?? 'A silhouette in the landscape'}
                  fill
                  sizes="100vw"
                  className="parallax__layer-img dark:hidden"
                />
              )}
              {images.night.mid && (
                <Image
                  src={images.night.mid}
                  alt={images.night.silhouetteAlt ?? 'A silhouette in the landscape'}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="parallax__layer-img hidden dark:block"
                />
              )}
            </div>

            <div data-parallax-layer="3" className="parallax__layer-atmosphere" aria-hidden="true" />

            <div data-parallax-layer="4" className="parallax__fade">
              {images.day.ground && (
                <Image
                  src={images.day.ground}
                  alt=""
                  fill
                  sizes="100vw"
                  className="parallax__ground-img dark:hidden"
                />
              )}
              {images.night.ground && (
                <Image
                  src={images.night.ground}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="parallax__ground-img hidden dark:block"
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
      </section>
    </div>
  );
}
