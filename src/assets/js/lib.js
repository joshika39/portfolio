const imagesPath = "/assets/images/portfolio";

export function constructFullPath(image) {
  return {
    ...image,
    fullPath: `${imagesPath}/${image.name}.${image.extension}`,
    thumbnail: `${imagesPath}/${image.name}-thumb.${image.extension}`,
  }
}