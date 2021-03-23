<template>
  <div></div>
</template>

<script>
export default {
  name: 'user-header',
  data() {
    return {
      collapse: true
    }
  },
  computed: {
    iconClass() {
      return this.collspan ? 'menu-fold' : 'menu-unfold'
    }
  },
  methods: {
    switchMenu() {
      this.$emit('change-menu', !this.collapse)
    },
    logout() {}
  }
}
</script>
