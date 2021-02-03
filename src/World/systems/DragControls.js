import { DragControls } from 'three/examples/jsm/controls/DragControls.js';


function createDragControls(objects, camera, domElement) {
    const controls = new DragControls(objects, camera, domElement);

    return controls;
}

export { createDragControls };