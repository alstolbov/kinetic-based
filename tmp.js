var imageURLs=[];  // put the paths to your images here
var imagesOK=0;
var imgs=[];
imageURLs.push("");
loadAllImages(start);

function loadAllImages(callback){
    for (var i=0; i<imageURLs.length; i++) {
        var img = new Image();
        imgs.push(img);
        img.onload = function(){ 
            imagesOK++; 
            if (imagesOK>=imageURLs.length ) {
                callback();
            }
        };
        img.onerror=function(){alert("image load failed");} 
        img.crossOrigin="anonymous";
        img.src = imageURLs[i];
    }      
}

function start(){
    // the imgs[] array holds fully loaded images
    // the imgs[] are in the same order as imageURLs[]
    // use the images now!
}