import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { makeCountryMarkup } from './makeCountryMarkup';
import { makeCountriesListMarkup } from './makeCountriesListMarkup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import compiledTemplate from "./templates/country-card.hbs";
// import CountriesApiService from './countriesApiServise';

const DEBOUNCE_DELAY = 300;

// const countriesApiServise = new CountriesApiService();

const refs = {
  input: document.querySelector(`#search-box`),
  countryList: document.querySelector(`.country-list`),
  countryInfo: document.querySelector(`.country-info`),
};

refs.input.addEventListener(`input`, debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const inputSymbols = e.target.value.trim();
  //   console.log(inputSymbols)

  //   countriesApiServise.query = e.target.value.trim();

  if (inputSymbols === null || inputSymbols === ``) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  // // //   const promiseCountryArr = countriesApiServise.fetchCountries();
  const promiseCountryArr = fetchCountries(inputSymbols);

  //   console.log(promiseCountryArr)

  promiseCountryArr.catch(showError);

  promiseCountryArr.then(r => {
    if (r.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      refs.countryList.innerHTML = '';
      return;
    }

    if (r.length === 1) {
      promiseCountryArr
        .then(makeCountryMarkup)
        .then(renderCountryCard)
        .catch(showError);
      refs.countryList.innerHTML = '';
      return;
    }

    promiseCountryArr
      .then(makeCountriesListMarkup)
      .then(renderCountriesList)
      .catch(showError);
    refs.countryInfo.innerHTML = '';
  });
}

function renderCountryCard(countryMarkup) {
  refs.countryInfo.innerHTML = countryMarkup;
}

function renderCountriesList(countriesListMarkup) {
  refs.countryList.innerHTML = countriesListMarkup;
}

function showError(error) {
  //   console.log(`помилка ${error}`);
  return Notify.failure('Oops, there is no country with that name');
}
