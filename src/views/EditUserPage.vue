<template>
  <van-form >
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" @click="onSubmit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../myUtils/myAxios";
import router from "../router/router";
import {showToast} from "vant";

const route = useRoute()

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName
})

const onSubmit = async () => {
  console.log(editUser.value.currentValue)
  if (editUser.value.editKey === 'gender'){
    console.log(editUser.value.currentValue === '女' ? 1 : 0)
  }
  const isUpdate = await myAxios.post('user/update',{
    id: 1,
    [editUser.value.editKey]: editUser.value.currentValue === '女' ? 1 : 0
  })
      .then(response => {
        return response?.data
      })
      .catch(function (error) {
        showToast("请求失败")
      })
  if(isUpdate === 1){
    showToast("修改成功")
  }else {
    showToast("修改失败")
  }
  router.push({
    path:"/user",
    replace:true,
  });
};

</script>

<style scoped>

</style>