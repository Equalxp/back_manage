<template>
  <!-- svg图标外层容器节点 内部与use使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href 是用哪一个图标 -->
    <!-- fill 设置颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接收父组件传递的参数
defineProps({
  // xlink:href的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //提供使用的图标名字
  name: String,
  //父组件传的颜色
  color: {
    type: String,
    default: ''
  },
  //父组件传来的图标的宽度
  width: {
    type: String,
    default: '16px'
  },
  //父组件传来的图标的高度
  height: {
    type: String,
    default: '16px'
  }
})

</script>

<style scoped></style>