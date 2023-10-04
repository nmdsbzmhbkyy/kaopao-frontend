<template>
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账户名"
          label="账户名"
          placeholder="请输入账户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" @click="onSubmit">
        提交
      </van-button>
    </div>
</template>

<script setup>

import {showToast} from "vant";
import {ref} from "vue";
import myAxios from "../myUtils/myAxios";
import {useRoute} from "vue-router";

const route = useRoute()
const userAccount = ref();
const userPassword = ref();

const onSubmit = async () => {
  console.log("用户登录");
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
      .catch(function (error) {
        showToast("请求失败")
      })
  if (res?.code === 0 && res?.data != null) {
    showToast("登录成功");
    // router.replace("/user")
    window.location.href = route.query?.redirect  ?? "/"
  } else {
    showToast("登录失败");
  }
};

</script>

<style scoped>

</style>