<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <van-swipe class="my-swipe" indicator-color="#fc1800" style="height: 360px;">
      <van-swipe-item v-for="(item, index) in detailData.images" :key="index" @click="showBigImgs">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 价格页面区域 -->
    <van-row>
      <van-col span="20" class="detailsPriceRed">
        <span style="padding-left: 4px;">￥</span><span style="font-size: 26px;">{{ detailData.price }}</span>
      </van-col>
      <van-col span="2"></van-col>
      <van-col span="2"></van-col>
    </van-row>
    <!-- 标题区域 -->
    <van-row>
      <van-col :span="20" class="detailsTitle">
        {{ detailData.title }}
      </van-col>
    </van-row>
    <!-- 订单区域 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="nowAddFunction" />
      <van-goods-action-button type="danger" text="立即购买" @click="nowBuyFunction" />
    </van-goods-action>
    <!-- 预览图 -->
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>第{{ index + 1 }}页</template>
    </van-image-preview>
    <!-- 尚品格式选择和提交 -->
    <van-sku v-model="shopshow" :sku="sku" :goods="goods">
      <template> </template>
    </van-sku>
  </div>
</template>

<script>
export default {
  created() {
    // 检测通过gid传来的数据
    // console.log(this.$route.query.gid);
    //通过gid获取详情数据
    this.getDeatilData(this.$route.query.gid);
    //获取更多详细数据**产品详情页面
    this.moreDetailShop(this.$route.query.gid);
    //获取规格
    this.getFull_shopRuler(this.$route.query.gid);
    //获取评价
    this.getProduct_Review(this.$route.query.gid);
  },
  components: {},
  data() {
    return {
      detailData: [],
      show: false,
      shopshow: false,
      index: 0,
      images: [],
      productSpec: [], //商品规格
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色' // skuValueName：规格值名称
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false // 是否无规格商品
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      }
    };
  },
  methods: {
    //通过传值直接调用数值，获取相关的详情数据
    async getDeatilData(idds) {
      let { data: res } = await this.$axios.get(`/goods/info?gid=${idds}&type=details&token=1ec949a15fb709370f`);
      console.log('从第一页跳转的数据数据', res.data);
      this.detailData = res.data;
      this.images = res.data.images;
    },
    //返回按钮
    onClickLeft() {
      //返回上级浏览
      history.go(-1);
    },
    //图片预览组件
    onChange(index) {
      this.index = index;
    },
    //图片显示预览组件的开关
    showBigImgs() {
      this.show = true;
    },
    //获取更多细节**产品详情页面
    async moreDetailShop(idds) {
      console.log(idds);
      const { data: res } = await this.$axios.get(`/goods/info?gid=${idds}&type=details&token=1ec949a15fb709370f`);
      console.log('产品详情', res.data);
    },
    //获取商品规格
    async getFull_shopRuler(idds) {
      const { data: res } = await this.$axios.get(`/goods/info?gid=${idds}&type=spec&token=1ec949a15fb709370f`);
      console.log('商品规格', res.data);
      const result = res.data;
      this.sku.tree[0].v.name = result[0].title;
      this.sku.tree[0].v.name = result[0].attrid;
      //异步调用资源数据
      this.handle_Data(result);
    },
    //处理异步数据资源
    handle_Data(resources) {
      console.log('******', resources);
      const listObj = resources;
      console.log(listObj);
    },
    //获取商品评价
    async getProduct_Review(idds) {
      const { data: res } = await this.$axios.get(`/reviews/index?gid=${idds}&token=1ec949a15fb709370f&page=1`);
      console.log('商品评价', res.data);
    },
    //点击购买
    nowBuyFunction() {
      this.shopshow = true;
    },
    //加入购物车
    nowAddFunction() {
      this.shopshow = true;
    }
  }
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.van-swipe-item {
  img {
    width: 95%;
    height: 95%;
  }
}
.detailsPriceRed {
  color: red;
  font-size: 16px;
}
.detailsTitle {
  width: 100%;
  height: 94px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}
</style>
