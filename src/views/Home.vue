<template>
  <div>
    <head-search-com></head-search-com>
    <swiper-com></swiper-com>
    <grid-nav-com></grid-nav-com>
    <recommend-com></recommend-com>
  </div>
</template>

<script>
//引入头部组件
import headSearchCom from '../components/Head_search.vue';
//轮播图组件
import swiperCom from '../components/swiper.vue';
//宫格导航
import gridNavCom from '../components/gridNav';
//为你推荐组件
import recommendCom from '../components/recommend';
export default {
  components: {
    headSearchCom,
    swiperCom,
    gridNavCom,
    recommendCom,
  },
  data() {
    return {};
  }
};
</script>
<style></style>
