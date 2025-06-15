import CleanCSS from "clean-css";

/**
 * @typedef {import("@11ty/eleventy").EleventyConfig} EleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");

  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/images/*.svg");
  eleventyConfig.addPassthroughCopy("src/assets/images/*.ico");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/manifest.json");

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

}
