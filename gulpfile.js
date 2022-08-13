const { src, dest } = require("gulp");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins();
const sizes = [
  [16, 16],
  [32, 32],
  [48, 48],
  [57, 57],
  [76, 76],
  [120, 120],
  [128, 128],
  [152, 152],
  [167, 167],
  [180, 180],
  [192, 192],
  [512, 512],
];

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

exports.item = item;
