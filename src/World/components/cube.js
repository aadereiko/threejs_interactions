import { BoxBufferGeometry, Color, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
  const geometry = new BoxBufferGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({
    color: new Color('white'),
  });
  const cube = new Mesh(geometry, material);
  cube.name = 'Central cube';

  return cube;
}

export { createCube };
