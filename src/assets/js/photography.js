console.log("Photography script loaded.");

const imagesPath = "/assets/images/portfolio";

const images = [
  {
    alt: "HYROX Team in a break.",
    name: "ahoy-captain",
    extension: "jpg",
  },
  {
    alt: "Bilbao in sunshine.",
    name: "sunshine-bilbao",
    extension: "jpg",
  },
  {
    alt: "A cute orange cat.",
    name: "orange-cat",
    extension: "jpg",
  },
  {
    alt: "A gradient background for wallpaper.",
    name: "wp-gradient-2",
    extension: "jpg",
  },
  {
    alt: "A winter walk in Budapest.",
    name: "bp-winter-1",
    extension: "jpg",
  },
  {
    alt: "Spring is coming.",
    name: "spring-is-coming",
    extension: "jpg",
  },
  {
    alt: "A rainbow on the concrete.",
    name: "concrete-rainbow",
    extension: "jpg",
  },
  {
    alt: "On the Margaret Bridge in Budapest.",
    name: "margaret-bridge-1",
    extension: "jpg",
  }
];

const imageList = document.querySelector("#photography-gallery");

for (let i = 0; i < images.length; i++) {
  const image = images[i];
  const imageElement = document.createElement("img");
  imageElement.src = `${imagesPath}/${image.name}-thumb.${image.extension}`;
  imageElement.alt = image.alt;

  console.log(imageElement);

  const linkElement = document.createElement("li");
  linkElement.appendChild(imageElement);

  console.log(linkElement);

  imageList.appendChild(linkElement);
}
