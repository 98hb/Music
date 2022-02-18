<template>
  <div>
    <!-- 二级页面 -->
    <van-search
      @input="inputFn"
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
    />
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
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
// 1. 准备搜索界面标签
// 2. api/Search.js - 定义热门搜索接口方法和搜索结果方法
// 3. api/index.js - 导入使用并统一导出
// 4. created中请求接口-拿到热搜关键词列表
// 5. 点击热词填充到输入框
// 6.   搜索结果显示区域标签+样式(直接复制/vant文档找)
// 7.   点击 - 获取搜索结果 - 循环铺设页面
// 8.   互斥显示, 热搜关键词和搜索结果列表
// 9.   点击文字填充到输入框, 请求搜索结果铺设
// 10.  绑定@input事件在van-search上
// 11.  实现输入框改变 - 获取搜索结果铺设
// 12.  监测输入框改变-保存新的关键词去请求结果回来铺设
// 13.  观察接口文档: 发现需要传入offset和分页公式
// 14.  van-list组件监测触底执行onload事件
// 15.  配合后台接口, 传递下一页的标识
// 16.  拿到下一页数据后追加到当前数组末尾即可
// 17.  list组件负责UI层监测触底, 执行onload函数, page++,
// 请求下页数据, 和现在数据合并显示更多, 设置loading为false,
// 确保下次触底还能执行onLoad
// 18.  如果只有一页数据/无数据判断
// 19.  无数据/只有一页数据, finished为true
// 20.  防止list组件触底再加载更多
// 21.  还要测试-按钮点击/输入框有数据情况的加载更多
// 22.  在3个函数 上和下, 设置finished还未完成, 最后要把loading改成false,
// 23.  判断songs字段, 对这里的值要非常熟悉才可以
// 输入框输入"asdfghjkl"
// 24.  接着快速的删除
// 25.	每次改变-马上发送网络请求
// 26.	网络请求异步耗时 – 数据回来后还是铺设到页面上
// 27.  解决:
// 28.	引入防抖功能
// 29.  降低函数执行频率

import { hotSearchAPI, keySearchAPI } from "@/api";
import SongItem from "@/components/SongItem";
// import { keySearchAPI } from "@/api";
export default {
  data() {
    return {
      value: "",
      hotArr: [], //热搜关键字
      resultList: [], //搜索结果
      loading: false, //加载中(状态)-只有为false,才能触底后自动触发onload方法
      finished: false, //未加载全部(如果设置为true,底部就不会再次执行onload,代表全部加载完成)
      page: 1, //当前搜索结果的页码
      timer: null, //输入框-防抖定时器
    };
  },
  async created() {
    const res = await hotSearchAPI();
    console.log(res);
    this.hotArr = res.data.result.hots;
  },
  methods: {
    async getListFn() {
      return await keySearchAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, //固定公式
      });
    },
    async musicFn(xc) {
      // 点击热搜关键词
      this.page = 1; //点击重新获取第一页数据
      this.finished = false; //点击新关键词-可能有新的数据
      this.value = xc; //点击每个搜索关键词的value值 等于 点击事件形参传的值(这里传参,上面接收参数)
      const res = await this.getListFn();
      console.log(res);
      this.resultList = res.data.result.songs;
      this.loading = false;
    },
    async inputFn() {
      this.page = 1;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        //输入框值改变
        this.finished = false; //输入框改变-可能有新的数据
        if (this.value.length === 0) {
          this.resultList = [];
          return;
        }
        const res = await this.getListFn();
        console.log(res);
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs;
        this.loading = false;
      }, 900);
    },
    async onLoad() {
      //触底事件(要加载下一页的数据),内部会自动把loading改为true
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        this.finished = true; //只要设置true,list再次触发都不会执行onLoad函数
        // (显示"没有更多数据")
        this.loading = false; //加载完成
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false; //数据加载完毕-保证下一次还能触发onload
    },
  },
  components: {
    SongItem,
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