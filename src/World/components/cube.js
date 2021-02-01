import { BoxBufferGeometry, Color, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
  const geometry = new BoxBufferGeometry(3, 3, 3);
  const material = new MeshStandardMaterial({
    color: new Color('red'),
  });
  const cube = new Mesh(geometry, material);
  cube.name = 'Central cube';

  return cube;
}

export { createCube };
