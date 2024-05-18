<script lang="ts" setup>
import { defineComponent } from 'vue'

const minHeight = computed(() => {
    // 头部高度 40px + 标签页高度 40px + 内容区padding高度 40px
    const hei = 50 + 40  +40
    return `${hei}px`
})
</script>

<template>
    <div class="main-box b-1px b-rounded-4px bg-#fff p20px">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.main-box{
    min-height:calc(100vh - v-bind(minHeight));
    &.hei{
        height:calc(100vh - v-bind(minHeight));
    }
}
</style>
