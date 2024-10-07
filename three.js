import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import Stats from 'three/addons/libs/stats.module.js';

if (!WebGL.isWebGL2Available()) {
    document.getElementById("webglWarning").style.visibility = 'visible';
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = 0;
    loadingScreen.addEventListener("transitionend", () => {loadingScreen.remove();});
    throw new Error("WebGL not supported");
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
renderer.domElement.className = "titleCanvas"

const canvas = document.getElementById("titleScreen").appendChild(renderer.domElement);

let model;
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath( '/draco/' ); 
loader.setDRACOLoader( dracoLoader );
loader.load('public/sample.glb', function (gltf) {
    const newMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    gltf.scene.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
    });
    model = gltf.scene;
    scene.add(model);
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = 0;
    loadingScreen.addEventListener("transitionend", () => {loadingScreen.remove();})
}, undefined, function (error) {
    console.error(error);
});

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
scene.add(ambientLight)

const light = new THREE.DirectionalLight( 0xffffff, 2 );
light.position.set(-1, 1, 1);
scene.add(light.target);
scene.add(light);

camera.position.z = 0.2;

// Model rotation
let mouseStored = false;
let oldMouse = [0, 0];
let pseudoMouse = [0, 0];
const mouseMove = (e) => {
    if (document.getElementById("titleScreen").matches(":has(*:hover)")) {
        if (mouseStored) {
            pseudoMouse[0] += e.clientX-oldMouse[0];
            pseudoMouse[1] += e.clientY-oldMouse[1];
            pseudoMouse[1] = Math.max(-window.innerHeight*0.4, Math.min(pseudoMouse[1], window.innerHeight*0.4));
            oldMouse[0] = e.clientX;
            oldMouse[1] = e.clientY;
        } else {
            oldMouse[0] = e.clientX;
            oldMouse[1] = e.clientY;
            mouseStored = true;
        }
    } else {
        mouseStored = false;
    }
    if (document.getElementById("titleScreen").matches(":has(*:hover)") && model) {
        model.rotation.y = (pseudoMouse[0]) / (window.innerWidth/(Math.PI*2));
        model.rotation.x = pseudoMouse[1]/window.innerHeight*0.8 * Math.PI;
    }
};
document.addEventListener("mousemove", mouseMove);

// const controls = new OrbitControls( camera, renderer.domElement );
// const stats = new Stats();
// canvas.parentElement.appendChild(stats.dom)
function animate() {
    renderer.render(scene, camera);
    // stats.update();    
}
renderer.setAnimationLoop(animate);
