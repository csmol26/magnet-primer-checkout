import './ProcessingOverlay.css';

interface ProcessingOverlayProps {
  isVisible: boolean;
}

/**
 * Dims the page while Primer processes the payment. It overlays rather than
 * unmounts, so the SDK keeps its iframes and the flow is never interrupted
 * (3DS challenges and redirects included).
 */
export function ProcessingOverlay({ isVisible }: ProcessingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="magnet-processing" role="status" aria-live="polite">
      <div className="magnet-processing__panel">
        <div className="magnet-spinner" />
        <h2>Processing your payment…</h2>
        <p>Please do not close this window.</p>
      </div>
    </div>
  );
}

export default ProcessingOverlay;
