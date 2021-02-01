import { createCube } from "../components/cube";

const { Raycaster, Vector2 } = require("three");

// used for init
let raycaster = null;
let mouse = null;
let camera = null;
let scene = null;
let intersectableObjects = [];

// raycasting for lightnening
let lastIntersected;

function createRaycaster(cam, globalScene, intersectable = []) {
  camera = cam;
  raycaster = new Raycaster();
  mouse = new Vector2();
  scene = globalScene;
  intersectableObjects = intersectable;

  return raycaster;
}

const getIntersectableObjects = () => intersectableObjects;
const getMouse = () => mouse;
const getRaycaster = () => raycaster; 

export { createRaycaster, getRaycaster, getMouse, getIntersectableObjects };

const makeLighter = (intersects) => {
  if (intersects && intersects.length) {
    const intersectedNearest = intersects[0].object;
    if (intersectedNearest.name !== "Plane") {
      if (intersectedNearest !== lastIntersected) {
        if (lastIntersected) {
          lastIntersected.material.emissive.setHex(lastIntersected.currentHex);
        }

        lastIntersected = intersectedNearest;
        lastIntersected.currentHex = lastIntersected.material.emissive.getHex();
        intersectedNearest.material.emissive.setHex(0xffb3b3);
      }
    }
  } else {
    if (lastIntersected) {
      lastIntersected.material.emissive.setHex(lastIntersected.currentHex);
    }
    lastIntersected = null;
  }
};

const addCube = (planeIntersection) => {
  const cube = createCube(`Cube ${intersectableObjects.length}`);
  cube.position.copy(planeIntersection.point);
  cube.position.divideScalar(10).floor().multiplyScalar(10).addScalar(5);
  cube.position.y += cube.position.y < 0 ? -2 : 2;
  scene.add(cube);
  intersectableObjects.push(cube);
};

const removeCube = (cube) => {
  intersectableObjects = intersectableObjects.filter(
    (item) => item.name !== cube.name
  );
  scene.remove(cube);
};

const initEvent = (event) => {
  event.preventDefault();

  if (mouse && raycaster) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    return true;
  }

  return false;
};

function onMouseMove(event) {
  if (initEvent(event)) {
    const intersects = raycaster.intersectObjects(intersectableObjects);
    makeLighter(intersects);
  }
}

function onMouseDown(event) {
  if (initEvent(event)) {
    const intersects = raycaster.intersectObjects(intersectableObjects);
    if (intersects && intersects.length > 0) {
      if (intersects[0].object.name === "Plane") {
        addCube(intersects[0]);
      } else {
        removeCube(intersects[0].object);
      }
    }
  }
}

document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("click", onMouseDown, false);
