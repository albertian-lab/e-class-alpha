
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Minimal polyfill for process.env in browser environments if not already defined
// This is to prevent ReferenceError when process.env is accessed by libraries
// that expect a Node.js-like environment, while still adhering to the
// guideline that API_KEY should come from process.env.
if (typeof process === 'undefined') {
  (window as any).process = { env: {} };
}
// Ensure NODE_ENV is set, as some libraries might depend on it
if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}
