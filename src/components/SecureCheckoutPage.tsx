import { useState } from 'react';
import MagnetHeader from './MagnetHeader';
import OrderSummary from './OrderSummary';
import CheckoutFooter from './CheckoutFooter';
import PrimerCardCheckout from './PrimerCardCheckout';
import { MerchantSelectField, MerchantTextField } from './MerchantFields';
import { customer, secureCheckoutOrder } from '../config';
import './SecureCheckoutPage.css';

const COUNTRIES = [
  'United Kingdom',
  'Ireland',
  'France',
  'Germany',
  'Netherlands',
  'Spain',
];

interface SecureCheckoutPageProps {
  clientToken: string;
  showAlternativeMethods: boolean;
  onProcessingChange: (isProcessing: boolean) => void;
  onSuccess: () => void;
}

/**
 * Screen 1: Magnet's standalone "Secure Checkout" page, rebuilt on Primer
 * Checkout web components.
 */
export function SecureCheckoutPage({
  clientToken,
  showAlternativeMethods,
  onProcessingChange,
  onSuccess,
}: SecureCheckoutPageProps) {
  const [email, setEmail] = useState(customer.email);
  const [country, setCountry] = useState(customer.country);

  const merchantFields = (
    <div className="magnet-billing">
      <button type="button" className="magnet-billing__toggle">
        Billing Details
      </button>
      <MerchantTextField
        id="billing-email"
        label="E-mail"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <MerchantSelectField
        id="billing-country"
        label="Country"
        value={country}
        options={COUNTRIES}
        onChange={setCountry}
      />
    </div>
  );

  return (
    <div className="magnet-page">
      <MagnetHeader />

      <main className="magnet-secure">
        <div className="magnet-secure__card">
          <div className="magnet-secure__grid">
            <section className="magnet-secure__main">
              <header className="magnet-secure__intro">
                <h1>Secure Checkout</h1>
                <p>Choose your preferred payment method</p>
              </header>

              <div className="magnet-secure__methods">
                <button
                  type="button"
                  className="magnet-method-tile magnet-method-tile--selected"
                  aria-pressed="true"
                  aria-label="Credit or debit card"
                >
                  <svg viewBox="0 0 32 22" width="30" height="21" aria-hidden="true">
                    <rect width="32" height="22" rx="3" fill="#2f9fe0" />
                    <rect y="5" width="32" height="4" fill="#1d1d1f" />
                    <rect x="3" y="13" width="9" height="3" rx="1" fill="#ffffff" />
                  </svg>
                </button>
              </div>

              <p className="magnet-secure__consent">
                By continuing, you are agreeing to the secure storing of your card
                details for future use. For details regarding how and when your card
                details will be used, please see <a href="#consent">here</a>.
              </p>

              <PrimerCardCheckout
                clientToken={clientToken}
                variant="secure"
                submitLabel="Pay Securely Now"
                showAlternativeMethods={showAlternativeMethods}
                merchantFields={merchantFields}
                onProcessingChange={onProcessingChange}
                onSuccess={onSuccess}
              />

              <button type="button" className="magnet-secure__back">
                Go Back
              </button>
            </section>

            <OrderSummary order={secureCheckoutOrder} />
          </div>

          <CheckoutFooter />
        </div>
      </main>
    </div>
  );
}

export default SecureCheckoutPage;
