'use client';

import { useEffect, useState } from 'react';
import { Music2, Pause, Play } from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface MusicWidgetCopy {
  title: string;
  status: string;
  playLabel: string;
  pauseLabel: string;
}

interface MusicWidgetProps {
  audioTrackUrl: string;
  copy: MusicWidgetCopy;
}

export function MusicWidget({ audioTrackUrl, copy }: MusicWidgetProps) {
  const { audioRef, isPlaying, toggle } = useAudioPlayer(audioTrackUrl);
  const [showDetails, setShowDetails] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = showDetails || isHovered;

  useEffect(() => {
    const timer = window.setTimeout(() => setShowDetails(false), 2800);
    return () => window.clearTimeout(timer);
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={audioTrackUrl} loop preload="none" />

      <div
        className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex items-center rounded-full transition-[gap,padding,background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded
              ? 'gap-2 border border-border bg-card/95 p-1.5 shadow-lg shadow-slate-900/10 backdrop-blur-md dark:shadow-black/30'
              : 'gap-0 border border-transparent bg-transparent p-0 shadow-none'
          }`}
        >
          <div className="music-widget__button-wrap">
            {isPlaying && (
              <>
                <span className="music-widget__wave" aria-hidden="true" />
                <span className="music-widget__wave music-widget__wave--delayed" aria-hidden="true" />
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setShowDetails(true);
                toggle();
              }}
              aria-label={isPlaying ? copy.pauseLabel : copy.playLabel}
              aria-pressed={isPlaying}
              className="relative z-10 flex h-11 w-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-accent-foreground shadow-sm transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              )}
            </button>
          </div>

          <div
            aria-hidden={!isExpanded}
            className={`flex min-w-0 flex-col overflow-hidden transition-[width,opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              isExpanded
                ? 'w-[clamp(5rem,26vw,7rem)] translate-x-0 opacity-100'
                : 'w-0 translate-x-1 opacity-0'
            }`}
          >
            <span className="truncate text-xs font-semibold leading-5 text-slate-900 dark:text-white">
              {copy.title}
            </span>
            <span className="flex min-w-0 items-center gap-1 truncate text-[11px] leading-4 text-slate-600 dark:text-slate-400">
              <Music2 className="h-3 w-3 shrink-0 text-blue-700 dark:text-blue-400" aria-hidden="true" />
              {copy.status}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
