import { BoxBufferGeometry, Color, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
  const geometry = new BoxBufferGeometry(10, 10, 10);
  const material = new MeshStandardMaterial({
    color: new Color(Math.random() * 0xffffff),
  });
  const cube = new Mesh(geometry, material);
  cube.name = 'Cube';
  
  return cube;
}

export { createCube };
