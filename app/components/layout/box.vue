<script lang="ts" setup>
const { isCurrentFullscreen } = useThemeState()

const minHeight = computed(() => {
    // 头部高度 50px + 标签页高度 40px + 内容区padding高度 40px
    let header = 50 + 40
    if (isCurrentFullscreen.value) header = 0
    const hei = header + 40
    return `${hei}px`
})
</script>

<template>
    <div class="main-box b-1px b-rounded-4px bg-#fff p20px">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.main-box {
    min-height: calc(100vh - v-bind(minHeight));

    &.hei {
        height: calc(100vh - v-bind(minHeight));
    }
}
</style>
