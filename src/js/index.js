// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line



import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(SimpleLightbox);

const galleryRef = document.querySelector(`.gallery`);

galleryRef.insertAdjacentHTML(`afterbegin`, makeGalleryMarkup(galleryItems));

function makeGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" title="${description}"/>/>
        </a>
        </div>
          `;
    })
    .join("");
}

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });