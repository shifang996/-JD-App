<template>
  <div style="background-color: white;">
    <!-- 引入搜索系统classify页面 -->
    <classify-header></classify-header>
    <van-tabs v-model="active">
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </template>
        <template #default>
          {{ value1 }}
        </template>
      </van-tab>
      <van-tab title="销量">销量</van-tab>
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item>
              <template #title>
                有货优先
              </template>
              <template #default>
                <van-checkbox-group v-model="checkResult" ref="checkboxGroup" @change="addSeclect">
                  <van-checkbox v-for="item in option2" :key="item.value" :name="item.value">{{ item.text }}</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-dropdown-item>
          </van-dropdown-menu>
        </template>
        <template #default>
          {{ value2 }}
        </template>
      </van-tab>
      <van-tab title="筛选">筛选</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import classifyHeader from '../components/classifyHeader.vue';
export default {
  components: { classifyHeader },
  data() {
    return {
      //
      active: 0,
      value1: 0,
      option1: [
        { text: '综合', value: 0 },
        { text: '最新上架', value: 1 },
        { text: '价格最低', value: 2 },
        { text: '价格最高', value: 3 },
        { text: '评价最多', value: 4 }
      ],
      checkResult: [],
      value2: 1,
      option2: [
        { text: '211限时达', value: 0 },
        { text: '有货优先', value: 1 },
        { text: '货到付款', value: 2 },
        { text: '京东国际', value: 3 },
        { text: 'PLUS专享', value: 4 },
        { text: '促销全球', value: 5 },
        { text: '配送全球', value: 6 }
      ]
    };
  },
  mounted() {},
  methods: {
    addSeclect() {
      console.log(this.checkResult);
    }
  }
};
</script>
<style lang="less" scoped>
  .van-checkbox-group{
    padding: 10px;
    .van-checkbox{
      margin-bottom: 6px;
    }
  }
</style>
