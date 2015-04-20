// var stage = new Kinetic.Stage({
//     container: 'container',
//     width: 578,
//     height: 360
// });

// var layer = new Kinetic.Layer();

// var text = new Kinetic.Text({
//     x: 10,
//     y: 10,
//     // fontFamily: 'Calibri',
//     fontSize: 24,
//     text: 'sdsdd',
//     fill: 'black'
// });

// layer.add(text);
// stage.add(layer);
var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200,
    draggable: true
});

var layer = new Kinetic.Layer();

var circle = new Kinetic.Circle({
    x: 200,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

layer.add(circle);

stage.add(layer);

var circle2 = new Kinetic.Circle({
    x: 100,
    y: 10,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
});

var layer2 = new Kinetic.Layer();
layer2.add(circle2);
stage.add(layer2);

// var anim = new Kinetic.Animation(function(frame) {
//     circle2.setY(circle2.getY() + 1);
//     layer2.draw();
// });

// anim.start();

// var stage = new Kinetic.Stage({
//     container: 'container',
//     width: 320,
//     height: 240
// });

// var layer = new Kinetic.Layer({});

// var circle = new Kinetic.Circle({
//     x: 160,
//     y: 120,
//     radius: 100,
//     fill: "#f0f",
//     stroke: "black",
//     strokeWidth: 2,
//     draggable: true
// });

// var isDragging = false;

// circle.on('mouseover', function(event) {
//     circle.attrs.fill = "#ff0";
//     layer.draw();
// });

// circle.on('mouseout', function(event) {
//     circle.attrs.fill = "#f0f";
//     layer.draw();
// });

// circle.on('dragstart', function(event) {
//     isDragging = true;
//     circle.attrs.opacity = 0.5;
//     circle.attrs.radius = 9;
//     layer.draw();
// });

// circle.on('dragend mouseup touchup', function(event) {
//     isDragging = false;
//     circle.attrs.opacity = 1;
//     circle.attrs.radius = 100;
//     layer.draw();
// });


// layer.add(circle);

// stage.add(layer);