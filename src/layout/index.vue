<template>
  <a-layout class="admin-layout_wrapper">
    <a-layout-sider class="admin-layout_sider" breakpoint="lg" width="256px">
      <router-link class="admin-layout_logo" to="/">Home</router-link>
      <a-menu mode="inline" class="admin-layout_menu" theme="dark">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="mail" />
            <span>Navigation One</span>
          </span>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="appstore" />
            <span>Navigation Two</span>
          </span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
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
export default {
  name: 'layout-default',
  data() {
    return {}
  }
}
</script>
