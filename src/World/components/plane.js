import { BoxGeometry, DoubleSide, Mesh, MeshPhongMaterial } from "three";

const name = 'Plane';

function createPlane() {
    const geometry = new BoxGeometry(10, 20, 1);
    const material = new MeshPhongMaterial({ color: 'red', side: DoubleSide });

    const plane = new Mesh(geometry, material);
    plane.name = name;
    return plane;
}

export {
    createPlane, 
};