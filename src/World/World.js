import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createPlane } from "./components/plane.js";


import { createControls } from "./systems/controls.js";
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

    const controls = createControls(camera, renderer.domElement);
    const { directionalLight, ambientLight } = createLights();

    loop.updatables.push(controls);

    new Resizer(container, camera, renderer);

    const plane = createPlane();
    const raycaster = createRaycaster(camera, [plane]);

    scene.add(directionalLight, ambientLight);
    scene.add(plane);
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
