import './MagnetPayButton.css';

interface MagnetPayButtonProps {
  label: string;
  /** 'green' on the Secure Checkout page, 'black' in the project area. */
  tone: 'green' | 'black';
  isProcessing: boolean;
}

/**
 * Magnet's own pay button, driving Primer's card form from the outside.
 *
 * Primer's built-in <primer-card-form-submit> is rendered with
 * `display: contents` across two shadow roots, so it cannot be restyled from
 * the page. The SDK supports exactly this case: set
 * `submitButton.useBuiltInButton: false` and dispatch `primer:card-submit`.
 * Validation, tokenisation and 3DS stay entirely inside the SDK.
 */
export function MagnetPayButton({
  label,
  tone,
  isProcessing,
}: MagnetPayButtonProps) {
  const submit = () => {
    document.dispatchEvent(
      new CustomEvent('primer:card-submit', { bubbles: true, composed: true }),
    );
  };

  return (
    <button
      type="button"
      className={`magnet-pay magnet-pay--${tone}`}
      onClick={submit}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <span className="magnet-pay__spinner" aria-hidden="true" />
      ) : (
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9Zm-8-2a3 3 0 0 1 6 0v2H9Z"
          />
        </svg>
      )}
      {isProcessing ? 'Processing…' : label}
    </button>
  );
}

export default MagnetPayButton;
