import {createImageGallery, constructFullPath} from "./lib.js";
import illustrations from "./data/illustrations.js";
import photosData from "./data/photos.json" with { type: "json" };

const photos = photosData.map(constructFullPath);

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)
createImageGallery(document.querySelector("#photography-gallery"), photos);


