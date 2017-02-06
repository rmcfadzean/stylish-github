var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
      serveStatic: [{
        route: '/custom',
        dir: './css'
      }],
      proxy: {
        target: "https://github.com",
        proxyRes: [
          function (proxyRes, req, res) {
            delete proxyRes.headers['content-security-policy'];
          }
        ]
      },
      open: false,
      cors: true,
      snippetOptions: {
        rule: {
          match: /<\/body>/i,
          fn: function (snippet, match) {
            return '<link rel="stylesheet" type="text/css" href="/custom/style.css"/>' + snippet + match;
          }
        }
      }
    });

    gulp.watch("scss/**/*.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/style.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("css"))
      .pipe(browserSync.reload({ stream: true}));
});

gulp.task('default', ['serve']);