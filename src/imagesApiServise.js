export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
  }

  // https://pixabay.com/api/?key=28004990-f3c49f187ad64f64267c5955f&q=yellow+flowers&image_type=photo


  fetchImages() {
    //   console.log(this)
    const BASE_URL = 'https://pixabay.com/api';
    const API_KEY = '28004990-f3c49f187ad64f64267c5955f'

    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });

    const url = `${BASE_URL}/?${searchParams}`;

    // console.log(url)

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

