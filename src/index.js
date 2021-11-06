import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countryListTempl from './templates/country-list.hbs';
import countryCardTempl from './templates/country-card.hbs';

const inputRef = document.querySelector('#js-input');
const containerRef = document.querySelector('.countries');

inputRef.addEventListener('input', debounce(searchCountry, 500));

function searchCountry() {
    fetchCountries(inputRef.value).then(data => {
        if (!data.length) createMarkUp();
        if (data.length === 1) createMarkUp(countryCardTempl(data));
        if (data.length >= 2 && data.length <= 10) createMarkUp(countryListTempl(data));
        if (data.length > 10) errMessage('Please enter more specific request');
    });
}

function createMarkUp(markup) {
    containerRef.innerHTML = "";
    if (markup) containerRef.insertAdjacentHTML('beforeend', markup);
}

function errMessage(message) {
    return error({
      text: message,
      delay: 1500,
      closer: false,
      title: 'Error',
      icon: false,
      width: '250px',
      sticker: false,
      addClass: 'error-box',
    });
  }