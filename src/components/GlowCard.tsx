import { useEffect, useRef, ElementType, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  [key: string]: any;
}

const glowColorMap = {
  blue: { base: 220, spread: 60 },
  purple: { base: 280, spread: 60 },
  green: { base: 120, spread: 60 },
  red: { base: 0, spread: 60 },
  orange: { base: 30, spread: 60 },
};

export function GlowCard({
  children,
  className = '',
  as: Component = 'div',
  glowColor = 'blue',
  ...rest
}: GlowCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xp = x / rect.width;   // position horizontale en % (0 à 1)

      const { base, spread } = glowColorMap[glowColor];
      const hue = base + xp * spread;

      cardRef.current.style.setProperty('--glow-x', `${x}px`);
      cardRef.current.style.setProperty('--glow-y', `${y}px`);
      cardRef.current.style.setProperty('--glow-hue', `${hue}`);
    };

    const card = cardRef.current;
    card?.addEventListener('pointermove', syncPointer);
    return () => card?.removeEventListener('pointermove', syncPointer);
  }, [glowColor]);

  return (
    <Component
      ref={cardRef}
      data-glow
      className={`glow-card ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}