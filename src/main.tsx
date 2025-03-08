
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Update document title
document.title = 'hackXtreme - Cybersecurity Training Platform';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(<App />);
