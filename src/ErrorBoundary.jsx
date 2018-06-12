import React from 'react'
import * as Raven from 'raven'
Raven.config('https://5fe6dd8bd2b443319724a1830db0357c@sentry.io/1223512').install();

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Raven.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <div>
                    className="snap"
                    onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
                   
                    <p>We're sorry - something's gone wrong.</p>
                    <p>Our team has been notified, but click here fill out a report.</p>
                </div>
            );
        } else {
            //when there's not en error, render children untouched.
            return this.props.children;
        }
    }
}

/**
 * USAGE:
 * <div>
 *  <ErrorBoundary>
 *    <h2>Sidebar</h2>
 *    <Widget />
 *  </ErrorBoundary>
 *  <p>This content is safe</p>
 * </div>
 */