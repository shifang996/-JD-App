<template>
  <div>
    <van-nav-bar title="我的京东" left-arrow />
    <van-row>
      <van-col :span="8"><van-image round width="60px" height="60px" src="https://img.yzcdn.cn/vant/cat.jpeg"/></van-col>
      <van-col :span="8"> </van-col>
      <van-col :span="8">span:8</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.van-row {
  height: 134px;
  background: linear-gradient(to right, #eb3d3c, #f4574a, #fd6f56);
}
</style>
