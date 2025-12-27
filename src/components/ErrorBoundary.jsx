import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error capturado en ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return null; // o un fallback si quieres
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
