var Game = {
    classCollection: {},
    objectCollection: {},
    Stage: {},
    layers: {},
    images: {}
};

Game.createClass = function (className, classData) {

    this.classCollection[className] = function () {
        var sprite;
        var init = classData.init;
        var initData = {};

        for (var key in init) {
            if (key.substring(0, 1) !== '_') {
                initData[key] = init[key];
            }
        }
        if (init._sprite) {
            sprite = init._sprite;
        }

        var newClass = new Kinetic.Image(initData);
        if (initData.width && initData.height) {
            newClass.crop({
                x: 0,
                y: 0,
                width: initData.width,
                height: initData.height
            });
        }

        if (sprite) {
            newClass.willSetImage = sprite;
        }

        if (classData.events) {
            for (var classEventKey in classData.events) {
                newClass.on(
                    classEventKey,
                    function (e) {
                        classData.events[classEventKey].call(newClass, e);
                    }
                );
            }
        }

        return newClass;
    }
    
};

Game.createObject = function (className, objectData) {

    var layer;
    var img;

    if (!this.objectCollection[className]) {
        this.objectCollection[className] = [];
    }

    var obj = this.classCollection[className]();

    this.objectCollection[className].push(obj);

    if (objectData) {
        if (objectData.layer) {

            if (typeof objectData.layer == 'object') {
                layer = objectData.layer;
            } else if (typeof objectData.layer == 'string') {
                layer = this.layers[objectData.layer];
            }

            if (obj.willSetImage) {
                img = this.getImage(obj.willSetImage);
                if (img) {
                    obj.setImage(img);
                }
            }

            if (layer) {
                layer.add(obj);
                layer.draw();
            }
        }
    }

    obj.set = function (attrs) {
        obj.setAttrs(attrs);
        if (layer) {
            layer.draw();
        }
    }

    return obj;
};

Game.init = function (initData) {

    var canvasNode = document.createElement('div');
    canvasNode.id = "game-container";
    document.body.appendChild(canvasNode);

    initData.container = canvasNode.id;

    this.Stage = new Kinetic.Stage(initData);

    return this.Stage;
};

Game.loadImages = function (imagesArray, done) {

    var _this = this;
    var loading = 0;
    var imgSrc;

    for (var i=0; i<imagesArray.length; i++) {
        var imgObj = new Image();
        for (var key in imagesArray[i]) {
            imgSrc = imagesArray[i][key];
            console.log(key, imgSrc);
            _this.images[key] = imgObj;
        }

        imgObj.onload = function(){ 
            loading++; 
            if (loading >= imagesArray.length) {
                done();
            }
        };
        imgObj.onerror=function(){alert("image load failed");} 
        // imgObj.crossOrigin="anonymous";
        imgObj.src = imgSrc;
    }  

};

Game.getImage = function (imgName) {
    return this.images[imgName] ?
        this.images[imgName] :
        false;
};

Game.layer = function (layerName) {

    this.layers[layerName] = new Kinetic.Layer();
    this.Stage.add(this.layers[layerName]);

    return this.layers[layerName];

};
