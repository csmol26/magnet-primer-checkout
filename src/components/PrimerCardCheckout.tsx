import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { PrimerCheckoutComponent, SdkState } from '@primer-io/primer-js';
import MagnetPayButton from './MagnetPayButton';
import '../styles/primer-magnet-theme.css';

/**
 * The Primer Checkout block, shared by both Magnet screens.
 *
 * The whole card form is Primer web components: the card number, expiry and
 * CVV fields are PCI-hosted iframes owned by Primer, so no card data touches
 * Magnet's page. Only the layout and the CSS variables are Magnet's.
 */

/** Screen 1 — the standalone Secure Checkout page. */
const SECURE_CHECKOUT_OPTIONS = {
  locale: 'en-GB',
  card: {
    cardholderName: {
      visible: true,
      required: true,
      placeholder: 'Cardholder Name',
      defaultValue: 'Kerry Colt',
    },
  },
  submitButton: {
    // Magnet renders its own button; see MagnetPayButton.
    useBuiltInButton: false,
  },
};

/** Screen 2 — the payment panel inside the project area. */
const PROJECT_AREA_OPTIONS = {
  locale: 'en-GB',
  card: {
    cardholderName: {
      visible: true,
      required: true,
      placeholder: 'J. Smith',
    },
  },
  submitButton: {
    // Magnet renders its own button; see MagnetPayButton.
    useBuiltInButton: false,
  },
};

export type CheckoutVariant = 'secure' | 'project';

interface PrimerCardCheckoutProps {
  clientToken: string;
  variant: CheckoutVariant;
  submitLabel: string;
  /** Show wallets and alternative methods alongside the card form. */
  showAlternativeMethods?: boolean;
  /**
   * Magnet's own fields (billing e-mail, country, amount), rendered inside the
   * card form so they submit with the same button, exactly as on their page.
   */
  merchantFields?: ReactNode;
  onProcessingChange: (isProcessing: boolean) => void;
  onSuccess: () => void;
}

export function PrimerCardCheckout({
  clientToken,
  variant,
  submitLabel,
  showAlternativeMethods = false,
  merchantFields,
  onProcessingChange,
  onSuccess,
}: PrimerCardCheckoutProps) {
  const checkoutRef = useRef<PrimerCheckoutComponent>(null);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sdkError, setSdkError] = useState<string | null>(null);

  useEffect(() => {
    const checkout = checkoutRef.current;
    if (!checkout) return;

    const handleReady = () => setIsReady(true);

    const handleStateChange = (event: Event) => {
      const state = (event as CustomEvent<SdkState>).detail;
      if (!state) return;

      if (!state.isLoading) setIsReady(true);
      setIsProcessing(Boolean(state.isProcessing));
      onProcessingChange(Boolean(state.isProcessing));

      if (state.primerJsError) {
        setSdkError(
          state.primerJsError.message ?? 'The payment system could not start.',
        );
      }
    };

    const handleSuccess = () => {
      setIsProcessing(false);
      onProcessingChange(false);
      onSuccess();
    };

    const handleFailure = (event: Event) => {
      // The SDK renders the decline message itself through
      // <primer-error-message-container>, so we only release the overlay.
      const detail = (event as CustomEvent).detail;
      console.warn('Payment failed:', detail?.error?.message ?? detail);
      setIsProcessing(false);
      onProcessingChange(false);
    };

    checkout.addEventListener('primer:ready', handleReady);
    checkout.addEventListener('primer:state-change', handleStateChange);
    checkout.addEventListener('primer:payment-success', handleSuccess);
    checkout.addEventListener('primer:payment-failure', handleFailure);

    return () => {
      checkout.removeEventListener('primer:ready', handleReady);
      checkout.removeEventListener('primer:state-change', handleStateChange);
      checkout.removeEventListener('primer:payment-success', handleSuccess);
      checkout.removeEventListener('primer:payment-failure', handleFailure);
    };
  }, [onProcessingChange, onSuccess]);

  const options =
    variant === 'secure' ? SECURE_CHECKOUT_OPTIONS : PROJECT_AREA_OPTIONS;

  return (
    <div className="magnet-primer-host">
      {!isReady && !sdkError ? (
        <div className="magnet-primer-loading">
          <div className="magnet-spinner" />
          <span>Loading secure payment fields…</span>
        </div>
      ) : null}

      {sdkError ? <div className="magnet-primer-error">{sdkError}</div> : null}

      <primer-checkout
        ref={checkoutRef}
        options={options}
        client-token={clientToken}
        class={`magnet-primer magnet-primer--${variant}`}
        style={{ display: isReady ? 'block' : 'none' }}
      >
        <primer-main slot="main">
          <div slot="payments">
            <primer-card-form>
              <div slot="card-form-content" className="magnet-card-form">
                {/* Field order differs between Magnet's two screens. Reordering
                    is just DOM order inside the slot — the SDK does not care. */}
                {variant === 'secure' ? (
                  <primer-input-card-holder-name label="Cardholder Name" />
                ) : null}

                <primer-input-card-number
                  label="Card Number"
                  placeholder="Card Number"
                />

                <div className="magnet-card-form__row">
                  <primer-input-card-expiry
                    label="Expiry date"
                    placeholder="MM/YY"
                  />
                  <primer-input-cvv
                    label={variant === 'secure' ? 'CVV' : 'CSC / CVV'}
                    placeholder={variant === 'secure' ? 'CVV' : '123'}
                  />
                </div>

                {variant === 'project' ? (
                  <primer-input-card-holder-name label="Name on card" />
                ) : null}

                <primer-error-message-container show-processing-errors />

                {merchantFields}

                <div className="magnet-card-form__submit">
                  <MagnetPayButton
                    label={submitLabel}
                    tone={variant === 'secure' ? 'green' : 'black'}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </primer-card-form>

            {showAlternativeMethods ? (
              <div className="magnet-apms">
                <div className="magnet-apms__divider">
                  <span>or pay another way</span>
                </div>
                <primer-payment-method-container exclude="PAYMENT_CARD" />
              </div>
            ) : null}
          </div>

          {/* Emptied on purpose: the app swaps in Magnet's own confirmation
              page once primer:payment-success fires. */}
          <div slot="checkout-complete" />
        </primer-main>
      </primer-checkout>
    </div>
  );
}

export default PrimerCardCheckout;
