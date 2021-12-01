import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TutorialHello from '../views/tutorial/Hello.vue';
import TutoialSplit from '../views/tutorial/Split.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tutorial',
    name: '案例',
    redirect: '/tutorial/hello',
    children: [
      {
        path: '/hello',
        name: 'TutorialHello',
        component: TutorialHello
      },
      {
        path: '/split',
        name: 'TutorialSplit',
        component: TutoialSplit
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
