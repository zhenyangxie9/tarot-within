// Maps card id to a color pair [primaryColor, glowColor] in CSS rgba format

const CARD_COLORS: Record<number, [string, string]> = {
  0:  ['rgba(251, 191, 36, 0.9)',  'rgba(251, 191, 36, 0.4)'],   // The Fool - amber
  1:  ['rgba(250, 204, 21, 0.9)',  'rgba(250, 204, 21, 0.4)'],   // Magician - yellow
  2:  ['rgba(147, 197, 253, 0.9)', 'rgba(147, 197, 253, 0.4)'],  // High Priestess - blue
  3:  ['rgba(134, 239, 172, 0.9)', 'rgba(134, 239, 172, 0.4)'],  // Empress - green
  4:  ['rgba(252, 165, 165, 0.9)', 'rgba(252, 165, 165, 0.4)'],  // Emperor - red
  5:  ['rgba(199, 210, 254, 0.9)', 'rgba(199, 210, 254, 0.4)'],  // Hierophant - indigo
  6:  ['rgba(253, 164, 175, 0.9)', 'rgba(253, 164, 175, 0.4)'],  // Lovers - rose
  7:  ['rgba(125, 211, 252, 0.9)', 'rgba(125, 211, 252, 0.4)'],  // Chariot - sky
  8:  ['rgba(253, 186, 116, 0.9)', 'rgba(253, 186, 116, 0.4)'],  // Strength - orange
  9:  ['rgba(203, 213, 225, 0.9)', 'rgba(203, 213, 225, 0.4)'],  // Hermit - slate
  10: ['rgba(216, 180, 254, 0.9)', 'rgba(216, 180, 254, 0.4)'],  // Wheel - purple
  11: ['rgba(110, 231, 183, 0.9)', 'rgba(110, 231, 183, 0.4)'],  // Justice - emerald
  12: ['rgba(103, 232, 249, 0.9)', 'rgba(103, 232, 249, 0.4)'],  // Hanged Man - cyan
  13: ['rgba(212, 212, 216, 0.9)', 'rgba(212, 212, 216, 0.4)'],  // Death - zinc
  14: ['rgba(94, 234, 212, 0.9)',  'rgba(94, 234, 212, 0.4)'],   // Temperance - teal
  15: ['rgba(196, 181, 253, 0.9)', 'rgba(196, 181, 253, 0.4)'],  // Devil - violet
  16: ['rgba(252, 165, 165, 0.9)', 'rgba(252, 165, 165, 0.4)'],  // Tower - red
  17: ['rgba(125, 211, 252, 0.9)', 'rgba(125, 211, 252, 0.4)'],  // Star - sky
  18: ['rgba(165, 180, 252, 0.9)', 'rgba(165, 180, 252, 0.4)'],  // Moon - indigo
  19: ['rgba(253, 224, 71, 0.9)',  'rgba(253, 224, 71, 0.4)'],   // Sun - yellow
  20: ['rgba(251, 191, 36, 0.9)',  'rgba(251, 191, 36, 0.4)'],   // Judgement - amber
  21: ['rgba(216, 180, 254, 0.9)', 'rgba(216, 180, 254, 0.4)'],  // World - purple
};

interface CardSymbolProps {
  cardId: number;
  symbol: string;
  romanNumeral: string;
  nameCN: string;
  keywords: string[];
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { symbol: '32px', numeral: '11px', name: '11px', keywords: '9px' },
  md: { symbol: '52px', numeral: '13px', name: '13px', keywords: '10px' },
  lg: { symbol: '72px', numeral: '16px', name: '16px', keywords: '11px' },
};

export default function CardSymbol({
  cardId,
  symbol,
  romanNumeral,
  nameCN,
  keywords,
  size = 'md',
}: CardSymbolProps) {
  const [primary, glow] = CARD_COLORS[cardId] ?? ['rgba(168,154,240,0.9)', 'rgba(168,154,240,0.4)'];
  const s = sizeConfig[size];

  return (
    <div className="flex flex-col items-center justify-between h-full py-3 px-2">
      {/* Roman numeral */}
      <span
        style={{
          fontSize: s.numeral,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-cormorant)',
          letterSpacing: '0.15em',
        }}
      >
        {romanNumeral}
      </span>

      {/* Central symbol */}
      <div className="flex flex-col items-center gap-2 flex-1 justify-center">
        <span
          style={{
            fontSize: s.symbol,
            color: primary,
            filter: `drop-shadow(0 0 12px ${glow})`,
            lineHeight: 1,
            fontFamily: 'var(--font-cormorant)',
          }}
        >
          {symbol}
        </span>

        {/* Decorative line */}
        <div
          style={{
            width: '40%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${primary}, transparent)`,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Card name */}
      <div className="flex flex-col items-center gap-1">
        <span
          style={{
            fontSize: s.name,
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'var(--font-cormorant)',
            letterSpacing: '0.1em',
            fontWeight: 400,
          }}
        >
          {nameCN}
        </span>
        <span
          style={{
            fontSize: s.keywords,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
            textAlign: 'center',
            fontFamily: 'var(--font-inter)',
            fontWeight: 300,
          }}
        >
          {keywords.slice(0, 2).join(' · ')}
        </span>
      </div>
    </div>
  );
}
