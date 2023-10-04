<template>
  <van-empty v-if="userList.length === 0" description="无搜索结果" />
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" @click="watchEffect"/>
    </template>
  </van-cell>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      offset="300"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <div v-for="user in userList">
      <van-card
          :desc="user.profile"
          :title="`${user.username} (${user.id})`"
          :thumb="user.avatarUrl"
      >
        <template #tags>
          <van-tag plain type="danger" v-for="(tag, index) in JSON.parse(user.tags)" :key="index" style="margin-right: 8px; margin-top: 8px" >
            {{tag}}
          </van-tag>
        </template>
        <template #footer>
          <van-button size="mini">联系我</van-button>
        </template>
      </van-card>
      <van-divider :style="{ color: '#ffffff', borderColor: '#ffffff',margin:'2px 0px 0px 0px'}"/>
    </div>
  </van-list>
  <div style="height: 47px;" />

</template>

<script setup>
import {ref} from "vue";
import myAxios from "../myUtils/myAxios";
import {showToast} from "vant";

const isMatchMode = ref(false);

const userList = ref([])
const loading = ref(false);
const finished = ref(false);
let pageNum = 0;

const onLoad = async () => {
  loading.value = true;
  // 异步更新数据
  let users;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    //取10条相关性高的用户
    const num = 10;
    users = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(response => {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showToast('请求失败');
        })
  } else{
    users = await myAxios.get('user/index/random',{
    })
        .then(response => {
          return response?.data
        })
  }
  console.log(users)
  if (users){
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      userList.value.push(user);
    }
    pageNum = pageNum + 20;
    console.log(userList)
  }
  // 加载状态结束
  loading.value = false;

  // 数据全部加载完成
  if (users.length < 20) {
    finished.value = true;
  }
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  // setTimeout(
  // }, 5000);
};

const watchEffect =  () => {
  userList.value = [];
  onLoad();
}


</script>


<style scoped>

</style>