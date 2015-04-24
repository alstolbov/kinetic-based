/*
TODO:
- процесс загрузки изображений: возвращать процент загрузки
- столкновения
- удаление обьекта
- управление с клавиатуры
- гравитация?
*/

var Game = {
    classCollection: {},
    objectCollection: {},
    objectIdsInCollections: {},
    Stage: {},
    layers: {},
    images: {}
};

Game.createClass = function (className, classData) {

    this.classCollection[className] = function () {
        var classType;
        var newClass;
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
                newClass = new Kinetic.Image(initData);
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
                newClass = new Kinetic.Sprite(initData);
                break;

            case 'simple':
                newClass = new Kinetic.Rect(initData);
                break;
        }


        if (classImg) {
            newClass.willSetImage = classImg;
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

        if (classData.pub) {
            newClass._pub = classData.pub;
        }

        return newClass;
    }
    
};

Game.createObject = function (className, objectData) {

    var layer;
    var img;

    var obj = this.classCollection[className]();

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
        if (objectData.attrs) {
            obj.setAttrs(objectData.attrs);
        }
    }

    obj.set = function (attrs) {
        obj.setAttrs(attrs);
        if (layer) {
            layer.draw();
        }

        return obj;
    };

    obj.getPub = function (pubMethodName, args) {
        var tmp = obj._pub();
        var res;

        if(!tmp[pubMethodName]) {
            res = false;
        } else {
            switch (typeof tmp[pubMethodName]) {

                case "function":
                    res = tmp[pubMethodName].call(obj, args);
                    break;
                default:
                    res = tmp[pubMethodName];

            }
        }

        return res;
    };

    obj.setPub = function (pubMethodName, args) {
        var tmp = obj._pub();
        
        if(!tmp[pubMethodName]) {
            tmp[pubMethodName] = args;
        }       
    };

    if (!this.objectCollection[className]) {
        this.objectCollection[className] = {
            _length: 0
        };
    }

    this.objectCollection[className][obj._id] = obj;

    this.objectCollection[className]._length++;

    this.objectIdsInCollections[obj._id] = className;

    return obj;
};

Game.destroyObject = function (obj) {
    if (this.objectIdsInCollections[obj._id]) {
        var className = this.objectIdsInCollections[obj._id];
        if (this.objectCollection[className] && this.objectCollection[className][obj._id]) {
            delete this.objectCollection[className][obj._id];
        }
        delete this.objectIdsInCollections[obj._id];

        this.objectCollection[className]._length--;

        obj.destroy();
        obj = NaN;

        return obj;
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

    return this.layers[layerName];

};
