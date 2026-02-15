import {createImageGallery} from "./lib.js";
import {loadPhotosWithExif, initialPhotos} from "./data/photos.js";
import illustrations from "./data/illustrations.js";



createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)
createImageGallery(document.querySelector("#photography-gallery"), await loadPhotosWithExif());


