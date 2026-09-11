import './MagnetHeader.css';

interface MagnetHeaderProps {
  /** Optional centred title, used by the project area screen. */
  title?: string;
  /** Shows the settings cog on the right, as in the project area screen. */
  showSettings?: boolean;
  /** Compact bar for the embedded project area layout. */
  compact?: boolean;
}

export function MagnetLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`magnet-logo${compact ? ' magnet-logo--compact' : ''}`}>
      <span className="magnet-logo__word">Magnet</span>
      <span className="magnet-logo__tagline">Better. By design</span>
    </div>
  );
}

export function MagnetHeader({
  title,
  showSettings = false,
  compact = false,
}: MagnetHeaderProps) {
  return (
    <header className={`magnet-header${compact ? ' magnet-header--compact' : ''}`}>
      <div className="magnet-header__inner">
        <MagnetLogo compact={compact} />

        {title ? <span className="magnet-header__title">{title}</span> : null}

        {showSettings ? (
          <button type="button" className="magnet-header__settings" aria-label="Settings">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M19.14 12.94a7.5 7.5 0 0 0 .05-.94 7.5 7.5 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.62l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.3 7.3 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.58.24-1.12.55-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.67 8.86a.5.5 0 0 0 .12.62l2.03 1.58c-.03.31-.05.63-.05.94s.02.63.05.94l-2.03 1.58a.5.5 0 0 0-.12.62l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.39 1.04.7 1.62.94l.36 2.54c.04.24.25.42.5.42h3.84c.25 0 .46-.18.5-.42l.36-2.54c.58-.24 1.12-.55 1.62-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.62ZM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default MagnetHeader;
