<template>
  <canvas id="container" style="width: 100vw; height: 100vh" />
</template>
<script>
import * as THREE from 'three';

export default {
  data() {
    return {
      canvas: null,
      renderer: null,
      camera: null
    };
  },
  computed: {},
  mounted() {
    this.rendererCanvas();

    window.onresize = this.onWindowResize;
  },
  unmounted() {
    window.onresize = null;
  },
  methods: {
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight; // 重新设置宽高比
      this.camera.updateProjectionMatrix(); // 更新相机
      this.renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染页面大小
      this.renderer.setPixelRatio(window.devicePixelRatio);
    },
    // 渲染
    rendererCanvas() {
      const canvas = window.document.querySelector('#container');
      const renderer = new THREE.WebGLRenderer({
        canvas,
        // 执行抗锯齿
        antialias: true,
        // 包含透明度
        alpha: true,
        // 设置为可缓存
        preserveDrawingBuffer: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染页面大小
      renderer.setPixelRatio(window.devicePixelRatio);

      this.canvas = canvas;
      this.renderer = renderer;

      const scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;

      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshNormalMaterial();

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      this.renderer.setAnimationLoop((time) => {
        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;
        this.renderer.render(scene, this.camera);
      });
    }
  }
};
</script>
