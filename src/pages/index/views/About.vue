<template>
  <div class="about">
    <h1>This is an about page. {{ aboutText }}</h1>
  </div>
</template>

<script lang="javascript">
export default {
  data: () => {
    return {
      aboutText: "i'm eric"
    };
  }
};
</script>
