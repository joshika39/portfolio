import {createImageGallery} from "./lib.js";
import {loadPhotosWithExif, initialPhotos} from "./data/photos.js";
import illustrations from "./data/illustrations.js";


async function loadExif() {
  const photos = await loadPhotosWithExif();
  const galleryElement = document.querySelector("#photography-gallery");
  galleryElement.innerHTML = "";
  createImageGallery(document.querySelector("#photography-gallery"), photos);
}

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)
createImageGallery(document.querySelector("#photography-gallery"), initialPhotos);
await loadExif();


