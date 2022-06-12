import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './ImagesApiServise';
import { makeImageMarkup } from './makeImageMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

console.log(SimpleLightbox);

const imagesApiService = new ImagesApiService();

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });

console.log(lightbox)



const refs = {
    form: document.querySelector(`.js-search-form`),
    gallery: document.querySelector(`.gallery`)
    
}

refs.form.addEventListener('submit', onFormSubmit)


function onFormSubmit (e) {
    e.preventDefault();

    const inputSymbols = e.currentTarget.searchQuery.value;
    //   console.log(inputSymbols)
      imagesApiService.query = inputSymbols

      const promiseImagesArr = imagesApiService.fetchImages();

    //   console.log(promiseImagesArr)

      promiseImagesArr
      .then(makeImageMarkup)
      .then(renderImageCard)
      .catch(showError);

    //   const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });
}




function renderImageCard(imageMarkup) {
    refs.gallery.innerHTML = imageMarkup;
  }

  function showError(error) {
    //   console.log(`помилка ${error}`);
    return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }





