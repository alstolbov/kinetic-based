/*
TODO:
- процесс загрузки изображений: возвращать процент загрузки
- столкновения
- управление с клавиатуры
- гравитация?
*/

var Game = {
    classCollection: {},
    objectCollection: {},
    Stage: {},
    layers: {},
    layerAnimation: {},
    images: {}
};

Game.createClass = function (className, classData) {

    this.classCollection[className] = function () {
        var classType;
        var newClass = {};
        var classImg;
        var init = classData.init;
        var initData = {};

        for (var key in init) {
            if (key.substring(0, 1) !== '_') {
                initData[key] = init[key];
            }
        }
        if (init._background) {
            classImg = init._background;
            classType = 'image';
        } else if (init._sprite) {
            classImg = init._sprite;
            classType = 'sprite';
        } else {
            classType = 'simple';
        }

        switch (classType) {

            case 'image':
                newClass.obj = new Kinetic.Image(initData);
                if (initData.width && initData.height) {
                    newClass.crop({
                        x: 0,
                        y: 0,
                        width: initData.width,
                        height: initData.height
                    });
                }
                break;

            case 'sprite':
                newClass.obj = new Kinetic.Sprite(initData);
                break;

            case 'simple':
                newClass.obj = new Kinetic.Rect(initData);
                break;
        }

        if (classImg) {
            newClass.willSetImage = classImg;
        }

        for (var option in classData) {
            switch (option) {
                case "events":
                    for (var classEventKey in classData.events) {
                        newClass.obj.on(
                            classEventKey,
                            function (e) {
                                classData.events[classEventKey].call(newClass, e);
                            }
                        );
                    }
                    break;

                case "init":
                    break;

                default:
                     newClass[option] = classData[option];
            }
        }

        return newClass;
    }
    
};

Game.createObject = function (className, objectData) {

    var layer;
    var img;
    var obj = {};
    obj = this.classCollection[className]();

    if (objectData) {
        if (objectData.layer) {

            if (typeof objectData.layer == 'object') {
                layer = objectData.layer;
            } else if (typeof objectData.layer == 'string') {
                layer = this.layers[objectData.layer];
                obj._layerName = objectData.layer;
            }

            if (obj.willSetImage) {
                img = this.getImage(obj.willSetImage);
                if (img) {
                    obj.obj.setImage(img);
                }
            }

            if (layer) {
                layer.add(obj.obj);
                layer.draw();
            }

        }
        if (objectData.attrs) {
            obj.obj.setAttrs(objectData.attrs);
        }
    }

    obj.set = function (attrs) {
        obj.obj.setAttrs(attrs);
        if (layer) {
            layer.draw();
        }

        return obj;
    };

    if (!this.objectCollection[className]) {
        this.objectCollection[className] = {
            _length: 0
        };
    }

    obj._className = className;

    this.objectCollection[className][obj.obj._id] = obj;

    this.objectCollection[className]._length++;

    if (obj._onCreate) {
        for (var i = 0; i < obj._onCreate.length; i++) {
            obj[obj._onCreate[i]]();
        }
    }

    return obj;
};

Game.destroyObject = function (obj) {
    if (this.objectCollection[obj._className] && this.objectCollection[obj._className][obj.obj._id]) {

        delete this.objectCollection[obj._className][obj.obj._id];

        this.objectCollection[obj._className]._length--;

        obj.obj.destroy();

        this.layers[obj._layerName].draw();

        return NaN;
    }
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

    for (var i=0; i < imagesArray.length; i++) {
        var imgObj = new Image();
        for (var key in imagesArray[i]) {
            imgSrc = imagesArray[i][key];
            _this.images[key] = imgObj;
        }

        imgObj.onload = function () { 
            loading++; 
            if (loading >= imagesArray.length) {
                done();
            }
        };
        imgObj.onerror=function () {
            console.log(imgSrc + "image load failed");
        } 
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
    this.createAimationOnLayer(layerName);
    return this.layers[layerName];

};

Game.createAimationOnLayer = function (layerName) {
    var _this = this;
    if (_this.layers[layerName]) {
        _this.layerAnimation[layerName] = {};
        _this.layerAnimation[layerName].animateCollection = {};
        _this.layerAnimation[layerName].animateController = new Kinetic.Animation(function(frame) {
            for(var animItem in _this.layerAnimation[layerName].animateCollection) {
                if (typeof _this.layerAnimation[layerName].animateCollection[animItem] == "function") {
                    _this.layerAnimation[layerName].animateCollection[animItem](frame);
                }
            }
        }, _this.layers[layerName]);

        _this.layerAnimation[layerName].animateController.start();
    }
};

Game.addLayerAnimation = function (data, animateFunct) {
    if (this.layerAnimation[data.layerName] &&
    typeof animateFunct == "function") {
        this.layerAnimation[data.layerName].animateCollection[data.objId] = animateFunct;
    }
};

Game.getLayerAnimation = function (layerName) {
    if (this.layerAnimation[layerName]) {
        return this.layerAnimation[layerName].animateController;
    } else {
        return false;
    }
};

Game.isCollide = function (obj, className) {
    var res = {
        isHit: false,
        objects: []
    };
    var objPos = obj.obj.position();
    var itemPos;
    var item;
    var itemId;
    for(itemId in this.objectCollection[className]) {
        if (itemId !== '_length') {
            item = this.objectCollection[className][itemId];
            itemPos = item.obj.position();
            if ((objPos.x - item.obj.getWidth()) == itemPos.x) {
                res.isHit = true;
                res.objects.push(this.objectCollection[className][itemId]);
            }
        }
    }

    return res;
};
