<template>
  <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username', user.username, '昵称')"/>
  <van-cell title="性别" is-link :value="user.gender === 1 ? '女' : '男'" @click="toEdit('gender', (user.gender === 1 ? '女' : '男'), '性别')"/>
  <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone', user.phone, '电话')"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email', user.email, '邮箱')"/>
  <van-cell title="注册时间" :value="user.createTime"/>
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
  const toEdit = (editKey: string, currentValue: string, editName: string) => {
    router.push({
      path: '/user/edit',
      query: {
        editKey,
        currentValue,
        editName
      }
    })
  }
</script>

<style scoped>
  .loginOut /deep/ .van-cell__value{
    color: var(--van-button-default-color) !important;
    text-align: left;
  }
</style>