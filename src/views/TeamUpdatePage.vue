<template>
  <div id="teamAddPage">
    <van-form>
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />

        <van-field
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime.length === 0 ? '点击选择过期时间' : addTeamData.expireTime"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              v-model="addTeamData.expireTime"
              @confirm="showPicker = false"
              @cancel="cancel"
              title="请选择过期时间"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" @click="onSubmit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../myUtils/myAxios";
import {showToast} from "vant";

const router = useRouter();
const route = useRoute();

// 展示日期选择器
const showPicker = ref(false);

const minDate = new Date();

const id = route.query.id;

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": [],
  "maxNum": 0,
  "status": 0,
  "password": ""
}
// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})

// 获取之前的队伍信息
onMounted(async () => {
  if (id <= 0) {
    showToast('加载队伍失败');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
    addTeamData.value.expireTime = res.data.expireTime.split('-')
    addTeamData.value.status = Number(addTeamData.value.status)
  } else {
    showToast('加载队伍失败，请刷新重试');
  }}
)

// 提交
const onSubmit = async () => {
  let strExpireTime = ""
  let dateLength = addTeamData.value.expireTime.length
  for (let i = 0; i <  dateLength - 1; i++) {
    strExpireTime = strExpireTime + addTeamData.value.expireTime[i] + "-";
  }
  strExpireTime = strExpireTime + addTeamData.value.expireTime[dateLength-1];
  const postData = {
    ...addTeamData.value,
    expireTime: strExpireTime,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data){
    showToast('更新成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showToast('更新失败');
  }
}

const cancel = () => {
  showPicker.value = false
}

</script>

<style scoped>
#teamPage {

}
</style>
