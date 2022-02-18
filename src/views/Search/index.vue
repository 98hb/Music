<template>
  <div>
    <!-- 二级页面 -->
    <p>我是搜索页面</p>
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="musicFn(obj.first)"
          >{{ obj.first }}
        </span>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-cell
        center
        v-for="obj in resultList"
        :key="obj.id"
        :title="obj.name"
        :label="obj.ar[0].name + ' - ' + obj.name"
      >
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
// 1. 准备搜索界面标签
// 2. api/Search.js - 定义热门搜索接口方法和搜索结果方法
// 3. api/index.js - 导入使用并统一导出
// 4. created中请求接口-拿到热搜关键词列表
// 5. 点击热词填充到输入框
// 6.搜索结果显示区域标签+样式(直接复制/vant文档找)
// 7.点击 - 获取搜索结果 - 循环铺设页面
// 8.互斥显示, 热搜关键词和搜索结果列表
// 9.点击文字填充到输入框, 请求搜索结果铺设
import { hotSearchAPI, keySearchAPI } from "@/api";
// import { keySearchAPI } from "@/api";
export default {
  data() {
    return {
      value: "",
      hotArr: [], //热搜关键字
      resultList: [], //搜索结果
    };
  },
  async created() {
    const res3 = await hotSearchAPI();
    console.log(res3);
    this.hotArr = res3.data.result.hots;
  },
  methods: {
    async getListFn() {
      return await keySearchAPI({
        keywords: this.value,
        limit: 20,
      });
    },
    async musicFn(xc) {
      this.value = xc; //点击每个搜索关键词的value值 等于 点击事件形参传的值(这里传参,上面接收参数)
      const res4 = await this.getListFn();
      console.log(res4);
      this.resultList = res4.data.result.songs;
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>