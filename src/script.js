import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loader
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("../static/textures/NormalMap.png");

// Debug - open/close controls
const gui = new dat.GUI();

// Canvas - where we will render our scene
const canvas = document.querySelector("canvas.webgl");

// Scene - holds Meshes(object+material), Lights, Camera
const scene = new THREE.Scene();

// Objects - the shape
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials - the color
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x6cd4ff);

// Mesh - the color and the shape
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights - illuminates the scene/meshes
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(0, 0, 0);
scene.add(pointLight2);

// Add gui tools
gui.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
gui.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
gui.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
gui.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// Add helpers
const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.1);
scene.add(pointLightHelper);
/**
 * Sizes
 */
// keeps the camera and renderer set to the dimetions of the window when resized
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
