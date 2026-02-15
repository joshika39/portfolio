import {createImageGallery} from "./lib.js";
import {loadPhotosWithExif} from "./data/photos.js";
import illustrations from "./data/illustrations.js";


function photosLoadedCallback(photos) {
  const galleryElement = document.querySelector("#photography-gallery");
  galleryElement.innerHTML = "";
  createImageGallery(document.querySelector("#photography-gallery"), photos);
}

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)
createImageGallery(document.querySelector("#photography-gallery"), loadPhotosWithExif(photosLoadedCallback));

