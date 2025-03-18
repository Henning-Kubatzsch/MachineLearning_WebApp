const draw = {};

draw.path = (ctx, path, color = "black", fromF = false) => {

   /*
   if(fromF){
      if (!(ctx instanceof CanvasRenderingContext2D)) {
         console.error("Invalid 2D canvas context");
         return;
      }
      console.log("Drawing path with color:", color);
      console.log("Path coordinates:", path);
   
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(...path[0]);
      console.log("Moved to:", path[0]);
   
      for (let i = 1; i < path.length; i++) {
         ctx.lineTo(...path[i]);
         console.log("Line to:", path[i]);
   
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      return;
   }else{
   */

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(...path[0]);
   
      for (let i = 1; i < path.length; i++) {
         ctx.lineTo(...path[i]);   
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
   //}   
};

draw.paths = (ctx, paths, color = "black", fromF = false) => {


   /*
   if (fromF) {
      console.log("fromF");
         if (!(ctx instanceof CanvasRenderingContext2D)) {
         console.error("Invalid 2D canvas context");
         return;
         }
   }      
   */
   for (const path of paths) {
      draw.path(ctx, path, color, fromF);
   }
   
   if(fromF){
      /*
      console.log("Context state before leaving draw.paths:");
      console.log("strokeStyle:", ctx.strokeStyle);
      console.log("lineWidth:", ctx.lineWidth);
      console.log("lineCap:", ctx.lineCap);
      console.log("lineJoin:", ctx.lineJoin);
      */
      const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const countNoneZero  = imgData.data.filter((a) => a != 0).length;
      console.log("countNoneZero:", countNoneZero);
   }
   
};

draw.text = (ctx, text, color="black", loc = [0,0], size = 100) =>{
   ctx.font = "bold " + size + "px Courier";
   ctx.textBaseline = "top";
   ctx.fillStyle = color;
   ctx.fillText(text, ...loc);
}

if (typeof module !== "undefined") {
   module.exports = draw;

}
