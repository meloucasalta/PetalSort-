import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Prevent unhandled rendering exceptions from showing a white screen
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF9FB] text-[#2D1320] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#F5D0DE] rounded-2xl p-8 text-center">
            <h1 className="font-display text-2xl font-bold text-[#2D1320] mb-3">
              Something went wrong displaying this view
            </h1>
            <p className="text-sm text-[#6B4C5B] leading-relaxed mb-6">
              Reload the guide to restore the interactive waste sorting workspace.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#DB2777] text-white text-sm font-semibold hover:bg-[#BE185D] transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Reload Guide
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
