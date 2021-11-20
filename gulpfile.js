import gulp from "gulp";
import imagemin from "gulp-imagemin";
import GulpCleanCss from "gulp-clean-css";
import minify from "gulp-minify";
import htmlmin from "gulp-htmlmin";
import removeHTMLComments from "gulp-remove-html-comments";

function minifyImages() {
  return gulp
    .src("images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"));
}

function minifyCSS() {
  return gulp
    .src("assets/css/**/*")
    .pipe(GulpCleanCss())
    .pipe(gulp.dest("build/assets/css"));
}

function minifyJS() {
  return gulp
    .src("assets/js/**/*")
    .pipe(
      minify({
        noSource: true,
        ext: {
          min: ".js",
        },
      })
    )
    .pipe(gulp.dest("build/assets/js"));
}

function minifyHTML() {
  return gulp
    .src("index.html")
    .pipe(removeHTMLComments())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

function copyFonts() {
  return gulp.src("assets/fonts/**/*").pipe(gulp.dest("build/assets/fonts"));
}

export default gulp.parallel(
  minifyImages,
  minifyCSS,
  minifyJS,
  minifyHTML,
  copyFonts
);
