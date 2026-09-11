import MagnetHeader from './MagnetHeader';
import CheckoutFooter from './CheckoutFooter';
import { formatAmount, magnetProject, secureCheckoutOrder } from '../config';
import type { CheckoutVariant } from './PrimerCardCheckout';
import './ConfirmationPage.css';

interface ConfirmationPageProps {
  variant: CheckoutVariant;
  onRestart: () => void;
}

export function ConfirmationPage({ variant, onRestart }: ConfirmationPageProps) {
  const isSecure = variant === 'secure';
  const reference = isSecure
    ? secureCheckoutOrder.orderNumber
    : magnetProject.orderNumber;
  const amount = isSecure
    ? secureCheckoutOrder.total
    : magnetProject.outstanding;

  return (
    <div className="magnet-page">
      <MagnetHeader />

      <main className="magnet-confirmation">
        <div className="magnet-confirmation__card">
          <div className="magnet-confirmation__body">
            <div className="magnet-confirmation__tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30">
                <path
                  fill="currentColor"
                  d="m9.6 16.2-3.8-3.8L4.4 13.8l5.2 5.2L20 8.6 18.6 7.2Z"
                />
              </svg>
            </div>

            <h1>Payment received</h1>
            <p className="magnet-confirmation__lead">
              Thank you. We have sent a confirmation to your e-mail address.
            </p>

            <dl className="magnet-confirmation__facts">
              <div>
                <dt>Order number</dt>
                <dd>{reference}</dd>
              </div>
              <div>
                <dt>Amount paid</dt>
                <dd>{formatAmount(amount)}</dd>
              </div>
              <div>
                <dt>Payment method</dt>
                <dd>Card</dd>
              </div>
            </dl>

            <button
              type="button"
              className="magnet-confirmation__restart"
              onClick={onRestart}
            >
              Run the demo again
            </button>
          </div>

          <CheckoutFooter />
        </div>
      </main>
    </div>
  );
}

export default ConfirmationPage;
