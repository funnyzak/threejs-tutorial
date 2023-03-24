<template>
  <div>
    <div class="button-container"><input type="checkbox" v-model="showAngle" /> 角度测量</div>
    <div class="footer">
      Model by&nbsp;<a
        href="https://sketchfab.com/3d-models/motorcycle-custom-bike-jawa-low-poly-13771fe558604aedae09b5157029e790"
        target="_blank"
        >Kreems</a
      >
    </div>
    <canvas
      id="container"
      ref="container"
      style="width: 100vw; height: 100vh; background-color: #222" />
  </div>
</template>
<script>
/**
 * Created by leon<silenceace@gmail.com> on 23/03/24.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const modelInfo = {
  name: 'motorcycle',
  res: {
    obj: 'model/motorcycle/motorcycle.obj',
    mtl: 'model/motorcycle/motorcycle.mtl'
  }
};

let scene;

export default {
  name: 'CalcAngle',
  data() {
    return {
      showAngle: false,

      container: undefined,
      canvas: undefined,
      renderer: undefined,
      camera: undefined,

      controls: undefined,
      activeModel: undefined,
      activeModelMaterials: undefined,
      actvieModelSize: {
        box: undefined,
        boxSize: undefined,
        boxCenter: undefined,
        boxSizeLength: undefined
      },

      mouse: new THREE.Vector2(),
      raycaster: undefined,
      // 存放选择的点
      points: [],
      // 存放构成的线
      lines: []
    };
  },
  computed: {},
  mounted() {
    window.onresize = this.onWindowResize;

    this.container = this.$refs.container;

    this.rendererCanvas();
    this.loadModel(modelInfo);

    this.listenPoint();
  },
  unmounted() {
    window.onresize = null;
  },
  destroyed() {
    // remove event listener
    window.removeEventListener('click', this.addPoint);
  },
  methods: {
    onWindowResize() {
      this.camera.aspect = this.container.offsetWidt / this.container.offsetHeight; // 重新设置宽高比
      this.camera.updateProjectionMatrix(); // 更新相机
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    },
    listenPoint() {
      // 添加射线
      this.raycaster = new THREE.Raycaster();
      // 添加事件监听
      window.addEventListener('click', (event) => {
        this.addPoint(event);
      });
    },
    toggleActiveModelOpacity(isOpacity = true) {
      if (this.activeModel) {
        this.activeModel.traverse((child) => {
          if (child.isMesh) {
            child.material.opacity = isOpacity ? 0.5 : 1;
            child.material.transparent = isOpacity;
          }
        });
      }
    },
    // 监听用户模型点击
    addPoint(event) {
      event.preventDefault();
      console.log('addPoint, this is => ', this);
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(scene.children[0]);
      if (intersects.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        const { point } = intersects[0];
        this.points.push(point);
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(this.points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const line = new THREE.Line(geometry, material);
        line.name = 'line';
        scene.add(line);
        this.lines.push(line);

        if (this.points.length >= 3) {
          console.log(this.points);

          this.toggleActiveModelOpacity();

          // display line
          // const shape = new THREE.Shape(this.points);
          // const _geometry = new THREE.ShapeGeometry(shape);
          // const _material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
          // const mesh = new THREE.Mesh(_geometry, _material);
          // scene.add(mesh);

          const angle = this.calculateAngle(this.points);
          console.log('angle => ', angle);

          this.displayAngle(angle, this.points);
        }
      }
    },
    displayAngle(angle, points) {
      const fontLoader = new FontLoader();
      fontLoader.load('assets/fonts/Arial_Regular.json', (font) => {
        const angleText = new TextGeometry(`${angle.toFixed(2)}°`, {
          font,
          size: 0.1,
          height: 0.1,
          // curveSegments: 1,
          bevelEnabled: false
        });
        const angleMaterial = new THREE.MeshBasicMaterial();
        const angleLabel = new THREE.Mesh(angleText, angleMaterial);
        const midPoint = new THREE.Vector3()
          .add(points[0])
          .add(points[1])
          .add(points[2])
          .divideScalar(3);
        angleLabel.position.copy(midPoint);

        scene.add(angleLabel);
      });
    },
    calculateAngle(points) {
      const v1 = new THREE.Vector3().subVectors(points[0], points[1]);
      const v2 = new THREE.Vector3().subVectors(points[2], points[1]);

      const angle = v1.angleTo(v2);
      return angle * (180 / Math.PI);
    },

    // 初始化画布
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

      renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      this.canvas = canvas;
      this.renderer = renderer;

      scene = new THREE.Scene();
    },
    // 根据模型大小计算并设置相机
    setCamera() {
      const camera = new THREE.PerspectiveCamera(
        45,
        this.container.offsetWidth / this.container.offsetHeight,
        0.1,
        1000
      );
      // 设置相机默认位置
      camera.position.set(0, 10, 20);

      this.frameArea(
        this.actvieModelSize.boxSizeLength * 1.2,
        this.actvieModelSize.boxSizeLength,
        this.actvieModelSize.boxCenter,
        camera
      );
      this.camera = camera;

      this.setLight();

      this.setControls();

      this.renderer.render(scene, this.camera);
    },
    setLight() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.4);
      this.camera.add(pointLight);

      scene.add(this.camera);
    },
    setControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.update();
      this.controls = controls;

      const animate = () => {
        window.requestAnimationFrame(animate);
        // required if controls.enableDamping or controls.autoRotate are set to true
        this.controls.update();
        this.renderer.render(scene, this.camera);
      };
      animate();
    },
    // 根据模型尺寸为相机设置合适的位置
    frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
      const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.6;
      const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
      const direction = new THREE.Vector3()
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

      camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

      camera.near = boxSize / 1000;
      camera.far = boxSize * 1000;

      camera.updateProjectionMatrix();

      camera.lookAt(boxCenter);
    },
    loadModel(_modelInfo) {
      const mtlManager = this.loadMtlManager();
      const modelManager = this.loadModelManager();

      const mtlLoader = new MTLLoader(mtlManager);
      mtlLoader.load(_modelInfo.res.mtl, (materials) => {
        materials.preload();

        console.log('model materials:', materials);

        this.activeModelMaterials = materials;

        new OBJLoader(modelManager)
          .setMaterials(materials)
          .load(
            _modelInfo.res.obj,
            this.loadModelSuccess,
            this.loadModelProcess,
            this.loadModelError
          );
      });
    },
    // MTL加载控制器
    loadMtlManager() {
      const manager = new THREE.LoadingManager();
      manager.onStart = function (item, loaded, total) {
        console.log('Loading Mtl started');
      };
      // 纹理加载完成清除滚动条
      manager.onLoad = function () {
        console.log('Loading Mtl complete');
      };

      manager.onProgress = function (item, loaded, total) {
        const percentComplete = (loaded / total) * 100;
        // console.log('Mtl loading percent：', percentComplete);
      };

      manager.onError = function (err) {
        console.error('Mtl Load Error.', err);
      };
      return manager;
    },
    /**
     * 模型加载器
     */
    loadModelManager() {
      const manager = new THREE.LoadingManager();
      manager.onStart = function (item, loaded, total) {
        console.log('Loading Model started');
      };
      // 纹理加载完成清除滚动条
      manager.onLoad = function () {
        console.log('Loading Model complete');
      };

      manager.onProgress = function (item, loaded, total) {
        const percentComplete = (loaded / total) * 100;
        // console.log('Model load percent：', percentComplete);
      };

      manager.onError = function (url) {
        console.error('Model load error:', url);
      };
      return manager;
    },
    // 加载成功模型
    loadModelSuccess(modelNode) {
      console.log('model node', modelNode);

      scene.add(modelNode);

      // 根据模型的尺寸设置相机位置
      const box = new THREE.Box3().setFromObject(modelNode);
      const boxSize = box.getSize(new THREE.Vector3());
      const boxSizeLength = boxSize.length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      this.actvieModelSize.boxSize = boxSize;
      this.actvieModelSize.boxCenter = boxCenter;
      this.actvieModelSize.boxSizeLength = boxSizeLength;

      // 设置加载模型的名称
      modelNode.name = 'mainModel';

      this.activeModel = modelNode;

      // 设置相机
      this.setCamera();
    },

    loadModelProcess(xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        // console.log(`${Math.round(percentComplete, 2)}% downloaded`);
      }
    },
    loadModelError(err) {
      console.error('load model error.', err);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
a {
  color: #409eff;
}
.button-container {
  position: absolute;
  margin: auto;
  width: 100vw;
  display: flex;
  justify-content: center;
  color: #fff;
  align-items: center;
}
.button-container > * {
  margin: 10px;
  font-size: 20px;
  background-color: #409eff;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.footer {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 20px 0 0;
  width: 100vw;
  height: 30px;
  color: white;
  text-align: right;
}
</style>
