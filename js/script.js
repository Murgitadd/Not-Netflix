axios.get('https://api.tvmaze.com/shows')
  .then(response => {
    const carouselInner = document.querySelector('.carousel-inner');
    const maxItems = 5;
    let carouselHTML = '';

    response.data.slice(0, maxItems).forEach((show, index) => {
      if (show.image && show.image.original) {
        const imageUrl = show.image.original;

        carouselHTML += `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="blur-background" style="background-image: url(${imageUrl})"></div>
            <img src="${imageUrl}" class="d-block mx-auto banners" alt="${show.name}">
            <div class="carousel-caption border border-light big-cap d-none d-md-block">
              <h5>${show.name}</h5>
              ${show.summary}
            </div>
          </div>
        `;
      } else {
        console.error('Image URL not found in show:', show);
      }
    });

    carouselInner.innerHTML = carouselHTML;
  })
  .catch(error => {
    console.error('Error fetching main carousel images:', error);
  });



  axios.get('https://api.tvmaze.com/shows')
  .then(miniResponse => {
    const miniCarousel = document.querySelector('.mini-inner-carousel');
    const maxItems = 5;
    let carouselHTML = '';
    for (let i = 5; i < Math.min(maxItems + 10, miniResponse.data.length); i++) {
      const data = miniResponse.data[i];
      carouselHTML += `
        <div class="carousel-item mini-item ${i === 5 ? 'active' : ''}">
          <img src="${data.image.original}" class="d-block mx-auto mini-banners" alt="${data.name}">
          
        </div>
        
      `;
    }

    miniCarousel.innerHTML = carouselHTML;
  });


  axios.get('https://api.tvmaze.com/shows')
  .then(response => {
    const cardContainer = document.querySelector('.card-container');
    const maxItems = 60;
    let cardHTML = '';

    response.data.slice(0, maxItems).forEach(show => {
      if (show.image && show.image.original) {
        const imageUrl = show.image.original;


        cardHTML += `
        <div class="col">
    <div class="card text-bg-dark">
        <img src="${imageUrl}" class="card-img" alt="${show.name}">
        <div class="card-img-overlay position-absolute d-flex flex-column">
            <div class="show-sum position-relative flex-grow-1">
                <p class="text-center">${show.summary}</p>
            </div>
            <div class="pre-details d-flex justify-content-between position-relative cdetail">
                <p>${show.premiered ? new Date(show.premiered).getFullYear() : 'N/A'}</p>
                <span class="badge nopad text-bg-warning">${show.rating.average}</span>
            </div>
            <!-- Add a link to details.html with the show ID as a query parameter -->
            <a href="details.html?id=${show.id}" class="btn btn-link text-white fs-5">${show.name}</a>
        </div>
    </div>
</div>

      
        `;
      }});


      document.addEventListener('DOMContentLoaded', () => {

        const detailButtons = document.querySelectorAll('.btn-details');
      

        detailButtons.forEach((button) => {

          button.addEventListener('click', () => {
            const showId = button.getAttribute('data-id');
      
            window.location.href = `details.html?id=${showId}`;
          });
        });
      });
      

    cardContainer.innerHTML = cardHTML;
  })
