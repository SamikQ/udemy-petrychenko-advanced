import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import MarvelService from './services/MarvelService';
import App from './components/app/App';

const marvelService = new MarvelService();

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); //Беремо массив всіх наших персонажів і виводимо імена


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);