import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createPlane } from "./components/plane.js";
import { createHelpers } from "./components/helpers.js";

import { createOrbitControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createRaycaster } from "./systems/Raycaster.js";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const orbitControls = createOrbitControls(camera, renderer.domElement);
    const { directionalLight, ambientLight } = createLights();

    loop.updatables.push(orbitControls);

    new Resizer(container, camera, renderer);

    const plane = createPlane();
    const { raycaster } = createRaycaster(
      camera,
      scene,
      [plane],
      orbitControls
    );
    const { axesHelper } = createHelpers();
    // const dragControls = createDragControls(cubes, camera, renderer.domElement);

    scene.add(directionalLight, ambientLight);
    scene.add(plane);
    scene.add(axesHelper);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
