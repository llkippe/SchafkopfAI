/*jshint esversion:6*/

$(function() {
    const video = $("video")[0];

    var model;
    var cameraMode = "environment"; // or "user"

    const startVideoStreamPromise = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: cameraMode
        }
    }).then(function(stream) {
        return new Promise(function(resolve) {
            video.srcObject = stream;
            video.onloadeddata = function() {
                video.play();
                resolve();
            };
        });
    });

    var publishable_key = "rf_twpQdZ4Evm1CMiYC8138";
    var toLoad = {
        model: "completedeckv2",
        version: 1 // <<<--- YOUR VERSION THERE
    };

    const loadModelPromise = new Promise(function(resolve, reject) {
        roboflow.auth({
            publishable_key: publishable_key
        }).load(toLoad).then(function(m) {
            model = m;
            resolve();
        });
    });

    Promise.all([
        startVideoStreamPromise,
        loadModelPromise
    ]).then(function() {
        $('body').removeClass('loading');
        resizeCanvas();
        detectFrame();
    });

    var canvas, ctx;
    const font = "16px sans-serif";

    function videoDimensions(video) {
        // Ratio of the video's intrisic dimensions
        var videoRatio = video.videoWidth / video.videoHeight;

        // The width and height of the video element
        var width = video.offsetWidth, height = video.offsetHeight;

        // The ratio of the element's width to its height
        var elementRatio = width/height;

        // If the video element is short and wide
        if(elementRatio > videoRatio) {
            width = height * videoRatio;
        } else {
            // It must be tall and thin, or exactly equal to the original ratio
            height = width / videoRatio;
        }

        return {
            width: width,
            height: height
        };
    }

    $(window).resize(function() {
        resizeCanvas();
    });

    const resizeCanvas = function() {
        $('canvas').remove();

        canvas = $('<canvas/>');

        ctx = canvas[0].getContext("2d");

        var dimensions = videoDimensions(video);

        console.log(video.videoWidth, video.videoHeight, video.offsetWidth, video.offsetHeight, dimensions);

        canvas[0].width = video.videoWidth;
        canvas[0].height = video.videoHeight;

        canvas.css({
            width: dimensions.width,
            height: dimensions.height,
            left: ($(window).width() - dimensions.width) / 2,
            top: ($(window).height() - dimensions.height) / 2
        });

        $('body').append(canvas);
    };

    const renderPredictions = function(predictions) {
        var dimensions = videoDimensions(video);

        var scale = 1;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        predictions.forEach(function(prediction) {
            const x = prediction.bbox.x;
            const y = prediction.bbox.y;

            const width = prediction.bbox.width;
            const height = prediction.bbox.height;

            zeichen = prediction.class.substring(0,prediction.class.length-1)
            farbe = prediction.class.substring(prediction.class.length-1)

            var color
            if(farbe == "e") color = "#f2f22e"
            if(farbe == "b") color= "#10bd0d"
            if(farbe == "h") color = "#f20f34"
            if(farbe == "s") color = "#e0741b"

            ctx.strokeStyle = color;
            ctx.fillStyle = color;

            // Draw the bounding box.
            ctx.lineWidth = 4;
            ctx.strokeRect((x-width/2)/scale, (y-height/2)/scale, width/scale, height/scale);

            // Draw the label background.

            
            

            const textWidth = ctx.measureText(zeichen + "  " + prediction.confidence.toFixed(2)).width;
            const textHeight = parseInt(font, 10); // base 10
            ctx.fillRect((x-width/2)/scale, (y-height/2)/scale, textWidth + 8, textHeight + 4);

            ctx.font = font;
            ctx.textBaseline = "top";
            ctx.fillStyle = "#000000";
            ctx.fillText(zeichen + "  " + prediction.confidence.toFixed(2), (x-width/2)/scale+4, (y-height/2)/scale+1);
        });
    };

    const detectFrame = function() {
        if(!model) return requestAnimationFrame(detectFrame);

        model.detect(video).then(function(predictions) {
            requestAnimationFrame(detectFrame);
            renderPredictions(predictions);

        }).catch(function(e) {
            console.log("CAUGHT", e);
            requestAnimationFrame(detectFrame);
        });
    };
});
