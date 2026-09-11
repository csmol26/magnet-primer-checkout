/**
 * Mock data for the Magnet checkout mockup.
 *
 * Everything here is presentation only. It mirrors the two screens Magnet
 * shared: the standalone "Secure Checkout" page and the payment panel inside
 * the customer's project area. Amounts shown are the merchant's own order
 * figures, independent from the sandbox client session used by the SDK.
 */

export interface OrderLine {
  label: string;
  amount: number;
  quantity?: number;
}

export interface MagnetOrder {
  orderNumber: string;
  lines: OrderLine[];
  subTotal: number;
  promoCode: number;
  shipping: number;
  estimatedTax: number;
  total: number;
}

/** Screen 1: the standalone "Secure Checkout" page. */
export const secureCheckoutOrder: MagnetOrder = {
  orderNumber: 'PQRS',
  lines: [{ label: '£120.00', amount: 120, quantity: 1 }],
  subTotal: 120,
  promoCode: 0,
  shipping: 0,
  estimatedTax: 0,
  total: 120,
};

export interface MagnetProject {
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  totalCost: number;
  amountPaid: number;
  outstanding: number;
  balanceDueOn: string;
  showroom: {
    name: string;
    email: string;
    phone: string;
  };
}

/** Screen 2: the payment panel inside "My project area". */
export const magnetProject: MagnetProject = {
  orderNumber: 'ABCD',
  orderDate: '05/03/2026',
  deliveryDate: '10/10/2026',
  totalCost: 80,
  amountPaid: 10,
  outstanding: 70,
  balanceDueOn: '10/10/2026',
  // Showroom contact details are redacted: the mockup is shared outside
  // Primer, so no real branch address or phone number ships with it.
  showroom: {
    name: '####',
    email: '####',
    phone: '####',
  },
};

/**
 * Pre-filled billing details. A demo persona on purpose, so no real customer
 * name or address ends up in this repository.
 */
export const customer = {
  name: 'Chris Smol',
  email: 'chris.smol@example.com',
  country: 'United Kingdom',
};

export const currencySymbol = '£';

export function formatAmount(amount: number): string {
  return `${currencySymbol}${amount.toFixed(2)}`;
}
