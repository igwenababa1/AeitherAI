import React, { Component, ErrorInfo, ReactNode } from 'react';
import FallbackUI from './FallbackUI';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Re-added the constructor to explicitly call super(props).
  // This ensures 'this.props' is correctly initialized on the component instance,
  // resolving the error where the 'props' property was not found.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }
  
  private handleReset = () => {
    // A simple page reload is often the most effective way to reset state after an error.
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return <FallbackUI onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
