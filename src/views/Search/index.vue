<template>
  <div>
    <!-- 二级页面 -->
    <p>我是搜索页面</p>
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <!-- 搜索下容器 -->
    <div class="search_wrap">
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
  </div>
</template>

<script>
// 1. 准备搜索界面标签
// 2. api/Search.js - 定义热门搜索接口方法和搜索结果方法
// 3. api/index.js - 导入使用并统一导出
// 4. created中请求接口-拿到热搜关键词列表
// 5. 点击热词填充到输入框
import { hotSearchAPI } from "@/api";
export default {
  data() {
    return {
      value: "",
      hotArr: [], //热搜关键字
    };
  },
  methods: {
    musicFn(xc) {
      this.value = xc; //点击每个搜索关键词的value值 等于 点击事件形参传的值(这里传参,上面接收参数)
    },
  },
  async created() {
    const res3 = await hotSearchAPI();
    console.log(res3);
    this.hotArr = res3.data.result.hots;
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
</style>