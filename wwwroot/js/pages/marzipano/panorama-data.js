export const data = {
    "scenes": [
        {
            "id": "0-paisaje_mapaiso-pano",
            "name": "paisaje_mapaiso-pano",
            "levels": [
                {
                    "tileSize": 256,
                    "size": 256,
                    "fallbackOnly": true
                },
                {
                    "tileSize": 512,
                    "size": 512
                },
                {
                    "tileSize": 512,
                    "size": 1024
                }
            ],
            "faceSize": 750,
            "initialViewParameters": {
                "yaw": -0.17860871557525826,
                "pitch": 0.1192029136125079,
                "fov": 1.4023047414521557
            },
            "linkHotspots": [
                {
                    "yaw": -0.15564806112455543,
                    "pitch": 0.4024357648072794,
                    "rotation": 9.42477796076938,
                    "target": "1-lote-pano"
                },
                {
                    "yaw": 1.4031680183192385,
                    "pitch": 0.4428385917980968,
                    "rotation": 3.141592653589793,
                    "target": "1-lote-pano"
                }
            ],
            "infoHotspots": [
                {
                    "yaw": -0.28480347215085544,
                    "pitch": 0.35173149026608286,
                    "title": "Lote 001",
                    "text": "Area: 350m cuadrados<div>Estado: Disponible</div>"
                },
                {
                    "yaw": 1.2376755628133829,
                    "pitch": 0.48941446987817727,
                    "title": "Lote 002",
                    "text": "Area: 700m cuadrados<div>Estado: Reservado</div>"
                },
                {
                    "yaw": 2.977758655664646,
                    "pitch": 0.040580205091682586,
                    "title": "Colegio",
                    "text": "Nivel Primario y&nbsp;<br>Secundario, cancha incluida.<div><br></div>"
                },
                {
                    "yaw": -1.7422914197909396,
                    "pitch": 0.021668720337835623,
                    "title": "Plaza Principal",
                    "text": "Plaza recreacional"
                }
            ]
        },
        {
            "id": "1-lote-pano",
            "name": "lote-pano",
            "levels": [
                {
                    "tileSize": 256,
                    "size": 256,
                    "fallbackOnly": true
                },
                {
                    "tileSize": 512,
                    "size": 512
                },
                {
                    "tileSize": 512,
                    "size": 1024
                }
            ],
            "faceSize": 750,
            "initialViewParameters": {
                "pitch": 0,
                "yaw": 0,
                "fov": 1.5707963267948966
            },
            "linkHotspots": [
                {
                    "yaw": -2.6088959818594617,
                    "pitch": -0.022779109615507664,
                    "rotation": 0,
                    "target": "0-paisaje_mapaiso-pano"
                }
            ],
            "infoHotspots": []
        }
    ],
    "name": "Mapaiso",
    "settings": {
        "mouseViewMode": "drag",
        "autorotateEnabled": false,
        "fullscreenButton": false,
        "viewControlButtons": false
    }
};