import SimpleLightbox from 'simplelightbox';
// import SimpleLightbox from '../node_modules/simplelightbox/dist/simple-lightbox.modules.js';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './imagesApiServise';
import { makeImageMarkup } from './makeImageMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import BtnLoadMore from './btn-load-more';
import debounce from 'debounce';

const imagesApiService = new ImagesApiService();
const btnLoadMore = new BtnLoadMore({
  selector: `[data-action="load-more"]`,
  hidden: true,
});

const { form, gallery } = {
  form: document.querySelector(`.js-search-form`),
  gallery: document.querySelector(`.gallery`),
};


// let lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });
// console.log(lightbox)

form.addEventListener('submit', onFormSubmit);
btnLoadMore.refs.button.addEventListener(`click`, fetchAndRenderImages);
gallery.addEventListener(`click`, onGalleryClick);

async function onFormSubmit(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.query === null || imagesApiService.query === ``) {
    return;
  }

  btnLoadMore.show();
  imagesApiService.resetPage();
  clearContainer();
  const images = await fetchAndRenderImages();

  if (images.hits.length > 0) {
    Notify.info(`Hooray! We found ${images.totalHits} images.`);
  }
}

async function fetchAndRenderImages() {
  try {
    btnLoadMore.disable();
    const images = await imagesApiService.fetchImages();

    // console.log(images)

    // let imagesContainer = document.querySelectorAll(`.gallery__item`);
    // if (images.totalHits <= imagesContainer.length) {
    //   btnLoadMore.hide();
    //   Notify.failure(
    //     'Ups We are sorry, but you have reached the end of search results. '
    //   );
    //   return;
    // }

    if (images.hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      btnLoadMore.hide();
      gallery.innerHTML = '';
      return;
    }

    const imageMarkup = await makeImageMarkup(images);
    btnLoadMore.enable();
    renderImageCard(imageMarkup);

    // imagesContainer = document.querySelectorAll(`.gallery__item`);

    //   const { height: cardHeight } = document
    //   .querySelector('.gallery')
    //   .firstElementChild.getBoundingClientRect();
    // window.scrollBy({
    //   top: cardHeight * 10,
    //   behavior: 'smooth',
    // });

    return images;
  } catch (error) {
    const AxiosError = await error;
    if (AxiosError.message === 'Request failed with status code 400') {
      btnLoadMore.hide();
      Notify.failure(
        'Ups We are sorry, but you have reached the end of search results. '
      );
      return;
    }
    showError();
  }
}

function renderImageCard(imageMarkup) {
  gallery.insertAdjacentHTML('beforeend', imageMarkup);
}

function showError() {
  return Notify.failure('Ups');
}

function clearContainer() {
  gallery.innerHTML = '';
}

function onGalleryClick(e) {
  e.preventDefault();

  // let lightbox = new SimpleLightbox('.gallery a', {
  //   captions: true,
  //   captionsData: 'alt',
  //   captionDelay: 250,
  
  // });

  let gallery = new SimpleLightbox('.gallery a');
  gallery.on('show.simplelightbox', function () {
    // do something…
  });

//   let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox', function () {
// 	// do something…
// });
  
  // lightbox.refresh()
  // // lightbox.open()
  // lightbox.on('show.simplelightbox', function () {
  //  console.log('egb')
  // });
  console.log(lightbox)

}



// custom infinity scroll
// window.addEventListener(
//   'scroll',
//   debounce(() => {
//     const documentRect = document.documentElement.getBoundingClientRect();
//     console.log('bottom', documentRect.bottom);
//     if (documentRect.bottom < document.documentElement.clientHeight + 150) {
//       console.log('done');
//       fetchAndRenderImages();
//     }
//   }, 500)
// );
