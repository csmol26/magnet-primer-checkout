import { formatAmount, type MagnetOrder } from '../config';
import './OrderSummary.css';

interface OrderSummaryProps {
  order: MagnetOrder;
}

/** The black-headed "Your Order" panel on the right of the checkout page. */
export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <aside className="magnet-order">
      <div className="magnet-order__header">
        <h2>Your Order</h2>
      </div>

      <div className="magnet-order__lines">
        <div className="magnet-order__line-head">
          <span className="magnet-order__ref">Order Number: {order.orderNumber}</span>
          <span className="magnet-order__amount">{formatAmount(order.total)}</span>
        </div>
        {order.lines.map((line, index) => (
          <div key={index} className="magnet-order__line">
            <div>{line.label}</div>
            {line.quantity ? <div>Quantity: {line.quantity}</div> : null}
          </div>
        ))}
      </div>

      <div className="magnet-order__totals">
        <div className="magnet-order__row">
          <span>Sub Total</span>
          <span>{formatAmount(order.subTotal)}</span>
        </div>
        <div className="magnet-order__row">
          <span>Promo Code Applied</span>
          <span>- {formatAmount(order.promoCode)}</span>
        </div>
        <div className="magnet-order__row">
          <span>Shipping &amp; Handling</span>
          <span>{formatAmount(order.shipping)}</span>
        </div>
        <div className="magnet-order__row">
          <span>Estimated Tax</span>
          <span>{formatAmount(order.estimatedTax)}</span>
        </div>

        <div className="magnet-order__row magnet-order__row--total">
          <span>Order Total</span>
          <span>{formatAmount(order.total)}</span>
        </div>
      </div>
    </aside>
  );
}

export default OrderSummary;
