const { Raycaster, Vector2 } = require("three");

// used for init
let raycaster = null;
let mouse = null;
let camera = null;
let intersectableObjects = [];

// raycasting
let lastIntersected;

function createRaycaster(cam, intersectable = []) {
    camera = cam;
    raycaster = new Raycaster();
    mouse = new Vector2();
    intersectableObjects = intersectable;

    return raycaster;
}

const makeLighter = (intersects) => {
    if (intersects && intersects.length) {
        const intersectedNearest = intersects[0].object;
        if (intersectedNearest !== lastIntersected) {
            if (lastIntersected) {
                lastIntersected.material.emissive.setHex(lastIntersected.currentHex);
            }

            lastIntersected = intersectedNearest;
            lastIntersected.currentHex = lastIntersected.material.emissive.getHex();
            intersectedNearest.material.emissive.setHex(0x00ff00);
        }
    } else {
        if (lastIntersected) {
            lastIntersected.material.emissive.setHex(lastIntersected.currentHex);
        }
        lastIntersected = null;
    }
}

function onMouseMove(event) {
  event.preventDefault();

  if (mouse && raycaster) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(intersectableObjects);
    makeLighter(intersects);
  }
}

window.addEventListener('mousemove', onMouseMove, false);

export { createRaycaster, raycaster, mouse };