//===================================================
//HTML5 The Missing Manual Second Edition CANVAS
//===================================================
let gradient, control1_x, control1_y,  control2_x,  control2_y,  endPointX,  endPointY;

window.onload = function(){
  
  //ELDER
  let elderCanvas=document.getElementById('elder');
  let elderContext=elderCanvas.getContext('2d');
  gradient=elderContext.createLinearGradient(0,0,750,700);
  gradient.addColorStop("0", "#4b08ed");
  gradient.addColorStop("1.0", "#730cb4");
  elderContext.fillStyle=gradient;
  
  elderContext.beginPath();
  elderContext.moveTo(10,150);
  control1_x = 50;
  control1_y = 75;
  control2_x = 125;
  control2_y = 125;
  endPointX = 150;
  endPointY = 50;
  elderContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  //arc parameters: centerX,centerY,radius,startingAngle,endingAngle
  elderContext.arc(205, 100, 75, 1.25*Math.PI, 2*Math.PI);
  
  elderContext.stroke();
  

  //CACTI
  let cactiCanvas=document.getElementById('cacti');
  let cactiContext=cactiCanvas.getContext('2d');
  
  gradient=cactiContext.createLinearGradient(0,0,750,700);
  gradient.addColorStop("0", "#add334");
  gradient.addColorStop("1.0", "#2e641a");
  cactiContext.fillStyle=gradient;
  
  cactiContext.beginPath();
  cactiContext.arc(362,70,62,0,2*Math.PI);
  cactiContext.fill();
  cactiContext.stroke();
  
  cactiContext.beginPath();
  cactiContext.arc(225,200,50,0,2*Math.PI);
  cactiContext.fill();
  cactiContext.stroke();
  
  cactiContext.beginPath();
  cactiContext.arc(500,100,50,0,2*Math.PI);
  cactiContext.fill();
  cactiContext.stroke();
  
  cactiContext.rect(300,70,125,630);
  cactiContext.rect(175,200,100,150);
  cactiContext.rect(450,100,100,300);
  cactiContext.stroke();
  cactiContext.fill();
  
  cactiContext.moveTo(175,350);
  control1_x = 175;
  control1_y = 350;
  control2_x = 175;
  control2_y = 450;
  endPointX = 300;
  endPointY = 450;
  cactiContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  cactiContext.lineTo(300,350);
  control1_x = 300;
  control1_y = 360;
  control2_x = 300;
  control2_y = 370;
  endPointX = 275;
  endPointY = 350;
  cactiContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  cactiContext.closePath();
  cactiContext.fill();
  cactiContext.stroke();
  
  cactiContext.moveTo(450,400);
  control1_x = 450;
  control1_y = 475;
  control2_x = 450;
  control2_y = 475;
  endPointX = 425;
  endPointY = 475;
  cactiContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  
  cactiContext.lineTo(425,550);
  control1_x = 425;
  control1_y = 550;
  control2_x = 550;
  control2_y = 550;
  endPointX = 550;
  endPointY = 400;
  cactiContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  cactiContext.closePath();
  cactiContext.fill();
  cactiContext.stroke();
  
  cactiContext.rect(452,98,96,296);
  cactiContext.rect(300,69,125,630);
  cactiContext.rect(175,198,99,148);
  cactiContext.fill();
  
  //GRASS
  let grassCanvas=document.getElementById('grass');
  let grassContext=grassCanvas.getContext('2d');
  
  gradient=grassContext.createLinearGradient(360,425,390,700);
  gradient.addColorStop("0", "#29b406");
  gradient.addColorStop("1.0", "#176404");
  
  grassContext.moveTo(10,700);
  grassContext.lineTo(30,400);
  grassContext.lineTo(75,600);
  grassContext.lineTo(110,350);
  grassContext.lineTo(125,600);
  grassContext.lineTo(150,325);
  grassContext.lineTo(185,650);
  grassContext.lineTo(210,350);
  grassContext.lineTo(255,600);
  grassContext.lineTo(275,325);
  grassContext.lineTo(280,600);
  grassContext.lineTo(310,350);
  grassContext.lineTo(325,600);
  grassContext.lineTo(350,325);
  grassContext.lineTo(385,625);
  grassContext.lineTo(410,350);
  grassContext.lineTo(455,600);
  grassContext.lineTo(475,325);
  grassContext.lineTo(480,600);
  grassContext.lineTo(510,350);
  grassContext.lineTo(525,600);
  grassContext.lineTo(550,325);
  grassContext.lineTo(585,675);
  grassContext.lineTo(610,350);
  grassContext.lineTo(655,600);
  grassContext.lineTo(685,325);
  grassContext.lineTo(690,650);
  grassContext.lineTo(725,400);
  grassContext.lineTo(740,700);
  grassContext.closePath();
  grassContext.stroke();
  grassContext.fillStyle=gradient;
  grassContext.fill();
  
  //FLOWER
  let flowerCanvas=document.getElementById('flower');
  let flowerContext=flowerCanvas.getContext('2d');
  
  gradient=flowerContext.createLinearGradient(360,425,390,700);
  gradient.addColorStop("0", "#176404");
  gradient.addColorStop("1.0", "#29b406");
  
  flowerContext.rect(360,425,30,275);
  flowerContext.fillStyle=gradient;
  flowerContext.stroke();
  flowerContext.fill();
  
  gradient=flowerContext.createRadialGradient(350,200,50,350,200,400);
  gradient.addColorStop("0", "#b42cd7");
  gradient.addColorStop("1.0", "#74138d");
  flowerContext.strokeStyle="black";
  flowerContext.fillStyle=gradient;
  flowerContext.beginPath();
  flowerContext.arc(375,150,100,0,2*Math.PI);
  flowerContext.fill();
  flowerContext.stroke();
  flowerContext.beginPath();
  flowerContext.arc(500,250,100,0,2*Math.PI);
  flowerContext.fill();
  flowerContext.stroke();
  flowerContext.beginPath();
  flowerContext.arc(450,400,100,0,2*Math.PI);
  flowerContext.fill();
  flowerContext.stroke();
  flowerContext.beginPath();
  flowerContext.arc(300,400,100,0,2*Math.PI);
  flowerContext.fill();
  flowerContext.stroke();
  flowerContext.beginPath();
  flowerContext.arc(250,250,100,0,2*Math.PI);
  flowerContext.fill();
  flowerContext.stroke();
  
  gradient=flowerContext.createRadialGradient(365,275,1,365,275,75);
  gradient.addColorStop("0", "yellow");
  gradient.addColorStop("1.0", "orange");
  flowerContext.fillStyle=gradient;
  flowerContext.beginPath();
  flowerContext.arc(375,300,75,0,2*Math.PI);
  flowerContext.fill();
  flowerContext.stroke();
  
  //SHROOM
  let shroomCanvas=document.getElementById('shroom');
  let shroomContext=shroomCanvas.getContext('2d');
  gradient=shroomContext.createRadialGradient(350,250,150,400,200,300);
  gradient.addColorStop("0", "red");
  gradient.addColorStop("1.0", "#c60505");
  
  shroomContext.strokeStyle="black";
  shroomContext.fillStyle=gradient;
  shroomContext.arc(375,300,250,0,2*Math.PI);
  shroomContext.fill();
  shroomContext.stroke();
  
  shroomContext.beginPath();
  shroomContext.strokeStyle="black";
  shroomContext.fillStyle="#f9fae2";
  shroomContext.arc(250,300,75,0,2*Math.PI);
  shroomContext.fill();
  shroomContext.stroke();
  
  shroomContext.beginPath();
  shroomContext.arc(400,150,30,0,2*Math.PI);
  shroomContext.fill();
  shroomContext.stroke();
  
  shroomContext.beginPath();
  shroomContext.arc(500,275,50,0,2*Math.PI);
  shroomContext.fill();
  shroomContext.stroke();
  
  shroomContext.clearRect(0,450,750,250);
  
  shroomContext.beginPath();
  shroomContext.moveTo(325,450);
  
  control1_x = 350;
  control1_y = 550;
  control2_x = 250;
  control2_y = 600;
  endPointX = 300;
  endPointY = 700;
  
  shroomContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  shroomContext.lineTo(450,700);
  
  control1_x = 500;
  control1_y = 600;
  control2_x = 400;
  control2_y = 550;
  endPointX = 425;
  endPointY = 450;
  
  shroomContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
  shroomContext.closePath();
  shroomContext.stroke();
  shroomContext.fillStyle='#f9fae2';
  shroomContext.fill();
  
  shroomContext.beginPath();
  shroomContext.moveTo(175,450);
  shroomContext.lineTo(575,450);
  shroomContext.stroke();
  
  

// //=======================
// //FANCY FILLS p.281
// //=======================
//   var fancyFillsCanvas = document.getElementById("fancyFillsCanvas");
//   fancyFillsContext = fancyFillsCanvas.getContext("2d");
  
//   //brick patterned rectangle
//   var img=document.getElementById('brickTile');
//   var pattern=fancyFillsContext.createPattern(img,"repeat");
//   fancyFillsContext.rect(20,20,200,100);
//   fancyFillsContext.fillStyle=pattern;
//   fancyFillsContext.shadowColor='#bbbbbb';
//   fancyFillsContext.shadowBlur=20;
//   fancyFillsContext.shadowOffsetX=15;
//   fancyFillsContext.shadowOffsetY=15;
//   fancyFillsContext.fill();
  
//   //rainbow circle w/ linear gradient
//   //CanvasGradient ctx.createLinearGradient(xstart, ystart, xend, yend);
//   var gradient=fancyFillsContext.createLinearGradient(0,15,0,65);
//   gradient.addColorStop("0", "magenta");
//   gradient.addColorStop(".25", "blue");
//   gradient.addColorStop(".50", "green");
//   gradient.addColorStop(".75", "yellow");
//   gradient.addColorStop("1.0", "red");
//   //circle
//   centerX = 440;
//   centerY = 50;
//   radius = 25;
//   startingAngle = 0;
//   endingAngle = 2 * Math.PI;
//   fancyFillsContext.lineWidth=1;
//   fancyFillsContext.beginPath();
//   fancyFillsContext.arc(centerX, centerY, radius, startingAngle, endingAngle);
//   fancyFillsContext.fill();
//   fancyFillsContext.stroke();
//   fancyFillsContext.fillStyle=gradient;//gradient for fill
//   fancyFillsContext.fill();
//   fancyFillsContext.stroke();
  
//   //rainbow rectangle w/ radial gradient
//   //CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
//   let circlegradient=fancyFillsContext.createRadialGradient(350,255,5,350,255,30);
//   circlegradient.addColorStop("0", "magenta");
//   circlegradient.addColorStop(".25", "blue");
//   circlegradient.addColorStop(".50", "green");
//   circlegradient.addColorStop(".75", "yellow");
//   circlegradient.addColorStop("1.0", "red");
//   fancyFillsContext.rect(323,235,55,45);
//   fancyFillsContext.fillStyle=circlegradient;//gradient for fill
//   fancyFillsContext.fill();
//   fancyFillsContext.stroke();
  
  
//   //star
//   fancyFillsContext.shadowOffsetX=10;
//   fancyFillsContext.shadowOffsetY=10;
//   fancyFillsContext.shadowBlur=4;
//   img=document.getElementById("star");
//   fancyFillsContext.drawImage(img,250,30);
  
//   //shadowed text
//   fancyFillsContext.textBaseline="top";
//   fancyFillsContext.font="bold 20px Arial";
  
//   fancyFillsContext.shadowBlur=3;
//   fancyFillsContext.shadowOffsetX=2;
//   fancyFillsContext.shadowOffsetY=2;
//   fancyFillsContext.fillStyle="steelblue";
//   fancyFillsContext.fillText("This is a subtle, slightly old-fashioned shadow.",10,175);
  
//   fancyFillsContext.shadowBlur=5;
//   fancyFillsContext.shadowOffsetX=20;
//   fancyFillsContext.shadowOffsetY=20;
//   fancyFillsContext.fillStyle="green";
//   fancyFillsContext.fillText("This is a distant shadow.",10,225);
  
//   fancyFillsContext.shadowBlur=15;
//   fancyFillsContext.shadowOffsetX=0;
//   fancyFillsContext.shadowOffsetY=0;
//   fancyFillsContext.shadowColor="black";
//   fancyFillsContext.fillStyle="white";
//   fancyFillsContext.fillText("This shadow isn't offset. It creates a halo effect.",10,300);

// //=======================
// //DRAWING TEXT p.279
// //=======================
//   var drawingTextCanvas = document.getElementById("drawingTextCanvas");
//   drawingTextContext = drawingTextCanvas.getContext("2d");
  
//   drawingTextContext.font="20px Arial";
//   drawingTextContext.textBaseline="top";
//   drawingTextContext.fillStyle="black";
//   drawingTextContext.fillText("Some text here",10,10);
  
//   drawingTextContext.font="bold 40px Verdana,sans-serif";
//   drawingTextContext.lineWidth='1';
//   drawingTextContext.strokeStyle='red';
//   drawingTextContext.strokeText("I'm an OUTLINE", 20,50);

// //=======================
// //DRAWING IMAGES p.276
// //=======================
//   var drawingImageCanvas = document.getElementById("drawingImageCanvas");
//   drawingImageContext = drawingImageCanvas.getContext("2d");
  
//   // Create the image object.
//   var img = new Image();
  
//   // Attach a function to the onload event.
//   // This tells the browser what to do after the image is loaded.
//   img.onload = function() {
    
//     drawingImageCanvas.width=this.naturalWidth;
//     drawingImageCanvas.height=this.naturalHeight;
   
//     //drawingImageContext.drawImage(this, 0, 0);
//     drawingImageContext.drawImage(this, 0, 0, this.width, this.height);
//   };
  
//   // Load the image file.
//   img.src = "Sprite_comic_example.png";

// //=======================
// //COMPOSITE CANVAS
// //=======================
//   var compositeCanvas = document.getElementById("compositeCanvas");
//   compositeContext = compositeCanvas.getContext("2d");
  
//   var effect="xor";
//   counter=0;

//   // Draw a rectangle.
//   compositeContext.fillStyle = "blue";
//   compositeContext.fillRect(100,12,200,200);
  
//   // Choose the global composite operation
//   compositeContext.globalCompositeOperation= effect;
  
//   compositeContext.fillStyle="red";
//   compositeContext.beginPath();
//   compositeContext.arc(300,195,100,0,Math.PI*2,true);
//   compositeContext.fill();
  

// //=======================
// //TRANSPARENCY CANVAS
// //=======================
//   var transparencyCanvas = document.getElementById("transparencyCanvas");
//   var transparencyContext = transparencyCanvas.getContext("2d");
  
//   transparencyContext.translate(100,15);
  
//   // Set the fill and outline colors
//   transparencyContext.fillStyle="rgb(8,241,101)";
//   transparencyContext.lineWidth=10;
//   transparencyContext.strokeStyle="rgb(8,26,241)";
  
//   // Draw a circle
//   transparencyContext.arc(110,120,100,0,2*Math.PI);
//   transparencyContext.fill();
//   transparencyContext.stroke();
  
//   // Remember to call beginPath() before adding a new shape.
//   // Otherwise, the outlines of both shapes will
//   // be merged together in an unpredictable way.
//   transparencyContext.beginPath();
  
//   // Give the triangle a transparent fill
//   transparencyContext.fillStyle="rgba(241,8,148,0.5)";
  
//   // Now draw the triangle.
//   transparencyContext.moveTo(215,50);
//   transparencyContext.lineTo(15,250);
//   transparencyContext.lineTo(315,250);
//   transparencyContext.closePath();
//   transparencyContext.fill();
//   transparencyContext.stroke();
  
//   // //The other way is set the drawing context's globalAlpha property
//   // context.globalAlpha = 0.5;
//   // // Now this color automatically gets an alpha value of 0.5:
//   // context.fillStyle = "rgb(100,150,185)";

// //=======================
// //TRANSFORM-ERS2 CANVAS
// //=======================
//   var transforms2Canvas = document.getElementById("transforms2Canvas");
//   var transforms2Context = transforms2Canvas.getContext("2d");
  
//   // Move the (0,0) point. This is important, because
//   // the rotate transform turns around this point.
//   transforms2Context.translate(250, 150);
  
//   // Draw 10 squares.
//   var copies = 10;
//   for (var i=1; i<copies; i++){
//     // Before drawing the square, rotate the coordinate system.
//     // A complete rotation is 2*Math.PI. This code does a fraction of this
//     // for each square, so that it has rotated around completely by the time
//     // it's drawn the last one.
//     transforms2Context.rotate(2*Math.PI*1/(copies-1));
//     // Draw the square.
//     transforms2Context.rect(0,0,60,60);
//   }
  
//   transforms2Context.lineWidth=3;
//   transforms2Context.strokeStyle="#e056a9";
//   transforms2Context.stroke();

// //=======================
// //TRANSFORM-ERS CANVAS
// //=======================
//   var transformsCanvas = document.getElementById("transformsCanvas");
//   var transformsContext = transformsCanvas.getContext("2d");
  
//   // Draw a 50x50 square, at three places
//   transformsContext.strokeStyle="red";
//   // Draw a square at (10,10)
//   transformsContext.rect(10,10,50,50);
//   transformsContext.stroke();
  
//   transformsContext.strokeStyle="orange";
//   // Shift the coordinate system down and right
//   transformsContext.translate(215,115);
//   transformsContext.rect(10,10,50,50);
//   transformsContext.stroke();
  
//   transformsContext.strokeStyle="blue";
//   // Shift the coordinate system down a bit more. Transforms are cumulative,
//   // so now the (10,10) point will actually be at (450,250).
//   transformsContext.translate(215,115);
//   transformsContext.rect(10,10,50,50);
//   transformsContext.stroke();
  
// //=======================
// //CURVED LINES CANVAS
// //=======================
//   var curvedLinesCanvas = document.getElementById("curvedLinesCanvas");
//   var curvedLinesContext = curvedLinesCanvas.getContext("2d");
  
  
//   //Bezier Curve
//   // Put the pen where the curve starts
//   curvedLinesContext.moveTo(10,242);
  
//   // Create variables for the two control points and the end point of the curve
//   var control1_x = 187;
//   var control1_y = 32;
//   var control2_x = 300;
//   var control2_y = 400;
//   var endPointX = 490;
//   var endPointY = 200;
  
//   // Draw the curve
//   curvedLinesContext.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
//   curvedLinesContext.strokeStyle="#2cde29";
//   curvedLinesContext.lineWidth=10;
//   curvedLinesContext.stroke();
  
//   //Curved Line
//   // Create variables to store each detail about the arc
//   var centerX = 75;
//   var centerY = 180;
//   var radius = 50;
//   var startingAngle = 1.25 * Math.PI;
//   var endingAngle = 1.75 * Math.PI;
  
//   curvedLinesContext.strokeStyle="red";
//   curvedLinesContext.lineWidth=5;
  
//   curvedLinesContext.beginPath();
//   // Use this information to draw the arc
//   curvedLinesContext.arc(centerX, centerY, radius, startingAngle, endingAngle);
//   curvedLinesContext.stroke();
  
//   //A Perfect Circle
//   centerX = 250;
//   centerY = 150;
//   radius = 50;
//   startingAngle = 0;
//   endingAngle = 2 * Math.PI;
  
//   curvedLinesContext.strokeStyle="orange";
//   curvedLinesContext.fillStyle="yellow";
//   curvedLinesContext.lineWidth=5;
  
//   curvedLinesContext.beginPath();
//   curvedLinesContext.arc(centerX, centerY, radius, startingAngle, endingAngle);
//   curvedLinesContext.fill();
//   curvedLinesContext.stroke();

//   //Semi-circle
//   centerX = 400;
//   centerY = 185;
//   radius = 50;
//   startingAngle = 1.25 * Math.PI;
//   endingAngle = 1.75 * Math.PI;
  
//   curvedLinesContext.strokeStyle="orange";
//   curvedLinesContext.lineWidth=5;
  
//   curvedLinesContext.beginPath();
//   curvedLinesContext.arc(centerX, centerY, radius, startingAngle, endingAngle);
//   curvedLinesContext.closePath();
//   curvedLinesContext.stroke();
  
  

// //=======================
// //RECTANGLE CANVAS
// //=======================
//   var rectangleCanvas = document.getElementById("rectangleCanvas");
//   var rectangleContext = rectangleCanvas.getContext("2d");
  
//   rectangleContext.lineWidth =10;
//   rectangleContext.strokeStyle = "black";
//   rectangleContext.fillStyle ="pink";
// // rectangleContext.fillRect(10,10,480,280);
//   rectangleContext.strokeRect(10,10,480,280);

// //=======================
// //TRIANGLE CANVAS
// //=======================
//   var triangleCanvas = document.getElementById("triangleCanvas");
//   var triangleContext = triangleCanvas.getContext("2d");
  
//   var tgradient=fancyFillsContext.createLinearGradient(0,60,0,170);
//   tgradient.addColorStop("0", "#1fbbff");
//   tgradient.addColorStop("1.0", "#0f6fcd");
  
//   triangleContext.moveTo(250,150);
//   triangleContext.lineTo(50,25);
//   triangleContext.lineTo(50,275);
//   triangleContext.closePath();
  
//   // Paint the inside.
//   triangleContext.fillStyle = tgradient;
//   triangleContext.fill();
  
//   // Draw the outline.
//   triangleContext.lineWidth = 5;
//   // triangleContext.lineJoin = round;
//   triangleContext.strokeStyle = "#2aa2ea";
//   triangleContext.stroke();

// //=======================
// //LINES CANVAS
// //=======================

//   var linesCanvas = document.getElementById("linesCanvas");
//   var linesContext = linesCanvas.getContext("2d");
  
//   // Set the line width and color
//   linesContext.lineWidth=20;
//   // Set the color using color name, hex or rgb value:
//   linesContext.strokeStyle = "red";
  
//   // Draw the first line, with the standard butt ending
//   linesContext.moveTo(10,50);
//   linesContext.lineTo(400,50);
//   linesContext.lineCap = "butt";
//   linesContext.stroke();
  
//   // Draw the second line, with a round cap.
//   linesContext.strokeStyle = "yellow";
  
//   linesContext.beginPath();
//   linesContext.moveTo(10,120);
//   linesContext.lineTo(400,120);
//   linesContext.lineCap = "round";
//   linesContext.stroke();
  
//   // Draw the third line, with a square cap
//   linesContext.strokeStyle = "blue";
  
//   linesContext.beginPath();
//   linesContext.moveTo(10,190);
//   linesContext.lineTo(400,190);
//   linesContext.lineCap = "square";
//   linesContext.stroke();
// };

};