<template>
  <div class="not-found_page">
    <img src="~@/images/404.png" alt="" />
    <router-link to="/">返回首页</router-link>
    <a @click="$router.go(-1)">返回上一页面</a>
  </div>
</template>
