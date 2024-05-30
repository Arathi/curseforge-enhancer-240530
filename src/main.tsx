import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement('div');
root.id = 'cfe';
document.body.append(root);

ReactDOM.createRoot(root).render(<App />);
