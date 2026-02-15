import {constructFullPath} from "../lib.js";

const images = [
  {
    alt: "A gradient background for wallpaper.",
    name: "wp-gradient-2",
    description: "My wallpaper for my MacBook",
    extension: "jpg",
  },
  {
    alt: "Another gradient background for wallpaper.",
    name: "wp-gradient-3-light",
    description: "Another gradient I use for wallpaper.",
    extension: "jpg",
  },
  {
    alt: "A darl gradient background for wallpaper.",
    name: "wp-gradient-3-dark",
    description: "My dark wallpaper for my MacBook",
    extension: "jpg",
  }
]

export default images.map(constructFullPath);