<!--这个文件用来放抽布局,即所需要的页面都引用-->
<template>
  <van-nav-bar
      :title= "title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right v-if="showSearch">
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>
<!--  <router-link to="/">gotuhome</router-link>
  <router-link to="/team">team</router-link>-->
<!--  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>-->
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" name="index">
      <router-link to="/">主页</router-link>
    </van-tabbar-item>
    <van-tabbar-item icon="search" name="team">
      <router-link to="/team">队伍</router-link>
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user">
      <router-link to="/user">个人</router-link>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
  import { ref } from 'vue';
  import router from "../router/router";
  import routes from "../router/router";
  const active = ref('index');
  const defaultTitle = "伙伴匹配"
  const title = ref(defaultTitle)
  const showSearch = ref(true)

  router.beforeEach((to, from) =>{
    const toPath = to.path;
    let route = defaultTitle
    const routeT = routes.options.routes
    if (toPath === '/')
    {
      showSearch.value = true
    }else{
      showSearch.value = false
    }
    for (let i = 0; i < routeT.length; i++) {
      if (toPath === routeT[i].path){
        route = routeT[i].title;
      }
    }
    title.value = route
  })

  const onClickLeft = () => {
    router.back();
  };
  const onClickRight = () => {
    router.push('/search')
  };
  //点击某个name,就会触发切换事件,然后更改active当前激活的
  //tab的值
  //toast也是vite的一个组件,可以触发一个比较清亮的提示的
  // const onChange = () => Toast(`标签 ${active}`);
</script>

<style scoped>

</style>