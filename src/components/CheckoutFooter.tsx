import CardSchemes from './CardSchemes';
import './CheckoutFooter.css';

/**
 * The strip at the bottom of Magnet's checkout. On their current page it reads
 * "nuvei Secured"; here it is the Primer equivalent, since Primer is the layer
 * holding the card data and orchestrating the processor behind it.
 */
export function CheckoutFooter() {
  return (
    <footer className="magnet-checkout-footer">
      <div className="magnet-checkout-footer__left">
        <div className="magnet-checkout-footer__badge">
          <svg viewBox="0 0 20 22" width="16" height="18" aria-hidden="true">
            <path
              fill="#d64b6a"
              d="M10 0 0 3.4v7.2C0 16.4 4.2 21.1 10 22c5.8-.9 10-5.6 10-11.4V3.4Z"
            />
            <path
              fill="#ffffff"
              d="m8.9 14.4-3.2-3.2 1.3-1.3 1.9 1.9 4.4-4.4 1.3 1.3Z"
            />
          </svg>
          <div className="magnet-checkout-footer__badge-text">
            <span className="magnet-checkout-footer__brand">primer</span>
            <span className="magnet-checkout-footer__sub">Secured</span>
          </div>
        </div>

        <div className="magnet-checkout-footer__lock">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9Zm-8-2a3 3 0 0 1 6 0v2H9Z"
            />
          </svg>
          <span>Secure payment</span>
        </div>
      </div>

      <div className="magnet-checkout-footer__right">
        <span className="magnet-checkout-footer__accept">
          We accept all major debit &amp; credit cards
        </span>
        <CardSchemes />
      </div>
    </footer>
  );
}

export default CheckoutFooter;
