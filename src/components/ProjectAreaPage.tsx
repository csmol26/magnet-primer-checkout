import { useState } from 'react';
import MagnetHeader from './MagnetHeader';
import PrimerCardCheckout from './PrimerCardCheckout';
import CardSchemes from './CardSchemes';
import { MerchantTextField } from './MerchantFields';
import { formatAmount, magnetProject } from '../config';
import './ProjectAreaPage.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'designs', label: 'Designs' },
  { id: 'order', label: 'Order' },
  { id: 'saved', label: 'Saved' },
];

function NavIcon({ id }: { id: string }) {
  const paths: Record<string, string> = {
    home: 'M12 3 3 10v11h6v-6h6v6h6V10Z',
    appointment:
      'M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm12 8v10H5V10Z',
    designs:
      'M3 3h8v8H3Zm10 0h8v5h-8Zm0 7h8v11h-8ZM3 13h8v8H3Z',
    order:
      'M6 2h9l5 5v15H6Zm8 1.5V8h4.5ZM8 12h8v1.6H8Zm0 4h8v1.6H8Z',
    saved: 'M6 2h12v20l-6-4.5L6 22Z',
  };

  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path fill="currentColor" d={paths[id] ?? paths.home} />
    </svg>
  );
}

interface ProjectAreaPageProps {
  clientToken: string;
  showAlternativeMethods: boolean;
  onProcessingChange: (isProcessing: boolean) => void;
  onSuccess: () => void;
}

/**
 * Screen 2: the payment panel embedded in the customer's project area, where
 * Magnet collects a deposit and then the outstanding balance.
 */
export function ProjectAreaPage({
  clientToken,
  showAlternativeMethods,
  onProcessingChange,
  onSuccess,
}: ProjectAreaPageProps) {
  const [amount, setAmount] = useState(magnetProject.outstanding.toFixed(2));
  const [activeNav, setActiveNav] = useState('order');

  const merchantFields = (
    <MerchantTextField
      id="project-amount"
      label="Amount"
      value={amount}
      placeholder="0.00"
      onChange={setAmount}
    />
  );

  return (
    <div className="magnet-page magnet-project-page">
      <MagnetHeader title="My Project area" showSettings compact />

      <div className="magnet-project">
        <nav className="magnet-project__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`magnet-project__nav-item${
                activeNav === item.id ? ' magnet-project__nav-item--active' : ''
              }`}
              onClick={() => setActiveNav(item.id)}
            >
              <NavIcon id={item.id} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <main className="magnet-project__main">
          <h1 className="magnet-project__title">My order &amp; payment</h1>

          <div className="magnet-project__order-select">
            <select defaultValue={magnetProject.orderNumber}>
              <option value={magnetProject.orderNumber}>
                Order: {magnetProject.orderNumber}
              </option>
            </select>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="m7 10 5 5 5-5Z" />
            </svg>
          </div>

          <h2 className="magnet-project__subtitle">Order summary</h2>

          <div className="magnet-project__summary">
            <dl className="magnet-project__facts">
              <div>
                <dt>Order number</dt>
                <dd>{magnetProject.orderNumber}</dd>
              </div>
              <div>
                <dt>Order date</dt>
                <dd>{magnetProject.orderDate}</dd>
              </div>
              <div>
                <dt>Total cost</dt>
                <dd className="magnet-project__total">
                  {formatAmount(magnetProject.totalCost)}
                </dd>
              </div>
            </dl>

            <div className="magnet-project__delivery">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm12 8v10H5V10Z"
                />
              </svg>
              <span className="magnet-project__delivery-label">Delivery date</span>
              <span className="magnet-project__delivery-date">
                {magnetProject.deliveryDate}
              </span>
            </div>
          </div>
        </main>

        <aside className="magnet-project__payment">
          <h2 className="magnet-project__payment-title">Payment</h2>

          <ol className="magnet-project__timeline">
            <li>
              <div className="magnet-project__timeline-row">
                <span className="magnet-project__dot" />
                <span className="magnet-project__timeline-label">Amount paid</span>
                <span className="magnet-project__timeline-value">
                  {formatAmount(magnetProject.amountPaid)}
                </span>
              </div>
              <p className="magnet-project__timeline-note">
                Total amount paid so far
              </p>
            </li>
            <li>
              <div className="magnet-project__timeline-row">
                <span className="magnet-project__dot" />
                <span className="magnet-project__timeline-label">
                  Outstanding amount
                </span>
                <span className="magnet-project__timeline-value">
                  {formatAmount(magnetProject.outstanding)}
                </span>
              </div>
              <p className="magnet-project__timeline-note">
                Balance due by {magnetProject.balanceDueOn}
              </p>
            </li>
          </ol>

          <div className="magnet-project__card-head">
            <span className="magnet-project__card-label">
              <svg viewBox="0 0 32 22" width="20" height="14" aria-hidden="true">
                <rect width="32" height="22" rx="3" fill="#1d1d1f" />
                <rect y="5" width="32" height="4" fill="#ffffff" />
              </svg>
              Credit or debit card
            </span>
            <CardSchemes />
          </div>

          <PrimerCardCheckout
            clientToken={clientToken}
            variant="project"
            submitLabel="Pay"
            showAlternativeMethods={showAlternativeMethods}
            merchantFields={merchantFields}
            onProcessingChange={onProcessingChange}
            onSuccess={onSuccess}
          />

          <div className="magnet-project__questions">
            <h3>Questions regarding payment?</h3>
            <p className="magnet-project__showroom">{magnetProject.showroom.name}</p>
            <a href={`mailto:${magnetProject.showroom.email}`}>
              {magnetProject.showroom.email}
            </a>
            <a href={`tel:${magnetProject.showroom.phone}`}>
              {magnetProject.showroom.phone}
            </a>
          </div>
        </aside>
      </div>

      <button type="button" className="magnet-project__help">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            fill="currentColor"
            d="M11.1 14.2v-.5c0-.7.3-1.2 1-1.7l.5-.4c.4-.3.6-.6.6-1a1.2 1.2 0 0 0-2.4 0H9.1a3 3 0 0 1 6 0c0 .9-.4 1.5-1.2 2.1l-.5.4c-.3.3-.4.5-.4.9v.2Zm-.2 2.9v-1.8h2v1.8Z"
          />
        </svg>
        Help
      </button>
    </div>
  );
}

export default ProjectAreaPage;
