/**
 * Created by dchader on 15/10/2014.
 */

var wget = require('wget');
var fs = require('fs');
var path = require('path');

var IMG_WIDTH = 352;
var IMG_HEIGHT = 198;
var IMG_NBR = 1;
var src = '';
var OUTPUT_FOLDER = 'd:\\tmp\\';

function main() {
    /* Process arguments */
    processArguments(process.argv.splice(2));

    src = 'http://lorempixel.com/' + IMG_WIDTH + '/' + IMG_HEIGHT + '/';

    mkdirSync(OUTPUT_FOLDER);

    getImages();

}

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

function getImages() {
    for (var i = 0; i < IMG_NBR; i++) {
        var filename = 'img_'+ i +'.jpg';

        var download = wget.download(src, OUTPUT_FOLDER+filename);

        download.on('error', function(err) {
            console.log(err);
        });

        download.on('end', function(output) {
            console.log(output);
        });
    }
}

function processArguments(args) {
    for(var i=0,l=args.length; i<l; i++){
        switch(args[i]){
            case '--help':
                displayHelp();
                break;
            case '-w':
                if(i < l-1) IMG_WIDTH = args[++i];
                else displayHelp();
                break;
            case '-h':
                if(i < l-1) IMG_HEIGHT = args[++i];
                else displayHelp();
                break;
            case '-n':
                if(i < l-1) IMG_NBR = args[++i];
                else displayHelp();
                break;
            case '-o':
                if(i < l-1) OUTPUT_FOLDER = args[++i];
                else displayHelp();
                break;
            default :
                console.log("Invalid argument : " + args[i]);
                displayHelp();
        }
    }

}

/**
 * Display help text
 */
function displayHelp(){
    console.log("HELP:");
    console.log("$>node get_images [options]");
    console.log("The options are : ");
    console.log("-w the width of the image");
    console.log("-h the height of the image");
    console.log("-n the numbers of images you want to donwload");
    console.log("-o the output folder for downloaded images");
    console.log("--help >> This help");
    process.exit(0);
}

main();
