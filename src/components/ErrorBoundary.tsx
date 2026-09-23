import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('App error:', error, info);
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <main className="app-main" role="alert">
          <div className="card">
            <h1>Something went wrong</h1>
            <p>
              The app hit an unexpected error. You can reload the page or reset
              your local progress from Settings on the home page.
            </p>
            <p>
              <code>{this.state.error.message}</code>
            </p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                this.setState({ error: null });
                window.location.assign(
                  `${window.location.pathname}${window.location.search}#/battle`,
                );
                window.location.reload();
              }}
            >
              Reload
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
