<template>
  <div>
    <div class="button-container">
      <button @click="meshToggle">{{ openMove ? '关闭分体扩散' : '开启分体扩散' }}</button>
      <div v-if="openMove" style="display: flex">
        <input
          type="range"
          style="width: 600px"
          min="0"
          max="5"
          step="0.05"
          v-model="moveMultiplier" />
        <div style="width: 120px; margin-left: 15px">乘积：{{ moveMultiplier }}</div>
      </div>
    </div>
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
 * Created by leon<silenceace@gmail.com> on 22/06/15.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const modelInfo = {
  name: 'motorcycle',
  res: {
    obj: 'model/motorcycle/motorcycle.obj',
    mtl: 'model/motorcycle/motorcycle.mtl'
  }
};

let scene;

export default {
  data() {
    return {
      // 开启分体扩散
      openMove: false,
      // 移动位置向量乘积
      moveMultiplier: 0,

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
      }
    };
  },
  computed: {},
  mounted() {
    window.onresize = this.onWindowResize;

    this.container = this.$refs.container;

    this.rendererCanvas();
    this.loadModel(modelInfo);
  },
  unmounted() {
    window.onresize = null;
  },
  methods: {
    objMove(obj, to) {
      obj.position.set(to.x, to.y, to.z);
    },
    meshToggle() {
      if (this.openMove) {
        this.moveMultiplier = 0;
        this.recovery();
      }
      this.openMove = !this.openMove;
    },
    // 分体展开
    dismantling() {
      this.activeModel.traverse((e) => {
        if (e.isMesh) {
          this.objMove(e, e.toPosition);
        }
      });
      console.log('dismantling done.');
    },
    // 分体恢复
    recovery() {
      this.activeModel.traverse((e) => {
        if (e.isMesh) {
          this.objMove(e, e.originPosition);
        }
      });
      console.log('recovery done.');
    },
    onWindowResize() {
      this.camera.aspect = this.container.offsetWidt / this.container.offsetHeight; // 重新设置宽高比
      this.camera.updateProjectionMatrix(); // 更新相机
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
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

      const modelNodeHelp = new THREE.BoxHelper(modelNode, 0xffff00);

      scene.add(modelNodeHelp);
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

      this.setModelMovePosition(modelNode);

      // 设置相机
      this.setCamera();
    },
    setModelMovePosition(modelNode) {
      if (this.meshExpand) {
        this.recovery();
      }

      const isFirstLoad = !this.actvieModelSize.box;
      if (isFirstLoad) {
        this.actvieModelSize.box = new THREE.Box3().setFromObject(modelNode);
        this.actvieModelSize.boxCenter = this.actvieModelSize.box.getCenter(new THREE.Vector3());
      }

      // 模型变换
      modelNode.traverse((item) => {
        if (item instanceof THREE.Mesh) {
          // 设置所有的 Mesh 实例属性 接收阴影等等
          item.castShadow = true;
          item.receiveShadow = true;

          if (isFirstLoad) {
            item.meshBox = new THREE.Box3().setFromObject(item);
            item.meshCenter = item.meshBox.getCenter(new THREE.Vector3());

            // 定义mesh初始位置

            item.originPosition = item.position.clone();
            console.log('set item originPosition', item.originPosition);

            // 包围盒和MESH中心点线段
            item.centerLine3 = new THREE.Line3(this.actvieModelSize.boxCenter, item.meshCenter);

            item.centerLine3Delta = new THREE.Vector3();
            // 求线段向量
            item.centerLine3.delta(item.centerLine3Delta);
            item.centerLine3DeltaClone = item.centerLine3Delta.clone();

            // 求线段长度
            item.centerLine3Distance = item.centerLine3.distance();

            console.log(
              'centerLine3：Delta=>',
              item.centerLine3Delta,
              '、Distance=>',
              item.centerLine3Distance
            );
          }

          // item.toPosition = item.originPosition.clone().add(centerLine3Delta);
          // 目标位置向量=线段终点位置+线段向量乘积
          item.toPosition = item.originPosition
            .clone()
            .addScaledVector(item.centerLine3DeltaClone, this.moveMultiplier);
        }
      });
    },
    // 加载模型进程
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
  watch: {
    moveMultiplier(val) {
      this.setModelMovePosition(this.activeModel);
      this.dismantling();
    }
  }
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
