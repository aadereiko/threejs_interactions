import { BoxGeometry, DoubleSide, Mesh, MeshPhongMaterial } from "three";

const name = 'Plane';

function createPlane() {
    const geometry = new BoxGeometry(200, 200, 4);
    const material = new MeshPhongMaterial({ color: 'red', side: DoubleSide });

    const plane = new Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    plane.name = name;
    return plane;
}

export {
    createPlane, 
};