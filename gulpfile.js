const { src, dest } = require("gulp");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins();
const pkg = require("./package.json");
const conf = pkg["gulp-config"];
const sizes = conf.sizes;
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");

function item(done) {
  for (let size of sizes) {
    let width = size[0];
    let height = size[1];
    src("./item.png")
      .pipe(
        $.imageResize({
          width,
          height,
          crop: true,
          upscale: false,
        })
      )
      .pipe($.imagemin())
      .pipe($.rename(`item-${width}×${height}.png`))
      .pipe(dest("./dist/images/item"));
  }
  done();
}

function style() {
  return src("./src/sass/main.scss")
    .pipe($.sourcemaps.init())
    .pipe(sass())
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe($.sourcemaps.write("."))
    .pipe(dest("./dist/css"));
}

exports.item = item;
exports.style = style;
