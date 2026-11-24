import { useEffect, useRef, useState } from 'react';

/**
 * Mengelola satu elemen <audio> dan state play/pause-nya.
 * Konsumen (MusicWidget) tinggal render <audio ref={audioRef} ... />
 * dan pakai `isPlaying` + `toggle` untuk kontrol UI.
 */
export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay diblokir atau gagal memuat audio:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.muted = true;
    }
  }, [isPlaying]);

  const toggle = () => setIsPlaying((prev) => !prev);

  return { audioRef, isPlaying, toggle, src };
}
