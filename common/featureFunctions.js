//const utils = require("./utils");

if(typeof geometry === "undefined"){
   geometry = require("./geometry");
}

if(typeof draw === "undefined"){
   draw = require("./draw");
}

if(typeof utils === "undefined"){
   utils = require("./utils");
}

const featureFunctions = {};

featureFunctions.getPathCount = (paths) => {
   return paths.length;
};

featureFunctions.getPointCount = (paths) => {
   const points = paths.flat();
   return points.length;
};

featureFunctions.getWidth = (paths) => {
   const points = paths.flat();
   if(points.length == 0){
      return 0;
   }
   const x = points.map((p) => p[0]);
   const min = Math.min(...x);
   const max = Math.max(...x);
   return max - min;
};

featureFunctions.getHeight = (paths) => {
   const points = paths.flat();
   if(points.length == 0){
      return 0;
   }
   const y = points.map((p) => p[1]);
   const min = Math.min(...y);
   const max = Math.max(...y);
   return max - min;
};

featureFunctions.getElongation = (paths) => {
   const points = paths.flat();
   const { width, height } = geometry.minimumBoundingBox({ points });
   return ( Math.max(width, height) + 1) / 
          ( Math.min(width, height) + 1);
};

featureFunctions.getRoundness = (paths) => {
   const points = paths.flat();
   const { hull } = geometry.minimumBoundingBox({ points });
   return geometry.roundness(hull);
};

featureFunctions.getPixels = (paths, size = 400, expand = true) => {
   let canvas = null;

   try{
      // for web
      canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.heigth = size;
   }catch (err){
      // for node
      const { createCanvas } = require("../node/node_modules/canvas");
      canvas = createCanvas(size, size);
   }
   const ctx = canvas.getContext("2d");
   
   // if expand == true: imgs get expanded to fill the whole canvas in givin borders
   if(expand){
      const points = paths.flat();
      const bounds = {
         left: Math.min(...points.map((p) => p[0])),
         right: Math.max(...points.map((p) => p[0])),
         top: Math.min(...points.map((p) => p[1])),
         bottom: Math.max(...points.map((p) => p[1]))
      };

      const newPaths = [];
      for(const path of paths){
         const newPoints = path.map(p =>
            [
               utils.invLerp(bounds.left, bounds.right, p[0]) * size,
               utils.invLerp(bounds.top, bounds.bottom, p[1]) * size
            ]
         );
         newPaths.push(newPoints);
      }
      draw.paths(ctx, newPaths, "black", true);
   }else{
      draw.paths(ctx, paths);
   }   
   const imgData = ctx.getImageData(0, 0, size, size);

   // here i return every 4th pixel
   return imgData.data.filter((val, index) => index %4 == 3);
}

featureFunctions.getComplexity = (paths) =>{
   const pixels = featureFunctions.getPixels(paths);
   console.log("pixels:" + pixels.filter((a) => a != 0).length);
   return pixels.filter((a) => a != 0).length;
};

featureFunctions.inUse = [

   {
      name: "Pixel Array", function:(paths) => {
         return featureFunctions.getPixels(paths, 20)
      }
   }

   //{name:"Path Count",function:featureFunctions.getPathCount},
   //{ name: "Width", function: featureFunctions.getWidth },
   //{ name: "Height", function: featureFunctions.getHeight },
   //{ name: "Elongation", function: featureFunctions.getElongation },
   //{ name: "Roundness", function: featureFunctions.getRoundness},
   //{ name: "GetComplexity", function: featureFunctions.getComplexity}
];

if (typeof module !== "undefined") {
   module.exports = featureFunctions;
}