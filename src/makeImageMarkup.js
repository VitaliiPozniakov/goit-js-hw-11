

export function makeImageMarkup (chooseImage) {
    return chooseImage.hits
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
       
      return `
      
      // <div class="photo-card">
      // <a class="gallery__item" href="${largeImageURL}">
      //   <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}"/>/>
      // </a>
      // </div>
   
          `;    
        })
    .join("");
}


// <a class="gallery__item" href="${largeImageURL}">
// <img src="${webformatURL}" alt="${tags}" loading="lazy" />

// <div class="info">
//   <p class="info-item">
//     <b>Likes: ${likes}</b>
//   </p>
//   <p class="info-item">
//     <b>Views: ${views}</b>
//   </p>
//   <p class="info-item">
//     <b>Comments: ${comments}</b>
//   </p>
//   <p class="info-item">
//     <b>Downloads: ${downloads}</b>
//   </p>

// </div>
// </a> 


// {/* <div class="container">
//   <article class="post">
//   <a class="gallery__item" href="${largeImageURL}">
//         <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}"/>/>
//       </a>
//   </article>
// </div> */}