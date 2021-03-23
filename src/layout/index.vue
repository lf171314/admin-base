<template>
  <a-layout class="admin-layout_wrapper">
    <a-layout-sider class="amin-layout_sider" breakpoint="lg" width="220px">
      <nav-menu></nav-menu>
    </a-layout-sider>
    <a-layout class="admin-layout_container">
      <a-layout-header class="admin-layout_header">
        <a-dropdown class="float-right">
          <a class="ant-dropdown-link">
            admin
            <a-icon type="down"></a-icon>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>退出</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <view-main></view-main>
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
