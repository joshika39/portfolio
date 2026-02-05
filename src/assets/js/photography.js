console.log("Photography script loaded.");

const imagesPath = "/assets/images/portfolio/";

const images = [
  {
    alt: "HYROX Team in a break.",
    name: "ahoy-captain.jpg",
  },
  {
    alt: "Bilbao in sunshine.",
    name: "sunshine-bilbao.jpg",
  },
  {
    alt: "A cute orange cat.",
    name: "orange-cat.jpg",
  },
  {
    alt: "A gradient background for wallpaper.",
    name: "wp-gradient-2.jpg",
  },
  {
    alt: "A winter walk in Budapest.",
    name: "bp-winter-1.jpg",
  },
  {
    alt: "Spring is coming.",
    name: "spring-is-coming.jpg",
  },
  {
    alt: "A rainbow on the concrete.",
    name: "concrete-rainbow.jpg",
  },
  {
    alt: "On the Margaret Bridge in Budapest.",
    name: "margaret-bridge-1.jpg",
  }
];

const imageList = document.querySelector("#photography-gallery");
console.log(imageList);

for (let i = 0; i < images.length; i++) {
  const imageElement = document.createElement("img");
  imageElement.src = imagesPath + images[i].name;
  imageElement.alt = images[i].alt;

  console.log(imageElement);

  const linkElement = document.createElement("li");
  linkElement.appendChild(imageElement);

  console.log(linkElement);

  imageList.appendChild(linkElement);
}
