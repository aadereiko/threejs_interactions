import { BoxBufferGeometry, Color, Mesh, MeshStandardMaterial } from 'three';

function createCube(name = 'Cube') {
  const geometry = new BoxBufferGeometry(10, 10, 10);
  const material = new MeshStandardMaterial({
    color: new Color(Math.random() * 0xffffff),
  });
  const cube = new Mesh(geometry, material);
  cube.name = name;
  
  return cube;
}

export { createCube };
