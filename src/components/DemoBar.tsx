import { useState } from 'react';
import type { CheckoutVariant } from './PrimerCardCheckout';
import './DemoBar.css';

interface DemoBarProps {
  screen: CheckoutVariant;
  onScreenChange: (screen: CheckoutVariant) => void;
  showAlternativeMethods: boolean;
  onToggleAlternativeMethods: (value: boolean) => void;
  onRestart: () => void;
}

/**
 * Demo controls. Not part of the Magnet design — collapse it before taking
 * screenshots or sharing the link with the merchant.
 */
export function DemoBar({
  screen,
  onScreenChange,
  showAlternativeMethods,
  onToggleAlternativeMethods,
  onRestart,
}: DemoBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        type="button"
        className="magnet-demobar__reopen"
        onClick={() => setCollapsed(false)}
      >
        Demo controls
      </button>
    );
  }

  return (
    <div className="magnet-demobar">
      <span className="magnet-demobar__tag">Primer demo</span>

      <div className="magnet-demobar__group" role="group" aria-label="Screen">
        <button
          type="button"
          className={screen === 'secure' ? 'is-active' : ''}
          onClick={() => onScreenChange('secure')}
        >
          Secure Checkout
        </button>
        <button
          type="button"
          className={screen === 'project' ? 'is-active' : ''}
          onClick={() => onScreenChange('project')}
        >
          Project area
        </button>
      </div>

      <label className="magnet-demobar__switch">
        <input
          type="checkbox"
          checked={showAlternativeMethods}
          onChange={(event) => onToggleAlternativeMethods(event.target.checked)}
        />
        Wallets &amp; APMs
      </label>

      <span className="magnet-demobar__hint">
        Test card 4111 1111 1111 1111 · 03/30 · 737
      </span>

      <button type="button" className="magnet-demobar__link" onClick={onRestart}>
        Restart
      </button>

      <button
        type="button"
        className="magnet-demobar__link"
        onClick={() => setCollapsed(true)}
      >
        Hide
      </button>
    </div>
  );
}

export default DemoBar;
