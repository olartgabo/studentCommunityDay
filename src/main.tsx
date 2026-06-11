import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SponsorDeck from './SponsorDeck';
import './styles/globals.css';

const isSponsorDeck = window.location.pathname.replace(/\/+$/, '') === '/sponsor-deck';
const Page = isSponsorDeck ? SponsorDeck : App;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
