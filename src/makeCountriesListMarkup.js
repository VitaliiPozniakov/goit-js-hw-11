
export function makeCountriesListMarkup (countriesArr) {
    return countriesArr
    .map((country) => {
       
      return `

      <li>
<img class='flag'
alt="${country.name.official}"
src="${country.flags.svg}"
width="50"
height="30"
/>
<h2 class='country-name'>${country.name.official}</h2>
</li>

          `;    
        })
    .join("");
}

// .then(
        
//     (countriesArr) => {
//     return countriesArr
//     .map((country) => {
       
//       return `

//       <li>
// <img class='flag'
// alt="${country.name.official}"
// src="${country.flags.svg}"
// width="50"
// height="30"
// />
// <h2>${country.name.official}</h2>
// </li>

//           `;    
//         })
//     .join("");
// })
