import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const state = (this as any).state as State;
    const props = (this as any).props as Props;

    if (state.hasError) {
      let message = "Something went wrong.";
      try {
        const parsed = JSON.parse(state.error?.message || '');
        if (parsed.error && parsed.operationType) {
          message = `Firestore Error: ${parsed.error} during ${parsed.operationType} on ${parsed.path}`;
        }
      } catch {
        message = state.error?.message || message;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-headline text-primary">System Error</h2>
            <p className="text-on-surface-variant font-body">{message}</p>
            <button
              onClick={() => window.location.reload()}
              className="editorial-btn"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return props.children;
  }
}
