import {constructFullPath} from "../lib.js";

const photos = [
  {
    alt: "HYROX Team in a break.",
    name: "ahoy-captain",
    description: "HYROX Team in a break.",
    extension: "jpg",
  },
  {
    alt: "Sun shining behind a HYROX wallball.",
    name: "wallball-in-the-sun",
    description: "SUNNY wallball",
    extension: "jpg",
  },
  {
    alt: "Bilbao in sunshine.",
    name: "sunshine-bilbao",
    description: "A sunny roundabout in Bilbao.",
    extension: "jpg",
  },
  {
    alt: "A cute orange cat.",
    name: "orange-cat",
    description: "A cute orange cat.",
    extension: "jpg",
  },
  {
    alt: "A winter walk in Budapest.",
    name: "bp-winter-1",
    description: "A wintery walk in Budapest.",
    extension: "jpg",
  },
  {
    alt: "Spring is coming.",
    name: "spring-is-coming",
    description: "Spring is coming.",
    extension: "jpg",
  },
  {
    alt: "A rainbow on the concrete.",
    name: "concrete-rainbow",
    description: "A rainbow on the concrete.",
    extension: "jpg",
  },
  {
    alt: "On the Margaret Bridge in Budapest.",
    name: "margaret-bridge-1",
    description: "Most 'Golden-est' hour on the Margaret Bridge in Budapest.",
    extension: "jpg",
  },
  {
    alt: "Ducks in Danube near Szentendre.",
    name: "ducks-danube",
    description: "ducks.",
    extension: "jpg",
  },
];

async function extractExifData(image) {
  const path = image.fullPath;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.warn(`Failed to fetch image at ${path}: ${response.statusText}`);
      return image;
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength === 0) {
      console.warn(`Image at ${path} is empty.`);
      return image;
    }

    const slice = buffer.slice(0, 65635);

    const parser = window.ExifParser.create(slice);
    const result = parser.parse();
    return {
      ...image,
      exif: result.tags || undefined,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return image;
  }
}

export function loadPhotosWithExif(callback) {
  Promise.all(
    photos.map(constructFullPath).map(extractExifData)
  ).then(loadedPhotos => {
    if (callback) {
      callback(loadedPhotos);
    }
  });
  return photos.map(constructFullPath);
}
