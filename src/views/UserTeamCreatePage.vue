<template>

  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
  <team-list-card :teamList="teamList" />

  <!-- 浮动按钮 -->
  <van-button id="add-bytton" type="primary" :icon="icon" @click="showBubbles"/>
  <div v-if="showBubble" >
    <van-button class="bubbles1" @click="toAddTeam" icon="friends-o" />
    <van-button class="bubbles2" icon="service" />
  </div>
  <van-empty v-if="teamList?.length < 1" description="数据为空"/>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamListCard from "../components/TeamListCard.vue";
import {onMounted, ref} from "vue";
import myAxios from "../myUtils/myAxios";
import {showToast} from "vant";

const router = useRouter();
const searchText = ref('');
const showBubble = ref(false);
const icon = ref("plus")
const showBubbles = () => {
  icon.value = icon.value === "plus" ? "cross" : "plus"
  showBubble.value = showBubble.value !== true
}
// 跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}
const toAddTeam = () => {
  router.push(
      {
        path: '/team/add'
      }
  )
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast('加载队伍失败，请刷新重试');
  }
}


// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>
#add-bytton {
  position: fixed;
  bottom: 10%;
  width: 50px;
  height: 50px;
  right: 12px;
  border-radius: 50%;
  z-index: 1;
}
.bubbles1{
  position: fixed;
  bottom: 20%;
  width: 45px;
  height: 45px;
  right: 14.5px;
  border-radius: 50%;
  z-index: 1;
}
.bubbles2{
  position: fixed;
  bottom: 30%;
  width: 45px;
  height: 45px;
  right: 14.5px;
  border-radius: 50%;
  z-index: 1;
}
</style>
