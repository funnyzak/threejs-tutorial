import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TutorialIndex from '../views/tutorial/index.vue';
import TutorialHello from '../views/tutorial/Hello.vue';
import TutoialDismantling from '../views/tutorial/Dismantling.vue';
import TutoialDismantling2 from '../views/tutorial/Dismantling2.vue';

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
        component: TutoialDismantling
      },
      {
        path: 'dismantling2',
        name: '动态模型拆分效果',
        component: TutoialDismantling2
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
