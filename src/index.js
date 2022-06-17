// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
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
  gallery: document.querySelector(`.gallery`),
  btnLoadMore: document.querySelector(`[data-action="load-more"]`),
};

btnLoadMore.show();

// const lightbox = new SimpleLightbox('.gallery a');
// lightbox.refresh();
// console.log(SimpleLightbox);
// console.log(lightbox);

refs.form.addEventListener('submit', onFormSubmit);
// refs.btnLoadMore.addEventListener(`click`, onBtnLoadMoreClick)
btnLoadMore.refs.button.addEventListener(`click`, fetchAndRenderImages);

async function onFormSubmit(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  btnLoadMore.show();
  imagesApiService.resetPage();
  // const promiseImagesArr = imagesApiService.fetchImages();
  clearContainer();

  const images = await imagesApiService.fetchImages();

if (images.hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      btnLoadMore.hide();
      refs.gallery.innerHTML = '';
      return;
  // promiseImagesArr.then(r => {
  //   if (r.hits.length === 0) {
  //     Notify.info(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //     refs.gallery.innerHTML = '';
  //     return;
    }
  // });

  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
 
  // const promiseImagesArr = imagesApiService.fetchImages();
  // console.log(promiseImagesArr);
  try {
    btnLoadMore.disable();
    const images = await imagesApiService.fetchImages();
    console.log(images)
    const imageMarkup = await makeImageMarkup(images)
    // console.log(imageMarkup)
    btnLoadMore.enable();
    const renderedImageCard = await renderImageCard(imageMarkup)

  } catch (error) {
    showError(error);
  }
}

  // promiseImagesArr
  //   .then(chooseImage => {

      // console.log(chooseImage.totalHits);
      // console.log(chooseImage.hits.length);
      // imagesContainer = document.querySelectorAll(`.gallery__item`)
      // console.log(imagesContainer.length)
//       if (chooseImage.totalHits === imagesContainer.length){
// Notify.failure('Ups We are sorry, but you have reached the end of search results. ');
// return 
      // }
//       return makeImageMarkup(chooseImage);
//     })
//     .then(renderImageCard)
//     .then(imageMarkup => {
//       btnLoadMore.enable();
//       return renderImageCard(imageMarkup);
//     })
//     .catch(showError);
// }

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
