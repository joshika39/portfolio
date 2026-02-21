import {constructFullPath} from "../lib.js";

const images = [
  {
    alt: "my macbook wallpaper.",
    name: "wp-gradient",
    description: "my macbook wallpaper.",
    extension: "jpg",
  },
]

export default images.map(constructFullPath);