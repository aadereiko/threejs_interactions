import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 10000);

  camera.position.set(300, 260, 200);
  camera.lookAt(0, 0, 0);

  return camera;
}

export { createCamera };
