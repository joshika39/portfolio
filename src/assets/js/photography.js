import {createImageGallery} from "./lib.js";
import {loadPhotosWithExif} from "./data/photos.js";
import illustrations from "./data/illustrations.js";

createImageGallery(document.querySelector("#photography-gallery"), await loadPhotosWithExif());

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)
