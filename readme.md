#Get dummy images##System Requirements#To run the Node script, __cd__ to the `dummy_images` directory and run the command:```npm install```To grab dummy images form LoremPixel:-------------------------------------```node get_images.js [options]```The following options are available :* -help : display the available arguments* -w the width of the image* -h the height of the image* -n the numbers of images you want to donwload* -o the output folder for downloaded imagesDefault values, the width/height is size of small/large images used in current DataModel:* IMG_WIDTH = 352* IMG_HEIGHT = 198* IMG_NBR = 1* OUTPUT_FOLDER = d:\\tmp\\To use themoviedb api:----------------------Check http://docs.themoviedb.apiary.io, need a personal API key. *(tool not completed)*```node get_movies_images.js```Need to change at line: 54 & 93 the `miscChangedMovies` to be conform with the api.