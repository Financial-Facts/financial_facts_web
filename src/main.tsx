import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@fontsource/league-spartan";
import "@fontsource/league-spartan/400.css";
import "@fontsource/libre-baskerville";
import "@fontsource/libre-baskerville/400.css";
import './styles.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
