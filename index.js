var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200,
    draggable: true
});

var layer = new Kinetic.Layer();

var rect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    // fill: 'red',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true
});

var imageObj = new Image();
imageObj.src = 'osm.png';
imageObj.onload = function() {
    var image = new Kinetic.Image({
        x: 20,
        y: 50,
        image: imageObj,
        // width: 100,
        // height: 100
        scale: 1000
    });
    layer.add(image);
    image.on('click', function (e) {
        console.log(image.getWidth());
    });
};

// layer.add(rect);

stage.add(layer);

    /*
    var player = new Kinetic.Rect({
    });
    player.on("dragmove",function(){
        player.position()
    });
    playerLayer.add(player);
    playerLayer.draw();
    */


// var anim = new Kinetic.Animation(function(frame) {
//     layer.setY(layer.getY() + 1);
//     layer.draw();
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