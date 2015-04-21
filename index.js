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
    });
    layer.add(image);
    image.on('click', function (e) {
        console.log(image.getWidth());
    });
};

// layer.add(rect);

stage.add(layer);

    var enemyLayer = new Kinetic.Layer();
    stage.add(enemyLayer);
    var playerLayer = new Kinetic.Layer();
    stage.add(playerLayer);

    var player = new Kinetic.Circle({
        x:100,
        y:100,
        radius: 10,
        fill: 'green',
        draggable: true
    });
    player.on("dragmove",function(){
        if(enemyLayer.getIntersection(player.position())){
            this.fill("red");
            playerLayer.draw();
        }
    });
    playerLayer.add(player);
    playerLayer.draw();

    var enemy = new Kinetic.Circle({
        x:200,
        y:100,
        radius: 20,
        fill: 'blue',
        draggable: true
    });
    enemyLayer.add(enemy);
    enemyLayer.draw();


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