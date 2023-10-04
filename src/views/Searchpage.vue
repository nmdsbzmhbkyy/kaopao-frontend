<template>
  <!-- 圆角弹窗（右侧） -->
  <van-cell title="筛选标签" is-link @click="showPopup" />
  <van-popup v-model:show="show" round position="right" :style="{ height: '100%', width: '80%' }">
    <van-nav-bar
        title="筛选"
        left-arrow
        @click-left="onClickLeftTag"
    >
    </van-nav-bar>

    <form action="/">
      <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入本页中要选的标签关键词"
          @search="onSearch"
          @cancel="onCancel"
          @update:model-value="onUpdated"
      >
        <template #action>
          <div @click="onCancel"></div>
        </template>
      </van-search>
    </form>

    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        height= 85%
        :items="taglist"
    />
  </van-popup>

  <van-divider content-position="left">已选标签</van-divider>

  <van-row gutter="16" style="padding: 0 16px">
    <!--span="4"-->
    <van-col v-for="tag in activeIds">
      <!--  标签-->
      <van-tag text-color="#18191c" color="#f6f7f8" closeable size="large" type="primary" @close="close(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>

  <div class="searchbutton">
    <van-button v-if="activeIds.length > 0" @click="doSearchResult" type="default" round=true size="small">搜索用户</van-button>
  </div>
  <!--  标签说明-->
  <van-divider content-position="left">热门标签</van-divider>

</template>

<script setup>
import { ref } from 'vue';
import router from "../router/router";

const searchValue = ref('');
const show = ref(false);
//可以自己单独抽象成一个选择器
const activeIds = ref([]);
const activeIndex = ref(0);
const taglist = [
  {
    text: '浙江',
    children: [
      { text: '测试', id: "1" },
      { text: '测试', id: "啊啊宿舍啊啊啊啊啊啊啊" },
      { text: '测试', id: "117" },
      { text: '测试', id: "2" },
      { text: 'python', id: "python" },
      { text: '测试', id: "23" },
      { text: '测试', id: "4" },
      { text: 'java', id: "java" },
      { text: 'vue', id: "vue" },
      { text: '单片机', id: "单片机" },
      { text: '后端', id: "后端" },
      { text: '测试', id: "7" },
      { text: '测试', id: "8" },
      { text: '测试', id: "78" },
      { text: '测试', id: "9" },
      { text: '测试', id: "98" },
      { text: '测试', id: "啊啊啊啊啊啊啊啊啊啊啊"},
      { text: '测试', id: "00", disabled: true },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 },
    ],
  },
  { text: '福建', disabled: true },
];

/**
 * 搜索过滤
 * */
const onSearch = () => {
  const sa = ref({...taglist})
  let tempParentTag = JSON.parse(JSON.stringify(taglist))
  console.log(tempParentTag)
  //不是响应式对象
  for (let i = 0; i < tempParentTag.length - 1; i++) {
    if (tempParentTag[i].children) {
      tempParentTag[i].children = tempParentTag[i].children.filter(item => (item.text === searchValue.value))
      if (tempParentTag[i].children.length === 1) {
        activeIds.value.push(tempParentTag[i].children[0].id);
        let tags =  document.querySelectorAll('.van-tree-select__item')
        console.log(tags)
        tags.forEach(tag => {
          if (tag.innerText === searchValue.value){
            console.log(tag)
            tag.scrollIntoView()
          }
        })
        break;
      }
    }
  }
  //contains用来处理JSON格式那玩意??
};
const onUpdated = () => {
  console.log("onUpdated")
}
const onCancel = () =>{
  searchValue.value =""
};
const showPopup = () => {
  show.value = true;
};
const onClickLeftTag = () => {
  show.value = false;
  console.log(activeIds);
}
const close = (tag) => {
  activeIds.value = activeIds.value.filter(item =>item !== tag)
};
const doSearchResult = () => {
  router.push({
    path: '/search/userByTag',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>
  /*设置搜索按钮位置*/
  .searchbutton{
     padding-left: 80%;
   }
  /*设置分割线左边的线多长*/
  .van-divider--content-left:before {
    max-width: 0;
  }
  /*设置筛选栏的下横线粗细*/
  .van-cell:after {
    border-bottom: 0px solid var(--van-cell-border-color)
  }
  /*设置标签的margin*/
  .van-tag--large {
    margin: 4px;
  }
</style>