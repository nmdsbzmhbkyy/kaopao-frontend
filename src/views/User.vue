<template>
  <div v-if="user.id">
    <van-cell title="头像">
      <img :src="user.avatarUrl" alt="" style="height: 46px">
    </van-cell>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="已创建队伍" is-link to="/user/team/create"/>
    <van-cell title="已加入队伍" is-link to="/user/team/join"/>
    <van-cell-group class="loginOut">
      <van-cell title="退出" style="text-align: right;" value="登录" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAxios from "../myUtils/myAxios";
import router from "../router/router";

const user = ref({})

onMounted(async () => {
  const tempUser = await myAxios.get('user/current',{}).then(response => {
     return response?.data
  })
  if(tempUser){
    user.value = tempUser
  }else {
    router.replace("/user/login")
  }
})

const logout = async () => {
  await myAxios.post('user/logout',{}).then(repost =>{
    console.log(repost);
  })
  router.replace("/user/login")
}

</script>

<style scoped>
  .loginOut /deep/ .van-cell__value{
    color: var(--van-button-default-color) !important;
    text-align: left;
  }
</style>