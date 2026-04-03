import { cn } from '@/lib/utils/cn';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export default function PageShell({ children, className, centered = true }: PageShellProps) {
  return (
    <div
      className={cn(
        'relative min-h-screen w-full bg-void overflow-hidden',
        centered && 'flex flex-col items-center justify-center',
        className
      )}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] bg-arcane blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[300px] rounded-full opacity-[0.03] bg-oracle blur-[100px]" />
      </div>

      <div className={cn('relative z-10 w-full', className)}>
        {children}
      </div>
    </div>
  );
}
