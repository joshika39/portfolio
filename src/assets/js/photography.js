import {createImageGallery, constructFullPath} from "./lib.js";
import photosData from "./data/photos.json" with {type: "json"};

const photos = photosData.map(constructFullPath);

createImageGallery(document.querySelector("#illustrations-gallery"), photos.filter((p) => p.type === "illustration"));
createImageGallery(document.querySelector("#photography-gallery"), photos.filter((p) => p.type === "photo"));


