import React from "react";

interface ITF_ErrorBoundaryProps {
  children: React.ReactNode
}

export default class ErrorBoundaryComponent extends React.Component<ITF_ErrorBoundaryProps, any> {
  constructor(props: ITF_ErrorBoundaryProps) {
    super(props);
    this.state = {"error": null, "errorInfo": null};
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{"whiteSpace": "pre-wrap"}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}
