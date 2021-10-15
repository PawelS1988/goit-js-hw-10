'use strict';

//importy bibliotek i innych plików

import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

//zdefiniowane zmienne dla ID w htmlu

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

const findCountry = () => {
  let name = searchBox.value.trim();

  if (name === '') {
    Notiflix.Notify.info('Please type in a country name');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    fetchCountries(name)
      .then(data => {
        console.log('albo tu sa potrzebne dane:', data);
        console.log('ilosc', data.length);
        if (data.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        } else if (data.length >= 2 && data.length <= 10) {
          renderList(data);
          countryInfo.innerHTML = '';
        } else if ((data.length = 1)) {
          renderInfo(data);
          countryList.innerHTML = '';
        }
        // else
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      });
  }
  // .catch(error => console.log('error fetchCountries:', error));
};
