<template>
  <canvas id="container" ref="container" style="width: 100vw; height: 100vh" />
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const modelInfo = {
  name: '二战军舰',
  res: {
    obj: '/model/batteship/Gem_des_typ_1936.obj',
    mtl: '/model/batteship/Gem_des_typ_1936.mtl'
  }
};

let scene;

export default {
  data() {
    return {
      container: null,
      canvas: null,
      renderer: null,
      camera: null,
      activeModel: null,
      actvieModelSize: {
        boxSize: null,
        boxCenter: null,
        boxSizeLength: null
      }
    };
  },
  computed: {},
  mounted() {
    // this.rendererCanvas();
    // window.onresize = this.onWindowResize;

    this.container = this.$refs.container;

    this.rendererCanvas();
    this.loadModel(modelInfo);
  },
  unmounted() {
    window.onresize = null;
  },
  methods: {
    onWindowResize() {
      // this.camera.aspect = window.innerWidth / window.innerHeight; // 重新设置宽高比
      // this.camera.updateProjectionMatrix(); // 更新相机
      // this.renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染页面大小
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

      this.renderer.render(scene, this.camera);
    },
    // 根据模型尺寸为相机设置合适的位置
    frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
      const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
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

      camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    },
    loadModel(_modelInfo) {
      const mtlManager = this.loadMtlManager();
      const modelManager = this.loadModelManager();

      const mtlLoader = new MTLLoader(mtlManager);
      // .setPath(_modelInfo.res.path)
      mtlLoader.load(_modelInfo.res.mtl, (materials) => {
        materials.preload();

        new OBJLoader(modelManager)
          .setMaterials(materials)
          // .setPath(_modelInfo.res.path)
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
        console.log('Mtl loading percent：', percentComplete);
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
        console.log('Model load percent：', percentComplete);
      };

      manager.onError = function (url) {
        console.error('Model load error:', url);
      };
      return manager;
    },
    // 加载成功模型
    loadModelSuccess(modelNode) {
      // object.position.y = -95;
      // scene.add(object);
      console.log('model node', modelNode);

      // 模型变换

      modelNode.traverse((item) => {
        if (item instanceof THREE.Mesh) {
          // 设置所有的 Mesh 实例属性 接收阴影等等
          item.castShadow = true;
          item.receiveShadow = true;
          const materials = item.material;
          // 判断材质 是否包含漫反射颜色，如果有的话将其设置为白，否则会覆盖之后的纹理贴图
          if (Array.isArray(materials)) {
            for (let i = 0; i < materials.length; i++) {
              materials[i].color.set(0xffffff);
            }
          } else {
            materials.color.set(0xffffff);
          }
          // 定义起 移动为止
          // const r = 0.1
          // item.fromPosition = [
          //   item.position.x,
          //   item.position.y,
          //   item.position.z
          // ]
          // item.toPosition = [
          //   item.position.x + r,
          //   item.position.y + r,
          //   item.position.z + r
          // ]
        }
      });
      // 设置加载模型的名称
      modelNode.name = 'mainModel';

      scene.add(modelNode);
      this.activeModel = modelNode;

      // 根据模型的尺寸设置相机位置
      const box = new THREE.Box3().setFromObject(modelNode);
      const boxSize = box.getSize(new THREE.Vector3());
      const boxSizeLength = boxSize.length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      this.actvieModelSize.boxSize = boxSize;
      this.actvieModelSize.boxCenter = boxCenter;
      this.actvieModelSize.boxSizeLength = boxSizeLength;

      console.log(
        'Model Info:\n\n',
        'box:',
        box,
        '\n\nboxSize:',
        boxSize,
        '\n\nboxSizeLength:',
        boxSizeLength,
        '\n\nboxCenter:',
        boxCenter
      );

      // 加载模型背景

      // 设置相机
      this.setCamera();

      // 初始化光源

      // 初始化控制器
    },
    // 加载模型进程
    loadModelProcess(xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`${Math.round(percentComplete, 2)}% downloaded`);
      }
    },
    loadModelError(err) {
      console.error('load model error.', err);
    }
  }
};
</script>
