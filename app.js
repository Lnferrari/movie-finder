// variables
const searchForm = document.querySelector('form')
const inputSearch = document.querySelector('input')
const searchBtn = document.getElementById('search')
const moviesContainer = document.querySelector('.movies-container')

// functions
async function getMovieInfo(movieID) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=125534f8&i=${movieID}`)
    const result = await res.json()
    return result
}

async function displayMovie(movie) {
    let movieCard = `
        <div class="col">
            <div id="myCard" class="card h-100 mx-auto" style="max-width: 560px;">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} poster">
                <div id="movieInfo" class="card-body text-light">
                    <h2 class="card-title">${movie.Title}</h2>
                    <div class="movie-data d-flex flex-column">
                        <div class="wrapper-data d-flex mb-2">
                            <div class="date fst-italic fw-bold me-5">${movie.Year}</div>
                            <div class="duration fst-italic fw-bold me-5">${movie.Runtime}</div>
                            <div class="rating fw-bold text-white">${movie.Ratings && movie.Ratings[0].Value}</div>
                        </div>
                        <div class="wrapper-data d-flex flex-column">
                            <div class="awards"><span class=" fst-italic">Awards:</span> ${movie.Awards}</div>
                            <div class="actors"><span class=" fst-italic">Actors:</span> ${movie.Actors}</div>
                            <div class="director"><span class=" fst-italic">Director:</span> ${movie.Director}</div>
                        </div>
                        <p class="card-text mt-4">${movie.Plot}</p>
                    </div>
                </div>
                <div class="card-footer genres">
                    <small class="text-muted d-flex align-content-between flex-wrap">${movie.Genre && movie.Genre.split(',').map(genre => `<span>${genre}</span>`).join('')}</small>
                </div>
            </div>
        </div>`;
    moviesContainer.innerHTML += movieCard;
}

async function searchMovies(title){
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=125534f8&s=${title}`);
        const result = await res.json();
        let moviesArray = result.Search.sort((a,b) => b.Year - a.Year);
        for(let movie of moviesArray){
            displayMovie(await getMovieInfo(movie.imdbID))
        };
    } catch (error) {
        console.log(error);
    }
}


// events
searchForm.addEventListener('submit', (e)=>{
    moviesContainer.innerHTML = ''
    e.preventDefault()
    searchMovies(inputSearch.value)
    inputSearch.value = '';
})
