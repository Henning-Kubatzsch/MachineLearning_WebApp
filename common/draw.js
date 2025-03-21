const draw = {};

draw.path = (ctx, path, color = "black", fromF = false) => {

 
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
   
};

draw.paths = (ctx, paths, color = "black", fromF = false) => {

   for (const path of paths) {
      draw.path(ctx, path, color, fromF);
   }
   
   if(fromF){
     
     
      const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const countNoneZero  = imgData.data.filter((a) => a != 0).length;
      
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
