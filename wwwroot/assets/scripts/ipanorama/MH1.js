var dirImages = urlBase + "/assets/images/360/MH1/";
$(document).ready(function () {

    var mapa = $("#mypanorama").ipanorama({
        "theme": "ipnrm-theme-dark",
        "autoLoad": true,
        "autoRotate": false,
        "autoRotateInactivityDelay": 5000,
        "mouseWheelRotate": false,
        "mouseWheelRotateCoef": 0.2,
        "mouseWheelZoom": true,
        "mouseWheelZoomCoef": 0.05,
        "hoverGrab": false,
        "hoverGrabYawCoef": 20,
        "hoverGrabPitchCoef": 20,
        "grab": true,
        "grabCoef": 0.1,
        "showControlsOnHover": false,
        "showZoomCtrl": true,
        "showFullscreenCtrl": false,
        "title": true,
        "compass": true,
        "keyboardNav": true,
        "keyboardZoom": true,
        "popover": true,
        "popoverTemplate": "<div class=\"ipnrm-popover my-popover\">\n<div class=\"ipnrm-close\"></div>\n<div class=\"ipnrm-arrow\"></div>\n<div class=\"ipnrm-content\"></div>\n</div>",
        "popoverPlacement": "right",
        "popoverShowTrigger": "",
        "popoverHideTrigger": "",
        "pitchLimits": false,
        "mobile": true,
        "sceneId": "scene1",
        "sceneFadeDuration": 3000,
        "scenes": {
            "scene1": {
                "type": "sphere",
                "image": urlBase360 + "/assets/360/mapa360.jpg",
                "yaw": 90,
                "hotSpots": [
                    //--------------Terrenos
                    {
                        "yaw": 52,
                        "pitch": -15,
                        //"sceneId": "scene2",
                        "className": "my-punto2",
                        "content": null
                    },
                    {
                        "yaw": 74,
                        "pitch": -18,
                        //"sceneId": "scene2",
                        "className": "my-punto2",
                        "content": null
                    },
                    {
                        "yaw": 98,
                        "pitch": -18,
                        //"sceneId": "scene2",
                        "className": "my-punto2",
                        "content": null
                    },
                    {
                        "yaw": 120,
                        "pitch": -15,
                        //"sceneId": "scene2",
                        "className": "my-punto2",
                        "content": null
                    },

                    //----------------Terreno 2
                    {
                        "yaw": 66,
                        "pitch": -12,
                        "sceneId": "scene2",
                        "className": "ver-mas",
                        "content": null
                    },
                    {
                        "yaw": 105,
                        "pitch": -11,
                        "sceneId": "scene2",
                        "className": "ver-mas",
                        "content": null
                    },
                    
                    //-------------------Terreno 3

                    {
                        "yaw": -150.89104945591761,
                        "pitch": 10.637604524307545,
                        //"sceneId": "scene3",
                        "className": "my-colegio",
                        "content": null
                    },
                    {
                        "yaw": 86.85694462523914,
                        "pitch": 9.434980353801134,
                        "className": "img-indicacion-360",
                        "content": null
                    }

                ]
            },
            "scene2": {
                "type": "sphere",
                "image": urlBase360 + "/assets/360/lote01.jpg",
                "yaw": 90,
                "hotSpots": [
                    {
                        "yaw": 270.0357700348354,
                        "pitch": -16.274447859081402,
                        "sceneId": "scene1",
                        "className": "my-360"
                    }
                ]
            },
            
        }
    });

    $('#mypanorama').height($(window).height());

    CargarAcciones();

    console.log("mapa", mapa);
});