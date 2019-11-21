<template>
  <div class="home-page">
    <div class="home-sky">
      <sky></sky>
    </div>
    <div class="home-content">
      <div class="home-wrap">

      </div>
    </div>
  </div>
</template>

<script>
import sky from '@/components/sky/index.vue'
export default {
  props: {
  },
  data() {
    return {
    }
  },
  components: {
    sky
  },
  mounted() {
  },
  methods: {
  },
  beforeDestory() {
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-page {
    height: 100%;
    position: relative;
  }
  &-sky {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  &-content {
    height: 100%;
    width: 100%;
    padding: 200px 150px 100px;
  }
  &-wrap {
    height: 700px;
    width: 100%;
    background-color: rgba(98, 98, 102, .3);
    border-radius: 5px;
  }
}
</style>
