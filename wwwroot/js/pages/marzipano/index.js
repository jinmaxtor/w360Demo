import { data } from './panorama-data.js';

export class Index {
    constructor(params) {
        if (!params.viewerContainer) {
            throw new Error("Debe especificar el contenedor del visor 360");
        }

        this.viewerContainer = document.getElementById(params.viewerContainer);
        this.baseUrl = params.baseUrl;
        this.data = data;

        this.sceneNameElement = document.querySelector('#titleBar .sceneName');
        this.autorotateToggleElement = document.querySelector('#autorotateToggle');
        this.initialize();
    }

    initialize() {
        if (window.matchMedia) {
            const mql = matchMedia("(max-width: 500px), (max-height: 500px)");
            const setMode = () => {
                if (mql.matches) {
                    document.body.classList.remove('desktop');
                    document.body.classList.add('mobile');
                } else {
                    document.body.classList.remove('mobile');
                    document.body.classList.add('desktop');
                }
            };

            setMode();
            mql.addEventListener("change", setMode);
        } else {
            document.body.classList.add('desktop');
        }

        // Detect whether we are on a touch device.
        document.body.classList.add('no-touch');
        window.addEventListener('touchstart', function () {
            document.body.classList.remove('no-touch');
            document.body.classList.add('touch');
        });

        // Use tooltip fallback mode on IE < 11.
        if (window.bowser?.msie && parseFloat(window.bowser.version) < 11) {
            document.body.classList.add('tooltip-fallback');
        }


        // Create viewer.
        this.viewer = new Marzipano.Viewer(this.viewerContainer);

        this.scenes = data.scenes.map(sceneData => {
            const imageUrl = `${this.baseUrl}assets/360/marzipano/${sceneData.name}.jpg`;
            const source = Marzipano.ImageUrlSource.fromString(imageUrl);
            const geometry = new Marzipano.EquirectGeometry([{ width: 3000 }]);
            const limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
            const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

            const scene = this.viewer.createScene({
                source: source,
                geometry: geometry,
                view: view,
                pinFirstLevel: true
            });

            // Create link hotspots.
            sceneData.linkHotspots.forEach(hotspot => {
                const element = this.createLinkHotspotElement(hotspot);
                scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
            });

            // Create info hotspots.
            sceneData.infoHotspots.forEach(hotspot => {
                const element = this.createInfoHotspotElement(hotspot);
                scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
            });

            return {data: sceneData, scene: scene, view: view};
        });

        // Set up autorotate, if enabled.
        const autorotate = Marzipano.autorotate({
            yawSpeed: 0.03,
            targetPitch: 0,
            targetFov: Math.PI / 2
        });
        if (this.data.settings.autorotateEnabled) {
            autorotateToggleElement.classList.add('enabled');
        }


        // Display the initial scene.
        this.switchScene(this.scenes[0]);
    }

    createLinkHotspotElement(hotspot) {

        // Create wrapper element to hold icon and tooltip.
        const wrapper = document.createElement('div');
        wrapper.classList.add('hotspot');
        wrapper.classList.add('link-hotspot');

        // Create image element.
        const icon = document.createElement('img');
        icon.src = `${this.baseUrl}/lib/marzipano/images/link.png`;
        icon.classList.add('link-hotspot-icon');

        // Set rotation transform.
        const transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
        for (const property of transformProperties) {
            icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
        }

        /*for (const i = 0; i < transformProperties.length; i++) {
            const property = transformProperties[i];
            icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
        }*/

        // Add click event handler.
        wrapper.addEventListener('click', () => {
            this.switchScene(this.findSceneById(hotspot.target));
        });

        // Prevent touch and scroll events from reaching the parent element.
        // This prevents the view control logic from interfering with the hotspot.
        this.stopTouchAndScrollEventPropagation(wrapper);

        // Create tooltip element.
        const tooltip = document.createElement('div');
        tooltip.classList.add('hotspot-tooltip');
        tooltip.classList.add('link-hotspot-tooltip');
        tooltip.innerHTML = this.findSceneDataById(hotspot.target).name;

        wrapper.appendChild(icon);
        wrapper.appendChild(tooltip);

        return wrapper;
    }

