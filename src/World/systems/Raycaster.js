import { createCube } from "../components/cube";
import { setActionHelperText } from "../elements/action-helper";
const {
  Raycaster,
  Vector2,
  Vector3,
  Plane,
} = require("three");

// used for init
let raycaster = null;
let mouse = null;
let camera = null;
let scene = null;
let intersectableObjects = [];
let lastAddedCubeNumber = 1;
let canvas = null;

// raycasting for lightnening
let lastIntersected;

// <--------------- drag ---------------->
let isMouseDown = false;
// we use plane to permit move mouse faster and not to miss dragging proccess
const helpPlane = new Plane();
const pNormal = new Vector3(0, 1, 0);
let dragObject = null;
const planeIntersect = new Vector3();

// shfit is used for smooth moving independing on the point of object we've clicked
const shift = new Vector3();
// < ------------------------------------>

// remove
let isShiftDown = false;

function createRaycaster(cam, globalScene, intersectable = [], canvasElement) {
  camera = cam;
  raycaster = new Raycaster();
  mouse = new Vector2();
  scene = globalScene;
  intersectableObjects = intersectable;
  canvas = canvasElement;

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  canvas.addEventListener("mouseup", onMouseUp, false);

  return { raycaster };
}

const getIntersectableObjects = () => intersectableObjects;
const getMouse = () => mouse;
const getRaycaster = () => raycaster;

export { createRaycaster, getRaycaster, getMouse, getIntersectableObjects };

const makeLighter = (intersects) => {
  if (
    intersects &&
    intersects.length &&
    intersects[0].object.name !== "Plane"
  ) {
    const intersectedNearest = intersects[0].object;
    if (intersectedNearest !== lastIntersected) {
      if (lastIntersected) {
        lastIntersected.material.emissive.setHex(lastIntersected.currentHex);
      }

      lastIntersected = intersectedNearest;
      lastIntersected.currentHex = lastIntersected.material.emissive.getHex();
      intersectedNearest.material.emissive.setHex(0xffb3b3);
    }
  } else {
    if (lastIntersected) {
      lastIntersected.material.emissive.setHex(lastIntersected.currentHex);
    }
    lastIntersected = null;
  }
};

const addCube = (planeIntersection) => {
  const cube = createCube(`Cube ${lastAddedCubeNumber}`);
  cube.position.copy(planeIntersection.point);
  cube.position.divideScalar(10).floor().multiplyScalar(10).addScalar(5);
  cube.position.y += cube.position.y < 0 ? -2 : 2;
  scene.add(cube);
  lastAddedCubeNumber++;
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

const handleHelperText = (intersects) => {
  if (!intersects.length) {
    setActionHelperText("Click onto the plane to place a cube there");
    return;
  }

  const intersectedObject = intersects[0].object;


  if (intersectedObject.name.startsWith("Cube") || dragObject) {
    setActionHelperText(`Click and move ${intersectedObject.name}  to relocate it or remove it by click with pressed SHIFT key.`);
    return;
  }

  if (intersectedObject.name === "Plane") {
    setActionHelperText(`Add Cube ${lastAddedCubeNumber}`);
    return;
  }
};

function onMouseMove(event) {
  if (initEvent(event)) {
    const intersects = raycaster.intersectObjects(intersectableObjects);
    handleHelperText(intersects);
    makeLighter(intersects);
    if (isMouseDown && dragObject) {
      raycaster.ray.intersectPlane(helpPlane, planeIntersect);
      const newPosition = new Vector3().addVectors(planeIntersect, shift);
      if (Math.abs(newPosition.x) <= 95 && Math.abs(newPosition.z) <= 95) {
        const previousY = dragObject.position.y;
        dragObject.position.copy(newPosition).divideScalar(10).floor().multiplyScalar(10).addScalar(5);
        dragObject.position.setY(previousY);
      }
    }
  }
}

function onMouseDown(event) {
  if (initEvent(event)) {
    isMouseDown = true;
    const intersects = raycaster.intersectObjects(intersectableObjects);
    if (intersects && intersects.length > 0) {
      if (intersects[0].object.name === "Plane") {
        addCube(intersects[0]);
      } else {
        if (!isShiftDown) {
          helpPlane.setFromNormalAndCoplanarPoint(pNormal, intersects[0].point);
          shift.subVectors(intersects[0].object.position, intersects[0].point);
          dragObject = intersects[0].object;
        } else {
          removeCube(intersects[0].object);
        }
      }
    }
  }
}

function onMouseUp(event) {
  if (initEvent(event)) {
    isMouseDown = false;
    dragObject = null;
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Shift") {
    isShiftDown = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "Shift") {
    isShiftDown = false;
  }
});