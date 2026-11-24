interface FooterProps {
  copyright: string;
  builtWith: string;
}

export function Footer({ copyright, builtWith }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-border/80 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] sm:pl-[calc(1.5rem+env(safe-area-inset-left))] sm:pr-[calc(1.5rem+env(safe-area-inset-right))]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
        <p className="font-mono text-sm text-muted-foreground">
          {copyright}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with {builtWith}
        </p>
      </div>
    </footer>
  );
}