<template>
  <div :class="{}" class="app-wrapper">
    <div class="sidebar">
      <p>左侧导航栏</p>
    </div>
    
    <div class="main-container">
      <div class="top">
        <p>顶部导航</p>
        <p>tag-view等</p>
      </div>

      <!-- single page -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain } from './components'
export default {
  name: 'Layout',
  components: { AppMain }
}
</script>