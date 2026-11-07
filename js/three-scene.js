/**
 * Three.js 3D Hero Scene
 * Creates an interactive 3D holographic sphere and floating particle vortex
 * with smooth camera parallax responding to mouse movements.
 */

class Hero3DExperience {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      console.warn('Three.js library not detected. Skipping 3D initialization.');
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.coreMesh = null;
    this.ringMesh1 = null;
    this.ringMesh2 = null;
    this.particles = null;
    this.floatingObjects = [];

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.clock = new THREE.Clock();
    this.animationFrameId = null;

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    const container = this.canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight || 600;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 24;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLightCyan.position.set(10, 10, 10);
    this.scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 3, 50);
    pointLightPurple.position.set(-10, -10, 10);
    this.scene.add(pointLightPurple);

    // 5. Geometries & Objects
    this.createCoreSphere();
    this.createOrbitRings();
    this.createParticleCloud();
    this.createFloatingPolygons();

    // 6. Event listeners
    this.addEventListeners();

    // 7. Start animation loop
    this.animate();
  }

  createCoreSphere() {
    // Holographic wireframe icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    });
    this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.scene.add(this.coreMesh);

    // Inner glowing solid crystal
    const innerGeo = new THREE.OctahedronGeometry(2.4, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.scene.add(this.innerMesh);
  }

  createOrbitRings() {
    // Orbital Ring 1
    const ringGeo1 = new THREE.TorusGeometry(7.5, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.3
    });
    this.ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ringMesh1.rotation.x = Math.PI / 3;
    this.scene.add(this.ringMesh1);

    // Orbital Ring 2
    const ringGeo2 = new THREE.TorusGeometry(9, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.4,
      roughness: 0.3
    });
    this.ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ringMesh2.rotation.y = Math.PI / 4;
    this.ringMesh2.rotation.x = -Math.PI / 6;
    this.scene.add(this.ringMesh2);
  }

  createParticleCloud() {
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xf43f5e)  // Rose
    ];

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const radius = 11 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createFloatingPolygons() {
    const geometries = [
      new THREE.TetrahedronGeometry(0.8),
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
      new THREE.DodecahedronGeometry(0.6)
    ];

    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: true }),
      new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true }),
      new THREE.MeshStandardMaterial({ color: 0x34d399, wireframe: true })
    ];

    for (let i = 0; i < 9; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      // Random position orbiting outer perimeter
      const angle = (i / 9) * Math.PI * 2;
      const dist = 11 + Math.random() * 3;
      mesh.position.set(
        Math.cos(angle) * dist,
        (Math.random() - 0.5) * 8,
        Math.sin(angle) * dist
      );

      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
        rotSpeed: 0.01 + Math.random() * 0.02
      };

      this.floatingObjects.push(mesh);
      this.scene.add(mesh);
    }
  }

  addEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this));

    // Pause on hidden tabs to preserve performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      } else {
        this.animate();
      }
    });
  }

  onPointerMove(event) {
    this.targetMouseX = (event.clientX - this.windowHalfX) * 0.001;
    this.targetMouseY = (event.clientY - this.windowHalfY) * 0.001;
  }

  onWindowResize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const container = this.canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight || 600;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth mouse lerping
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Rotate core meshes
    if (this.coreMesh) {
      this.coreMesh.rotation.y = elapsedTime * 0.15 + this.mouseX * 0.5;
      this.coreMesh.rotation.x = elapsedTime * 0.08 + this.mouseY * 0.5;
    }

    if (this.innerMesh) {
      this.innerMesh.rotation.y = -elapsedTime * 0.3;
      this.innerMesh.rotation.z = elapsedTime * 0.2;
    }

    // Rotate rings
    if (this.ringMesh1) {
      this.ringMesh1.rotation.z = elapsedTime * 0.12;
      this.ringMesh1.rotation.y = Math.sin(elapsedTime * 0.2) * 0.3;
    }

    if (this.ringMesh2) {
      this.ringMesh2.rotation.z = -elapsedTime * 0.09;
      this.ringMesh2.rotation.x = Math.cos(elapsedTime * 0.2) * 0.4;
    }

    // Rotate particle cloud
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.05;
    }

    // Animate orbiting floating polygons
    this.floatingObjects.forEach((obj, idx) => {
      obj.rotation.x += obj.userData.rotSpeed;
      obj.rotation.y += obj.userData.rotSpeed;
      obj.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.015;
    });

    // Camera subtle tilt based on mouse
    this.camera.position.x += (this.mouseX * 5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY * 5 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }
}

// Auto-initialize when window loads
window.addEventListener('DOMContentLoaded', () => {
  window.hero3D = new Hero3DExperience('hero-3d-canvas');
});

