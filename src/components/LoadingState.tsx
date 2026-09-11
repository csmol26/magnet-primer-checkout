import { useEffect } from 'react';
import { MagnetLogo } from './MagnetHeader';
import './LoadingState.css';

interface LoadingStateProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
}

/** Fake site load, so the demo always starts from the same place. */
export function LoadingState({
  onLoadingComplete,
  minLoadingTime = 1600,
}: LoadingStateProps) {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, minLoadingTime);
    return () => clearTimeout(timer);
  }, [onLoadingComplete, minLoadingTime]);

  return (
    <div className="magnet-loading">
      <div className="magnet-loading__inner">
        <div className="magnet-loading__logo">
          <MagnetLogo />
        </div>
        <div className="magnet-spinner magnet-loading__spinner" />
      </div>
    </div>
  );
}

export default LoadingState;
