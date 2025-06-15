import CleanCSS from "clean-css";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/css");
}
