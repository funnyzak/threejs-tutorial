<template>
  <div class="home">
    {{ page.title }}
    <ul>
      <li v-for="route in $router.getRoutes()" :key="route.name">
        <router-link :to="{ name: route.name }">{{ route.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const page = reactive({ title: 'ThreeJS Toturial' });
    return {
      page
    };
  },
  data() {
    return {};
  },
  computed: {}
};
</script>
