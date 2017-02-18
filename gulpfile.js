var gulp        = require('gulp');
var gutil       = require('gulp-util');
var gulpIf      = require('gulp-if');
var git         = require('gulp-git');
var bump        = require('gulp-bump');
var fs          = require('fs');
var runSequence = require('run-sequence');
var argv        = require('minimist')(process.argv.slice(2));
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var cleanCSS    = require('gulp-clean-css');

var config = {
  environment: argv.env || 'development',
  production() {
    return this.environment === 'production';
  },
  development() {
    return this.environment === 'development';
  },
  currentVersion() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  }
};


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
      .pipe(
        gulpIf(
          config.production(),
          cleanCSS()
        )
      )
      .pipe(
        gulpIf(
          config.development(),
          sourcemaps.write()
        )
      )
      .pipe(gulp.dest("css"))
      .pipe(browserSync.reload({ stream: true}));
});

gulp.task('bump', function () {
  var bumpType = argv.bump || 'patch';
  return gulp.src('./package.json')
    .pipe(bump({type: bumpType}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('git:commit', function () {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Bumped version number'));
});

gulp.task('git:push', function (cb) {
  git.push('origin', 'master', cb);
});

gulp.task('git:tag', function (cb) {
  git.tag(config.currentVersion(), 'Created Tag for version: ' + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {args: '--tags'}, cb);
  });
});

gulp.task('git:release', function(done) {
  gulp.src('./dist/some-file.exe')
    .pipe(release({
      token: process.env.GITHUB_TOKEN,
      manifest: require('./package.json')
    }));
});

gulp.task('release', function (callback) {
  runSequence(
    'bump',
    'git:commit',
    'git:push',
    'git:tag',
    'git:release',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});

gulp.task('default', ['serve']);
