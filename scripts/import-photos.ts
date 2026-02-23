import {execSync} from "node:child_process";
import * as fs from 'node:fs/promises';
import path from "node:path";

const INPUT_IMAGES_DIR = "source-photos";
const OUTPUT_IMAGES_DIR = "src/assets/images/portfolio";
const OUTPUT_JSON = "src/assets/js/data/photos.json";

async function fileExists(p: string) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}

await fs.mkdir(OUTPUT_IMAGES_DIR, {recursive: true});

execSync(
    `exiftool -r -ext jpg -ext jpeg -ext png \
   -all= \
   -tagsFromFile @ -Orientation -ICC_Profile \
   -o "${OUTPUT_IMAGES_DIR}" \
   "${INPUT_IMAGES_DIR}"`
);

execSync(`jpegoptim --strip-all --max=75 "${OUTPUT_IMAGES_DIR}"/*.jpg`, {
    stdio: "inherit",
});

const exifRaw = execSync(
    `exiftool -json -r -ext jpg -ext jpeg -ext png \
   -Make -Model -LensMake -LensModel -GPSLatitude -GPSLongitude \
   "${OUTPUT_IMAGES_DIR}"`
).toString();

const exifList: any[] = JSON.parse(exifRaw);

const exifByName = new Map<
    string,
    {
        make: string | null;
        model: string | null;
        lensMake: string | null;
        lensModel: string | null;
        lat: string | null;
        lon: string | null;
    }
>();

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

let existing: any[] = [];
if (await fileExists(OUTPUT_JSON)) {
    existing = JSON.parse(await fs.readFile(OUTPUT_JSON, "utf8"));
}

const existingKeys = new Set(
    existing.map((p) => `${p.name}.${p.extension}`)
);

const files = await fs.readdir(OUTPUT_IMAGES_DIR);

const newEntries: any[] = [];

for (const file of files) {
    const ext = path.extname(file).replace(".", "").toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(ext)) continue;

    const base = path.basename(file, path.extname(file));
    const key = `${base}.${ext}`;

    if (existingKeys.has(key)) {
        continue;
    }

    const exif = exifByName.get(base) ?? null;

    newEntries.push({
        alt: "CHANGE THIS",
        name: base,
        description: "CHANGE THIS",
        extension: ext,
        exif,
    });
}

const result = [...existing, ...newEntries];

await fs.writeFile(OUTPUT_JSON, JSON.stringify(result, null, 2), "utf8");

console.log(`Added ${newEntries.length} new photos to ${OUTPUT_JSON}`);