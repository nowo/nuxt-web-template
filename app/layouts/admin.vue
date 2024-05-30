<script lang="ts" setup>
const isRouterAlive = ref(true)
const reload = () => {
    isRouterAlive.value = false
    nextTick(() => {
        isRouterAlive.value = true
    })
}
provide('reload', reload)
</script>

<template>
    <el-container class="layout-container h100vh bg-#fafafa">
        <LayoutAreaAside />
        <el-container>
            <!-- <LayoutHeader /> -->
            <el-scrollbar class="w100%">
                <LayoutAreaHeader />
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
</style>
