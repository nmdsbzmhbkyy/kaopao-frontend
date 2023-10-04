<template>

  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public" />
    <van-tab title="加密" name="private" />
  </van-tabs>

  <div style="margin-bottom: 16px" />

  <team-list-card :teamList="teamList" />

  <!-- 浮动按钮 -->
  <van-button id="add-bytton" type="primary" :icon="icon" @click="showBubbles"/>
  <div v-if="showBubble" >
    <van-button class="bubbles1" @click="toAddTeam" icon="friends-o" />
    <van-button class="bubbles2" icon="service" />
  </div>
  <van-empty v-if="teamList?.length < 1" description="数据为空"/>

</template>

<script setup>
  import {onMounted, ref} from "vue";
  import router from "../router/router";
  import myAxios from "../myUtils/myAxios";
  import TeamListCard from "../components/TeamListCard.vue";
  import {showToast} from "vant";


  const active = ref('public')
  const searchText = ref("")
  const showBubble = ref(false);
  const icon = ref("plus")
  const teamList = ref([])


  const showBubbles = () => {
    icon.value = icon.value === "plus" ? "cross" : "plus"
    showBubble.value = showBubble.value !== true
  }

  const toAddTeam = () => {
    router.push(
        {
          path: '/team/add'
        }
    )
  }

  /**
   * 搜索队伍
   * @param val
   * @param status
   * @returns {Promise<void>}
   */
  const listTeam = async (val = '', status = 0) => {
    const res = await myAxios.get("/team/list", {
      params: {
        searchText: val,
        pageNum: 1,
        status,
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
    if (active.value === 'public'){
      listTeam(val,0);
    }else {
      listTeam(val,2);
    }
  };

  /**
   * 切换查询状态
   * @param name
   */
  const onTabChange = (name) => {
    // 查公开
    if (name === 'public') {
      listTeam(searchText.value, 0);
    } else {
      // 查加密
      listTeam(searchText.value, 2);
    }
  }

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