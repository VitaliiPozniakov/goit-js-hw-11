import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './ImagesApiServise';
import { makeImageMarkup } from './makeImageMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import BtnLoadMore from './btn-load-more';
// console.log(SimpleLightbox);

const imagesApiService = new ImagesApiService();
const btnLoadMore = new BtnLoadMore({
  selector: `[data-action="load-more"]`,
  hidden: true
})

console.log(btnLoadMore)





const refs = {
  form: document.querySelector(`.js-search-form`),
  gallery: document.querySelector(`.gallery`),
  btnLoadMore: document.querySelector(`[data-action="load-more"]`)
};

// console.log(refs.btnLoadMore)

refs.form.addEventListener('submit', onFormSubmit);
// refs.btnLoadMore.addEventListener(`click`, onBtnLoadMoreClick)
btnLoadMore.refs.button.addEventListener(`click`, onBtnLoadMoreClick)



function onFormSubmit(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
    // console.log(inputSymbols)

    btnLoadMore.show()
    btnLoadMore.disable()
imagesApiService.resetPage()

  const promiseImagesArr = imagesApiService.fetchImages();

  //   console.log(promiseImagesArr)
  

  promiseImagesArr
  .then(r => {
    // console.log(r)
    // console.log(r.hits.length)
    if (r.hits.length === 0) {
      Notify.info('Sorry, there are no images matching your search query. Please try again.');
      refs.gallery.innerHTML = '';
      return;
    }})

    promiseImagesArr.then(makeImageMarkup).then(
      imageMarkup => {
        clearContainer()
        renderImageCard(imageMarkup)
        console.log(imageMarkup)
      
        btnLoadMore.enable()
      }).catch(showError)

    
    // then(renderImageCard).catch(showError)
    
    // clearContainer()
    //     btnLoadMore.enable()
    // .then(
    //   imageMarkup => {
    //     renderImageCard(imageMarkup)
    //     // console.log(imageMarkup)
    //     clearContainer()
    //     btnLoadMore.enable()
    //   })

 
 
}


function onBtnLoadMoreClick (e) {
  const promiseImagesArr = imagesApiService.fetchImages();
  promiseImagesArr.then(makeImageMarkup).then(renderImageCard).catch(showError)
}


function renderImageCard(imageMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', imageMarkup)  ;
}

function showError(error) {
  //   console.log(`помилка ${error}`);
  return Notify.failure(
    'Ups'
  );
}

function clearContainer () {
  refs.gallery.innerHTML = ''
}

const lightbox = new SimpleLightbox('.gallery a', {});
lightbox.refresh();

// console.log(lightbox);

