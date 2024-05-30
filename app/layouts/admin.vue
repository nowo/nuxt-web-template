<script lang="ts" setup>
const isRouterAlive = ref(true)
const reload = () => {
    isRouterAlive.value = false
    nextTick(() => {
        isRouterAlive.value = true
    })
}
provide('reload', reload)

const { isCurrentFullscreen } = useThemeState()
</script>

<template>
    <el-container class="layout-container h100vh bg-#fafafa">
        <LayoutAreaAside />
        <el-container>
            <!-- <LayoutHeader /> -->
            <el-scrollbar class="w100%">
                <LayoutAreaHeader v-if="!isCurrentFullscreen" />
                <div v-else class="fullscreen-close-btn" @click="isCurrentFullscreen = false">
                    <i class="i-ep-close" />
                </div>
                <el-main v-if="isRouterAlive" class="overflow-unset!">
                    <slot />
                </el-main>
            </el-scrollbar>
        </el-container>
        <!-- <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop> -->
    </el-container>
</template>

<style lang="scss" scoped>
@import url("~/assets/scss/admin.scss");

.fullscreen-close-btn {
    position: fixed;
    z-index: 9999999999;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    clip-path: circle(100% at 100% 0);
    cursor: pointer;
    background: rgba(0, 0, 0, .1);
    transition: all .3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    padding-bottom: 5px;

    &:hover {
        // background: rgba(0, 0, 0, .2);
        color: var(--el-color-primary);
    }
}
</style>
