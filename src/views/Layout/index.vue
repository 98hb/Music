<template>
  <div>
    <!-- <p>我是Layout</p> -->
    <!-- 头部导航 -->
    <van-nav-bar :title="activeTitle" fixed />
    <!-- 一级页面 添加二级页面路由挂载点 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title, //"默认"顶部导航要显示的标题
      // (默认获取当前路由对象里的meta中title值)
    };
  },
  // 路由切换 - 侦听 $route对象改变
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title; //监听且提前切换路由信息对象里的title显示
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>