<template>
  <div>
    <!-- <p>我是Layout</p> -->
    <!-- 头部导航 -->
    <van-nav-bar title="NavBar" />
    <!-- 一级页面 添加二级页面路由挂载点 -->
    <router-view></router-view>
    <van-tabbar v-model="active" route>
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
      active: 0,
    };
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