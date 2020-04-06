<template>
  <div class="searchWeb">
    <van-row type="flex" justify="space-around" align="center">
      <van-col span="3" @click="returnPrevious">
        <van-nav-bar left-arrow />
      </van-col>
      <van-col span="17">
        <form action="/">
          <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @search="onSearch" @clear="onCancel" @input="InputTrigger" />
        </form>
      </van-col>
      <van-col span="4">
        <van-button round type="danger" size="small" @click="searchBtnFunction">搜索</van-button>
      </van-col>
    </van-row>
    <van-divider />
    <!-- 热搜关键词 -->
    <div class="hotTitle">
      <h1 class="hotLeft">热搜关键词</h1>
      <h1 class="hotRight" @click="isFlagFunction" v-text="isFlag ? '隐藏' : '显示'"></h1>
    </div>
    <van-row class="tagHot" v-if="isFlag ? true : false">
      <van-row>
        <van-col span="8" v-for="(item, index) in hotWord" :key="index">
          <van-tag type="primary" plain v-if="item.title ? true : false">{{ item.title }}</van-tag>
        </van-col>
      </van-row>
    </van-row>
    <div class="searchFindText" v-if="isFlag ? false : true">
      已隐藏搜索发现
    </div>
    <!-- 遮罩层显示区域 searchInputFlag是双向绑定数据-->
    <van-overlay :show="searchInputFlag">
      <div class="wrapper" @click.stop>
        <div class="block">
          <!-- 遮罩层显示区域 -->
          <van-cell-group>
            <van-cell v-for="(item, index) in searchDataList" :key="index">
              <template #title>
                <span :attrid="item.attrid">{{ item.title }}</span>
              </template>
              <template #default>
                <van-row>
                  <van-col span="8" v-for="(ite, ind) in item.param" :key="ind">
                    <van-tag plain type="primary" color="#fff" text-color="#FOF2F5" :pid="ite.pid">{{ ite.title }}</van-tag>
                  </van-col>
                </van-row>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  created() {
    //获取热搜关键词语
    this.getHotWords();
  },
  data() {
    return {
      value: '',
      hotWord: [],
      isFlag: true,
      //遮罩层显示区
      searchInputFlag: false,
      //搜索数据实时返回的列表数据
      searchDataList: [],
    };
  },
  methods: {
    //获取热搜关键词
    async getHotWords() {
      const { data: res } = await this.$axios.get('/public/hotwords?token=1ec949a15fb709370f');
      console.log(res.data);
      //赋值
      this.hotWord = res.data;
    },
    //搜索方法对其返回数据
    async onSearch() {
      let { data: res } = await this.$axios.get(`/goods/param?kwords=${this.value}&token=1ec949a15fb709370f`);
      console.log(res.data);
      //赋值
      this.searchDataList = res.data;
    },
    onCancel() {
      //跳转到详情搜索页
      this.$router.push({ name: 'searchinfo' });
      //点击取消使得遮罩层隐藏
      this.searchInputFlag = false;
    },
    //返回上级菜单
    returnPrevious() {
      window.history.go(-1); //返回上一页
    },
    //显示隐藏
    isFlagFunction() {
      this.isFlag = !this.isFlag;
    },
    //输入触发函数
    InputTrigger() {
      this.searchInputFlag = true;
      // 双向数据绑定实时的输入数据返回的值
      this.onSearch();
    },
    //单击搜索数据
    searchBtnFunction() {
      this.$router.push({name:"searchinfo",query:{searchVal:this.value}})
    },
  },
};
</script>
<style lang="less" scoped>
.searchWeb {
  background-color: white;
  .van-row {
    height: 44px;
  }
  .hotTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .hotLeft {
      font-size: 15px;
      line-height: 15px;
      color: #232326;
      padding-left: 13px;
    }
    .hotRight {
      font-size: 15px;
      line-height: 15px;
      color: #999;
      padding-right: 13px;
    }
  }
  .tagHot {
    width: 100%;
    margin-bottom: 0;
    padding-left: 13px;
    margin-top: 15px;
    .van-tag {
      margin-bottom: 10px;
    }
  }
  .searchFindText {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #999;
  }
  /* 遮罩层设置区域 */
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 100%;
    height: 100%;
    color: black;
  }
  .van-overlay {
    margin-top: 44px;
    background-color: white;
  }
}
</style>
