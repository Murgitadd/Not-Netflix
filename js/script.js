axios.get('https://api.tvmaze.com/shows')
      .then(response => {
        const carouselInner = document.querySelector('.carousel-inner');
        const maxItems = 5;
        let carouselHTML = '';
        for (let i = 0; i < Math.min(maxItems, response.data.length); i++) {
          const data = response.data[i];
          carouselHTML += `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
              <img src="${data.image.original}" class="d-block mx-auto banners" alt="${data.name}">
            </div>
          `;
        }
        carouselInner.innerHTML = carouselHTML;
      })

  