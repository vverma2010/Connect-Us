const gulp=require('gulp');
const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
// const rev=require('gulp-rev');
const uglify=require('gulp-uglify-es').default;
const imagemin=require('gulp-imagemin');
const del=require('del');
const revAll = require('gulp-rev-all');

// gulp.task('css',function(done)
// {
//     console.log("minifying css....");
//     gulp.src("./assets/sass/**/*.scss")
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest("./assets/css"));
//     gulp.src("./assets/**/*.css")
//     .pipe(revAll.revision())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(revAll.manifestFile({
//         cwd:"public",
//         merge:true
//     }))
//     .pipe(gulp.dest("./public/assets"));
//     done();
// });

// gulp.task('js',function(done)
// {
//     console.log("minifying js......");
//     gulp.src("./assets/**/*.js")
//     .pipe(uglify())
//     .pipe(revAll.revision())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(revAll.manifestFile({
//         cwd:"public",
//         merge:true
//     }))
//     .pipe(gulp.dest("./public/assets"));
//     done();
// });

// gulp.task('images',function(done)
// {
//     console.log("compressing images......");
//     gulp.src("./assets/**/*.+(png||jpg||svg||jpeg||ico)")
//     .pipe(imagemin())
//     .pipe(revAll.revision())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(revAll.manifestFile({
//         cwd:"public",
//         merge:true
//     })).pipe(gulp.dest("./public/assets"));
//     done();
// });

// //empty the /public/assets/ directory
// gulp.task('clean:assets',function(done)
// {
//     del.sync("./public/assets");
//     done();
// });

// gulp.task('build',gulp.series('clean:assets','css','js'),function(done)
// {
//     console.log('Building assets....');
//     done();
// })

//empty the /public/assets/ directory
gulp.task('clean:assets',function(done)
{
    del.sync("./public/assets");
    done();
});
gulp.task("default", function () {
    return gulp
      .src(["./assets/**"])
      .pipe(gulp.dest("./public/assets"))
      .pipe(revAll.revision())
      .pipe(gulp.dest("./public/assets"))
      .pipe(revAll.manifestFile())
      .pipe(gulp.dest("./public/assets"));
  });


