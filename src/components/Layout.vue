

<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  props:['classPrefix'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content{
  overflow: auto;
  flex-grow: 1;
}
</style>