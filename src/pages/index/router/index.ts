import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TutorialIndex from '../views/tutorial/index.vue';
import TutorialHello from '../views/tutorial/Hello.vue';
import TutorialDismantling from '../views/tutorial/Dismantling.vue';
import TutorialDismantling2 from '../views/tutorial/Dismantling2.vue';
import TutorialDimension from '../views/tutorial/Dimension.vue';
import TutorialCalcArea from '../views/tutorial/CalcArea.vue';
import TutorialCalcAngle from '../views/tutorial/CalcAngle.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tutorial',
    name: 'Tutoria',
    component: TutorialIndex,
    redirect: '/tutorial/hello',
    children: [
      {
        path: 'hello',
        name: '正方体',
        component: TutorialHello
      },
      {
        path: 'dismantling',
        name: '固定模型拆分效果',
        component: TutorialDismantling
      },
      {
        path: 'dismantling2',
        name: '动态模型拆分效果',
        component: TutorialDismantling2
      },
      {
        path: 'dimension',
        name: '展示模型尺寸',
        component: TutorialDimension
      },
      {
        path: 'calcarea',
        name: '面积测量',
        component: TutorialCalcArea
      },
      {
        path: 'calcangle',
        name: '角度测量',
        component: TutorialCalcAngle
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
