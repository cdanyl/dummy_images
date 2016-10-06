/**
 * Created by dchader on 17/10/2014.
 */

var OUTPUT_FOLDER = 'd:\\tmp2\\',
    KEY = 'ded8c241aab5a812b62b095637a06b56', // Need a personal API key http://docs.themoviedb.apiary.io/
    tmdb = require('moviedb')(KEY),
    wget = require('wget'),
    fs = require('fs'),
    promise = require('promise'),
    BASE_URI = 'http://image.tmdb.org/t/p/w500/';

//     url_img = 'http://image.tmdb.org/t/p/w500/osVUxR3HdccQG8yBKX3VWp8nVFv.jpg';
//     https://api.themoviedb.org/3/movie/26/images?api_key=ded8c241aab5a812b62b095637a06b56

var params = {};
var fn = function (err, res) {
    console.log('fn');

    // All results from server
    var resData = {
        'results': res.results,
        'nbPages': res.total_pages,
        'nbResults': res.total_results
    };

    // All movies where key=movie title & value=jpg path
    var movies = {};
    resData.results.forEach(function (movie) {
        movies[movie.title] = {
            'jpg': movie.backdrop_path,
            'year': movie.release_date,
            'id': movie.id
        };
    });

    treatImages(movies);

    resolve(resData);
};



function test() {
    var prom = getAllImages();
    prom.then(function (results) {
        console.log('nbPages: ' + results['nbPages']);
        console.log('nbResults: ' + results['nbResults']);

        var currentPage = 2;
        for (var i = 2; i <= results['nbPages']; i++) {
            //params = {page: i};
            new promise(function (resolve, reject) {
                tmdb.miscChangedMovies({page: currentPage}, function (err, res) {
                    console.log('\nmiscUpcomingMovies ' + (currentPage++));

                    // All results from server
                    var resData = {
                        'results': res.results,
                        'nbPages': res.total_pages,
                        'nbResults': res.total_results
                    };

                    // All movies where key=movie title & value=jpg path
                    var movies = {};
                    resData.results.forEach(function (movie) {
                        movies[movie.title] = {
                            'jpg': movie.backdrop_path,
                            'year': movie.release_date,
                            'id': movie.id
                        };
                        console.log("DANYL: " + movie.title);
                    });


                    treatImages(movies);

                    resolve(resData);
                });
            });
            //getAllImages(params);
        }
    }
        , function (error) {
        console.error('uh oh: ', error);
    });
}

function getAllImages() {
    console.log('getAllImages');

    return new promise(function(resolve, reject) {
        tmdb.miscChangedMovies(params, function (err, res) {
            console.log('miscUpcomingMovies');

            // All results from server
            var resData = {
                'results': res.results,
                'nbPages': res.total_pages,
                'nbResults': res.total_results
            };

            // All movies where key=movie title & value=jpg path
            var movies = {};
            resData.results.forEach(function (movie) {
                movies[movie.title] = {
                    'jpg': movie.backdrop_path,
                    'year': movie.release_date,
                    'id': movie.id
                };
            });

            treatImages(movies);

            resolve(resData);
        });
    });
}

//var params = {page : 5};
//tmdb.miscUpcomingMovies(params, fn);

function treatImages(movies) {
    console.log('treatImages');

    // Get the titles
    var movieTitles = Object.keys(movies);

    // for each title display it and the corresponding jpg path
    movieTitles.forEach(function (movieTitle) {
        //console.log(movieTitle);
        //console.log("\t" + movies[movieTitle]['id']); // jpg path
        //console.log("\t" + movies[movieTitle]['year']); // release_date
        //console.log("\t" + movies[movieTitle]['jpg']); // release_date
        var img = movies[movieTitle]['jpg'];
        if (img != null) {
            getImages(movieTitle, img );
        }
    });
}

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}

function getImages(title, img) {

    var filename = (title.split(' ').join('')).toLowerCase() + '.jpg';

    var download = wget.download(BASE_URI + img, OUTPUT_FOLDER + filename);

    download.on('error', function (err) {
        console.log(err);
    });

    download.on('end', function (output) {
        console.log(output);
    });
}

function main() {
    console.log('mkdirSync');
    mkdirSync(OUTPUT_FOLDER);

    //getAllImages({});
    test();
}

main();