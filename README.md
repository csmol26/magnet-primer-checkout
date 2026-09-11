# Magnet × Primer Checkout

A working, branded mockup of Magnet's checkout, rebuilt on Primer Checkout web
components. It reproduces the two screens Magnet shared:

1. **Secure Checkout** — the standalone payment page (order PQRS, £120.00).
2. **My project area** — the embedded payment panel where a customer pays the
   balance on a kitchen order (£10.00 paid, £70.00 outstanding).

Both screens run the same Primer card form. Only the layout and the CSS
variables differ, which is the point: one integration, any number of branded
surfaces.

## Run it

### StackBlitz

Import the folder into StackBlitz (**Open in StackBlitz → Import project**, or
drag the folder onto stackblitz.com). It installs and starts on its own —
`.stackblitzrc` runs `npm run dev`.

Drag the project folder **without** `node_modules` and `dist`; StackBlitz
installs dependencies itself and both folders are large.

### Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Try a payment

The dark strip at the top is demo-only. Hit **Hide** before screenshotting or
sharing the link.

| Control | What it does |
|---|---|
| Secure Checkout / Project area | Switches between Magnet's two screens |
| Wallets & APMs | Adds PayPal, Google Pay and the other methods enabled on the sandbox session |
| Restart | Opens a fresh client session and replays the demo |

Sandbox test card:

```
4111 1111 1111 1111    03/30    737
```

The flow is real: the card is tokenised by Primer, a sandbox payment is
created, and `primer:payment-success` drives the confirmation screen.

## What is Primer and what is Magnet

This matters when you walk a merchant through it.

**Primer** owns everything that touches card data:

- `<primer-checkout>` — SDK root, holds the client session
- `<primer-main>` — checkout state machine (loading, payments, complete, error)
- `<primer-card-form>` — the form and its validation
- `<primer-input-card-number>`, `<primer-input-card-expiry>`, `<primer-input-cvv>`,
  `<primer-input-card-holder-name>` — PCI-hosted iframes; card data never enters
  Magnet's DOM
- `<primer-error-message-container>` — decline and validation messages
- `<primer-payment-method-container>` — wallets and alternative methods

**Magnet** owns everything else: the page shell, the order summary, the
billing e-mail and country fields, the pay button, and every colour, radius and
font in the checkout.

The skin is entirely CSS custom properties, in
[`src/styles/primer-magnet-theme.css`](src/styles/primer-magnet-theme.css). No
SDK internals are overridden, so it survives SDK upgrades. Token names are
verified against `@primer-io/primer-js` 1.9.3.

### The pay button

Primer's built-in `<primer-card-form-submit>` renders with `display: contents`
across two shadow roots, so a page cannot restyle it. To get Magnet's exact
green full-width button with its padlock, the project uses the SDK's supported
external-button path:

```ts
options.submitButton.useBuiltInButton = false;
```

```ts
document.dispatchEvent(
  new CustomEvent('primer:card-submit', { bubbles: true, composed: true }),
);
```

Validation, tokenisation and 3DS all stay inside the SDK. See
[`MagnetPayButton.tsx`](src/components/MagnetPayButton.tsx).

To go back to Primer's own button, drop `useBuiltInButton` and put
`<primer-card-form-submit buttonText="Pay Securely Now" />` back in the slot.

## Client session

The mockup has no backend, so it uses Primer's public SDK demo service to get a
short-lived **sandbox** client token. In production, the merchant's backend
calls `POST /client-session` with the API key and returns `clientToken` to the
browser — the API key never reaches the front end.

One file changes: [`src/fetchClientToken.ts`](src/fetchClientToken.ts). Point it
at your endpoint and nothing else moves.

Amounts on screen (£120.00, £70.00) are Magnet's own order figures and are
presentational. The sandbox session carries its own amount.

## Sandbox notes

- **Apple Pay** logs an init error on `http://localhost`. It needs HTTPS; on
  StackBlitz it is fine.
- **3DS** may occasionally fail its continue call in sandbox. The SDK skips it
  and the payment still completes. This does not happen in production.
- A client session is consumed once a payment succeeds, which is why Restart
  fetches a new one.

## Layout

```
src/
├── App.tsx                       demo loop: load → checkout → processing → confirmation
├── config.ts                     order data for both screens
├── fetchClientToken.ts           swap this for your backend
├── styles/
│   ├── base.css                  Magnet design tokens
│   └── primer-magnet-theme.css   the Magnet skin for the Primer components
└── components/
    ├── PrimerCardCheckout.tsx    the Primer block, shared by both screens
    ├── MagnetPayButton.tsx       Magnet's own submit button
    ├── SecureCheckoutPage.tsx    screen 1
    ├── ProjectAreaPage.tsx       screen 2
    ├── OrderSummary.tsx          the "Your Order" panel
    ├── MerchantFields.tsx        Magnet's non-PCI fields
    ├── MagnetHeader.tsx / CheckoutFooter.tsx / CardSchemes.tsx
    ├── LoadingState.tsx / ProcessingOverlay.tsx / ConfirmationPage.tsx
    └── DemoBar.tsx               demo controls, not part of the design
```

## Stack

React 19, TypeScript, Vite 7, `@primer-io/primer-js` 1.9.3.
