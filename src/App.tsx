import { useCallback, useEffect, useState } from 'react';
import { loadPrimer } from '@primer-io/primer-js';
import { fetchClientToken } from './fetchClientToken';
import DemoBar from './components/DemoBar';
import LoadingState from './components/LoadingState';
import ProcessingOverlay from './components/ProcessingOverlay';
import SecureCheckoutPage from './components/SecureCheckoutPage';
import ProjectAreaPage from './components/ProjectAreaPage';
import ConfirmationPage from './components/ConfirmationPage';
import type { CheckoutVariant } from './components/PrimerCardCheckout';
import './styles/base.css';
import './App.css';

/**
 * Magnet × Primer Checkout mockup.
 *
 * Demo loop: fake site load → checkout → processing overlay → confirmation →
 * restart. Two screens are reproduced, both running the same Primer Checkout
 * web components under Magnet's own styling.
 */

type DemoStep = 'loading' | 'checkout' | 'confirmation';

export function App() {
  const [step, setStep] = useState<DemoStep>('loading');
  const [screen, setScreen] = useState<CheckoutVariant>('secure');
  const [showAlternativeMethods, setShowAlternativeMethods] = useState(false);
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  // One fresh client session per screen and per demo run. A session is
  // consumed once a payment succeeds, so restarting always needs a new one.
  useEffect(() => {
    if (step !== 'checkout') return;

    let cancelled = false;
    setClientToken(null);
    setTokenError(null);

    const initialise = async () => {
      try {
        await loadPrimer();
        const response = await fetchClientToken();
        if (cancelled) return;

        if (response.success) {
          setClientToken(response.clientToken);
        } else {
          setTokenError(response.error);
        }
      } catch (error) {
        console.error('Could not initialise the checkout:', error);
        if (!cancelled) setTokenError('Could not initialise the checkout');
      }
    };

    void initialise();

    return () => {
      cancelled = true;
    };
  }, [step, sessionId]);

  const handleProcessingChange = useCallback((processing: boolean) => {
    setIsProcessing(processing);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsProcessing(false);
    setStep('confirmation');
  }, []);

  const handleScreenChange = useCallback((next: CheckoutVariant) => {
    setScreen(next);
    setStep('checkout');
    setSessionId((value) => value + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setIsProcessing(false);
    setStep('loading');
    setSessionId((value) => value + 1);
  }, []);

  const handleLoadingComplete = useCallback(() => setStep('checkout'), []);

  if (step === 'loading') {
    return <LoadingState onLoadingComplete={handleLoadingComplete} />;
  }

  const demoBar = (
    <DemoBar
      screen={screen}
      onScreenChange={handleScreenChange}
      showAlternativeMethods={showAlternativeMethods}
      onToggleAlternativeMethods={setShowAlternativeMethods}
      onRestart={handleRestart}
    />
  );

  if (step === 'confirmation') {
    return (
      <>
        {demoBar}
        <ConfirmationPage variant={screen} onRestart={handleRestart} />
      </>
    );
  }

  if (tokenError) {
    return (
      <>
        {demoBar}
        <div className="magnet-fatal">
          <h1>Checkout unavailable</h1>
          <p>{tokenError}</p>
          <button type="button" onClick={handleRestart}>
            Try again
          </button>
        </div>
      </>
    );
  }

  if (!clientToken) {
    return (
      <>
        {demoBar}
        <div className="magnet-fatal magnet-fatal--quiet">
          <div className="magnet-spinner" />
          <p>Opening a secure session…</p>
        </div>
      </>
    );
  }

  return (
    <>
      {demoBar}
      <ProcessingOverlay isVisible={isProcessing} />

      {screen === 'secure' ? (
        <SecureCheckoutPage
          clientToken={clientToken}
          showAlternativeMethods={showAlternativeMethods}
          onProcessingChange={handleProcessingChange}
          onSuccess={handleSuccess}
        />
      ) : (
        <ProjectAreaPage
          clientToken={clientToken}
          showAlternativeMethods={showAlternativeMethods}
          onProcessingChange={handleProcessingChange}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}

export default App;
