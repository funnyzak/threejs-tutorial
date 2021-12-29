import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TutorialIndex from '../views/tutorial/index.vue';
import TutorialHello from '../views/tutorial/Hello.vue';
import TutoialDismantling from '../views/tutorial/Dismantling.vue';

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
        name: 'TutorialHello',
        component: TutorialHello
      },
      {
        path: 'dismantling',
        name: 'TutorialDismantling',
        component: TutoialDismantling
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
