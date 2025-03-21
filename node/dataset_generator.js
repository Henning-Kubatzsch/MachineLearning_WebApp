const draw = require("../common/draw.js");
const constants = require("../common/constants.js");
const utils = require("../common/utils.js");

const { createCanvas } = require("canvas");
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

const fs = require("fs");
const geometry = require("../common/geometry.js");
const featureFunctions = require("../common/featureFunctions.js");

// This section helps to install the package (just deletes and creates again the data directory)
if (fs.existsSync(constants.DATASET_DIR)) {
   fs.readdirSync(constants.DATASET_DIR).forEach((fileName) =>
      fs.rmSync(constants.DATASET_DIR + "/" + fileName, { recursive: true })
   );
   fs.rmdirSync(constants.DATASET_DIR);
}

// create directories
fs.mkdirSync(constants.DATASET_DIR);
fs.mkdirSync(constants.JSON_DIR);
fs.mkdirSync(constants.IMG_DIR);
if (!fs.existsSync(constants.MODELS_DIR)) {
   fs.mkdirSync(constants.MODELS_DIR);
}
console.log("GENERATING DATASET ...");

// generates samples.js samples.json files, image files, paths files
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
fileNames.forEach((fn) => {
   const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);
   const { session, student, drawings } = JSON.parse(content);
   for (let label in drawings) {
      if(!utils.flaggedSamples.includes(id)){
         samples.push({
            id,
            label,
            student_name: student,
            student_id: session,
         });   
         const paths = drawings[label];
         fs.writeFileSync(
            constants.JSON_DIR + "/" + id + ".json",
            JSON.stringify(paths)
         );   
         generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths);
      }
      utils.printProgress(id, fileNames.length * 8);
      id++;
   }
});

console.log("\n");

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

fs.mkdirSync(constants.JS_OBJECTS, {recursive: true});
fs.writeFileSync(
   constants.SAMPLES_JS,
   "const samples = " + JSON.stringify(samples) + ";"
);

function generateImageFile(outFile, paths) {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   //draw.paths(ctx, paths);

   const pixels = featureFunctions.getPixels(paths);
   const size = Math.sqrt(pixels.length);
   const imgData = ctx.getImageData(0, 0, size, size);

   for(let i = 0; i < pixels.length; i++){
      const alpha = pixels[i];
      const startIndex = i * 4;
      // red
      imgData.data[startIndex] = 0;
      // green
      imgData.data[startIndex + 1] = 0;
      // blue
      imgData.data[startIndex + 2] = 0;
      // alpha
      imgData.data[startIndex + 3] = alpha;
   }

   // don't draw but put image data \\//
   ctx.putImageData(imgData, 0, 0);

   // following is for debugging pixel count
   /*
   const complexity = pixels.filter((a) => a != 0).length;
   draw.text(ctx, complexity, "blue");
   */

   // following code is generating bounding box when using the vertecies line and when using the hull line
   
   const{vertices, hull} = geometry.minimumBoundingBox({
      points: paths.flat()
   });

   const roundness = geometry.roundness(hull);
   //console.log(roundness);
   const R = 255 - Math.floor(roundness ** 5 * 255);
   const G = 255 - 0;
   const B = 255 - Math.floor(( 1 - roundness ** 5 ) * 255);
   const color = `rgb(${R},${G},${B})`;   

   //draw.path(ctx, [...vertices, vertices[0]], "red");
   //draw.path(ctx, [...hull, hull[0]], color);

   const buffer = canvas.toBuffer("image/png");
   fs.writeFileSync(outFile, buffer);
}
