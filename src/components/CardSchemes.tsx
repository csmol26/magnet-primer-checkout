import './CardSchemes.css';

/**
 * Small inline scheme marks, so the mockup carries no external image
 * dependencies and loads instantly inside StackBlitz.
 */

function Visa() {
  return (
    <svg viewBox="0 0 34 22" className="magnet-scheme" role="img" aria-label="Visa">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="#e2ddd5" />
      <text
        x="17"
        y="15"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="9"
        fontWeight="800"
        fontStyle="italic"
        fill="#1a1f71"
      >
        VISA
      </text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 34 22" className="magnet-scheme" role="img" aria-label="Mastercard">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="#e2ddd5" />
      <circle cx="14" cy="11" r="6" fill="#eb001b" />
      <circle cx="20" cy="11" r="6" fill="#f79e1b" fillOpacity="0.9" />
    </svg>
  );
}

function Maestro() {
  return (
    <svg viewBox="0 0 34 22" className="magnet-scheme" role="img" aria-label="Maestro">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="#e2ddd5" />
      <circle cx="14" cy="11" r="6" fill="#0099df" />
      <circle cx="20" cy="11" r="6" fill="#ed0006" fillOpacity="0.85" />
    </svg>
  );
}

function Diners() {
  return (
    <svg viewBox="0 0 34 22" className="magnet-scheme" role="img" aria-label="Diners Club">
      <rect width="34" height="22" rx="3" fill="#ffffff" stroke="#e2ddd5" />
      <circle cx="17" cy="11" r="7" fill="#0079be" />
      <circle cx="17" cy="11" r="4" fill="#ffffff" />
    </svg>
  );
}

function GenericCard() {
  return (
    <svg viewBox="0 0 34 22" className="magnet-scheme" role="img" aria-label="Debit card">
      <rect width="34" height="22" rx="3" fill="#2f7fd0" />
      <rect x="3" y="7" width="28" height="2.5" fill="#ffffff" fillOpacity="0.9" />
      <rect x="3" y="13" width="11" height="2" fill="#ffffff" fillOpacity="0.7" />
    </svg>
  );
}

export function CardSchemes() {
  return (
    <div className="magnet-schemes">
      <Visa />
      <Mastercard />
      <Maestro />
      <Diners />
      <GenericCard />
    </div>
  );
}

export default CardSchemes;
