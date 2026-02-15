import {createImageGallery} from "./lib.js";
import {loadPhotosWithExif} from "./photos.js";
import illustrations from "./illustrations.js";

createImageGallery(document.querySelector("#photography-gallery"), await loadPhotosWithExif());

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)
