<script setup lang="ts">
import OtherIndex from './components/OtherIndex.vue'
definePageMeta({
    layout: 'admin',
    title: '关于我们',
    icon: 'i-ep-monitor',
    sort: 10,
})
</script>

<template>
    <OtherIndex type="about" />
</template>

<style scoped lang="scss"></style>
