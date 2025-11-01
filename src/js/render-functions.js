import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const extraBtn = document.querySelector('.load-more-btn');

export const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

export function createGallery(arr) {
    const createMarkup = arr
        .map(
            image => `
            <li class="gallery-item">
                <a a class= "gallery-link" href = "${image.largeImageURL}" >
                     <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" width="360" />
                </a>
                <div class="img-info">
                    <div class="img-info-box">
                        <h2 class="img-info-title">Likes</h2>
                        <p class="img-info-value">${image.likes}</p>
                    </div>
                    <div class="img-info-box">
                        <h2 class="img-info-title">Views</h2>
                        <p class="img-info-value">${image.views}</p>
                    </div>
                    <div class="img-info-box">
                        <h2 class="img-info-title">Comments</h2>
                        <p class="img-info-value">${image.comments}</p>
                    </div>
                    <div class="img-info-box">
                        <h2 class="img-info-title">Downloads</h2>
                        <p class="img-info-value">${image.downloads}</p>
                    </div>
                </div>
            </li>`
    ).join("");
    
    galleryContainer.insertAdjacentHTML("beforeend", createMarkup);
    lightbox.refresh();
};

export function clearGallery() {
    galleryContainer.innerHTML = "";
}

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function showLoadMoreButton() {
    extraBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
    extraBtn.classList.add("hidden");
}
