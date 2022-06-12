export default class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    //   console.log(this)
    const BASE_URL = 'https://restcountries.com/v3.1';
    const searchParams = new URLSearchParams({
      fields: `name,capital,population,flags,languages`,
    });
    const url = `${BASE_URL}/name/${this.searchQuery}?${searchParams}`;

    return fetch(url)
      .then(r => {
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      })

  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

