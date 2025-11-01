import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more-btn");

let searchQuery = "";
let page = 1;

hideLoadMoreButton();

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newQuery = event.currentTarget.elements["search-text"].value.trim();

    if (!newQuery) {
        iziToast.warning({
            title: "Ooops!",
            message: "Please enter a search query before searching!",
            position: "topRight",
        });
        return;
    }

    if (newQuery !== searchQuery) {
        searchQuery = newQuery;
        page = 1;
        clearGallery();
    }
    
    showLoader();
    hideLoadMoreButton();



    try {
        const data = await getImagesByQuery(searchQuery, page);

        if (data.hits.length === 0) {
            iziToast.info({
                title: "Ooops!",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            hideLoader();
            return;
        }

        createGallery(data.hits);
        form.reset();

        if (page < Math.ceil(data.totalHits / 15)) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.info({
                title: "Ooops!",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }

    } catch (error) {
        iziToast.error({
            title: "Error!",
            message: "Something went wrong. Please try again!",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(searchQuery, page);
        createGallery(data.hits);

        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const { height: cardHeight } = galleryItem.getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * 4,
                behavior: 'smooth',
            })
        }

        if (page < Math.ceil(data.totalHits / 15)) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.info({
                title: "Ooops!",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
    } catch (error) {
        iziToast.error({
            title: "Error!",
            message: "Something went wrong. Please try again!",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
});