    createInfoHotspotElement(hotspot) {

        // Create wrapper element to hold icon and tooltip.
        const wrapper = document.createElement('div');
        wrapper.classList.add('hotspot');
        wrapper.classList.add('info-hotspot');

        // Create hotspot/tooltip header.
        const header = document.createElement('div');
        header.classList.add('info-hotspot-header');

        // Create image element.
        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('info-hotspot-icon-wrapper');
        const icon = document.createElement('img');
        icon.src = `${this.baseUrl}/lib/marzipano/images/info.png`;
        icon.classList.add('info-hotspot-icon');
        iconWrapper.appendChild(icon);

        // Create title element.
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('info-hotspot-title-wrapper');
        const title = document.createElement('div');
        title.classList.add('info-hotspot-title');
        title.innerHTML = hotspot.title;
        titleWrapper.appendChild(title);

        // Create close element.
        const closeWrapper = document.createElement('div');
        closeWrapper.classList.add('info-hotspot-close-wrapper');
        const closeIcon = document.createElement('img');
        closeIcon.src = `${this.baseUrl}/lib/marzipano/images/close.png`;
        closeIcon.classList.add('info-hotspot-close-icon');
        closeWrapper.appendChild(closeIcon);

        // Construct header element.
        header.appendChild(iconWrapper);
        header.appendChild(titleWrapper);
        header.appendChild(closeWrapper);

        // Create text element.
        const text = document.createElement('div');
        text.classList.add('info-hotspot-text');
        text.innerHTML = hotspot.text;

        // Place header and text into wrapper element.
        wrapper.appendChild(header);
        wrapper.appendChild(text);

        // Create a modal for the hotspot content to appear on mobile mode.
        const modal = document.createElement('div');
        modal.innerHTML = wrapper.innerHTML;
        modal.classList.add('info-hotspot-modal');
        document.body.appendChild(modal);

        const toggle = () => {
            wrapper.classList.toggle('visible');
            modal.classList.toggle('visible');
        };

        // Show content when hotspot is clicked.
        wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

        // Hide content when close icon is clicked.
        modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

        // Prevent touch and scroll events from reaching the parent element.
        // This prevents the view control logic from interfering with the hotspot.
        this.stopTouchAndScrollEventPropagation(wrapper);

        return wrapper;
    }

    stopTouchAndScrollEventPropagation(element, eventList = undefined) {
        eventList = eventList ?? ['touchstart', 'touchmove', 'touchend', 'touchcancel',
            'wheel', 'mousewheel'];

        eventList.forEach(eventType => element.addEventListener(eventType, event => event.stopPropagation()));

    }

    switchScene(scene) {
        this.stopAutorotate();
        scene.view.setParameters(scene.data.initialViewParameters);
        scene.scene.switchTo();
        //this.startAutorotate();
        this.updateSceneName(scene);
        //updateSceneList(scene);
    }

    stopAutorotate() {
        this.viewer.stopMovement();
        this.viewer.setIdleMovement(Infinity);
    }

    startAutorotate() {
        if (!this.autorotateToggleElement.classList.contains('enabled')) {
            return;
        }
        this.viewer.startMovement(autorotate);
        this.viewer.setIdleMovement(3000, autorotate);
    }

    updateSceneName(scene) {
        this.sceneNameElement.innerHTML = this.sanitize(scene.data.name);
    }

    sanitize(s) {
        return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
    }

    findSceneById(id) {
        const findedScene = this.scenes.find(scene => scene.data.id === id);
        return findedScene;
    }

    findSceneDataById(id) {
        const findedSceneData = this.data.scenes.find(sceneData => sceneData.id === id);
        return findedSceneData;
    }
}

window.pageInstance = new Index(window.params);
