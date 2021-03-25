<template>
  <a-layout class="admin-layout_wrapper">
    <a-layout-sider class="admin-layout_sider" breakpoint="lg" width="256px">
      <router-link class="admin-layout_logo" to="/">Home</router-link>
      <nav-menu></nav-menu>
    </a-layout-sider>
    <a-layout class="admin-layout_container">
      <a-layout-header class="admin-layout_header">
        <a-dropdown class="float-right">
          <a class="admin-header_user">
            <a-icon type="user"></a-icon>
            admin
            <a-icon type="down"></a-icon>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-icon type="user"></a-icon>
              个人中心
            </a-menu-item>
            <a-menu-item>
              <a-icon type="logout"></a-icon>
              退出
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="admin-layout_body">
        <keep-alive>
          <router-view class="view-container"></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import * as components from './components'
export default {
  name: 'layout',
  components: {
    ...components
  },
  data() {
    return {}
  }
}
</script>
