

export function makeCountryMarkup (chooseCountry) {
    return chooseCountry
    .map(({population, name: {official}, flags:{svg}, capital, languages}) => {
       
      return `
      
      <div class="overlay">
<img class='flag'
alt="${official}"
src="${svg}"
width="50"
height="30"
/>
<h2>${official}</h2>
</div>
<p> <span class='bold-text'>Capital: </span>${capital}</p>
<p><span class='bold-text'>Poppulation: </span>${population}</p>
<p><span class='bold-text'>Languages: </span>${languages[Object.keys(languages)[0]]}</p>
          `;    
        })
    .join("");
}
