<template>
  <div>
    <!-- 二级路由 -->
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in reList" :key="obj.id"
        ><van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// 目标: 铺设推荐歌单
// 1. 布局采用van-row和van-col
// 2. 使用vant内置的图片组件来显示图片
// 3. 在main.js注册使用的组件
// 4.在api/index.js下定义推荐歌单的接口方法
// 5.把数据请求回来, 用van-image和p标签展示推荐歌单和歌单名字
import { recommendMusicAPI } from "@/api";
export default {
  data() {
    return {
      reList: [], //推荐歌单数据
    };
  },
  async created() {
    const res = await recommendMusicAPI({
      limit: 6,
    });
    console.log(res);
    this.reList = res.data.result;
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>