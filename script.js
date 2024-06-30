const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
let searchTerm = null;
const apiKey = 'sDybUboJy5Fwvw5HB5H9MoJVlQL2FNLuqDZ06eNbWKqh0MqfChYo40KN';
const perPage = 15;
let currentPage = 1;

const generateHtml = (images)=>{
   imageWrapper.innerHTML += images.map(img => `
         <li class="card">
                    <img src="${img.src.large2x}" alt="">
                    <div class="details">
                        <div class="photographer">
                            <i class="fa-solid fa-camera"></i>
                            <span>${img.photographer}</span>
                        </div>
                        <button><i class="fa fa-download"></i></button>
                    </div>
            </li>
        `);
        loadMoreBtn.textContent = 'Load More';
    loadMoreBtn.classList.remove('disabled')
       
}

const getImages = (apiURL) => {
    fetch(apiURL, {
        headers:{Authorization : apiKey}
    })
    .then(response => response.json())
    .then(data => generateHtml(data.photos));
    
  
}

let loadMoreImages = () => {
    currentPage++;
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.classList.add('disabled')
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    getImages(apiURL);
    
}

const searchInputImages = (e) => {
    if(e.target.value === '') return searchTerm = null
    if(e.key === 'Enter'){
        currentPage = 1;
        searchTerm = e.target.value;
       imageWrapper.innerHTML = '';
       getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
       searchInput.value = ''
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMoreBtn.addEventListener("click", loadMoreImages)
searchInput.addEventListener("keyup", searchInputImages)

