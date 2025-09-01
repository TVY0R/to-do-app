import React, { ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try Again</button>
          <button onClick={() => (window.location.href = "/")}>Go Home</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
