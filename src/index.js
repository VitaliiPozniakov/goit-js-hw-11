import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './imagesApiServise';
import { makeImageMarkup } from './makeImageMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import BtnLoadMore from './btn-load-more';

const imagesApiService = new ImagesApiService();
const btnLoadMore = new BtnLoadMore({
  selector: `[data-action="load-more"]`,
  hidden: true,
});

const refs = {
  form: document.querySelector(`.js-search-form`),
  gallery: document.querySelector(`.container`),
  btnLoadMore: document.querySelector(`[data-action="load-more"]`),

};


// const lightbox = new SimpleLightbox('.gallery a', {});
// lightbox.refresh();
// console.log(SimpleLightbox);
// console.log(lightbox);


// import InfiniteScroll from 'infinite-scroll';

// let elem = document.querySelector('.container');
// let infScroll = new InfiniteScroll( elem, {
//   // options
//   path: '.pagination__next',
//   append: '.post',
//   history: false,
// });



refs.form.addEventListener('submit', onFormSubmit);
// refs.btnLoadMore.addEventListener(`click`, onBtnLoadMoreClick)
btnLoadMore.refs.button.addEventListener(`click`, fetchAndRenderImages);

function onFormSubmit(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  btnLoadMore.show();
  imagesApiService.resetPage();
  const promiseImagesArr = imagesApiService.fetchImages();
  clearContainer();

  promiseImagesArr.then(r => {
    if (r.hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.gallery.innerHTML = '';
      return;
    }
  });

  fetchAndRenderImages();
}


function fetchAndRenderImages() {
  btnLoadMore.disable();
  const promiseImagesArr = imagesApiService.fetchImages();
  promiseImagesArr
    .then(makeImageMarkup)
    .then(renderImageCard)
    .then(imageMarkup => {
      renderImageCard(imageMarkup);
    
      btnLoadMore.enable();
    })
    .catch(showError);
}

function renderImageCard(imageMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', imageMarkup);
}

function showError(error) {
  //   console.log(`помилка ${error}`);
  return Notify.failure('Ups');
}

function clearContainer() {
  refs.gallery.innerHTML = '';
}

