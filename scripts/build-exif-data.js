import {execSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SOURCE_JSON = "photos/photos-source.json";
const OUTPUT_JSON = "src/assets/js/data/photos.json";

const INPUT_IMAGES_DIR = "photos";
const OUTPUT_IMAGES_DIR = "src/assets/images/portfolio";

fs.mkdirSync(OUTPUT_IMAGES_DIR, {recursive: true});

execSync(
  `exiftool -r -ext jpg -ext jpeg -ext png \
   -all= \
   -tagsFromFile @ -Orientation -ICC_Profile \
   -o "${OUTPUT_IMAGES_DIR}" \
   "${INPUT_IMAGES_DIR}"`
);

console.log("✔ Images copied and stripped of EXIF");

const exifRaw = execSync(
  `exiftool -json -r -ext jpg -ext jpeg -ext png \
   -Make -Model -LensMake -LensModel -GPSLatitude -GPSLongitude \
   "${INPUT_IMAGES_DIR}"`
).toString();

const exifList = JSON.parse(exifRaw);

const exifByName = new Map();
for (const item of exifList) {
  const base = path.basename(item.SourceFile);
  const name = base.replace(path.extname(base), "");
  exifByName.set(name, {
    make: item.Make ?? null,
    model: item.Model ?? null,
    lensMake: item.LensMake ?? null,
    lensModel: item.LensModel ?? null,
    lat: item.GPSLatitude ?? null,
    lon: item.GPSLongitude ?? null,
  });
}

const source = JSON.parse(fs.readFileSync(SOURCE_JSON, "utf8"));

const result = source.map((photo) => {
  const exif = exifByName.get(photo.name) || null;
  return {
    ...photo,
    exif,
  };
});

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), "utf8");

console.log(`✔ Wrote ${OUTPUT_JSON}`);