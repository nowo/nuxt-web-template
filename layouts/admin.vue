<template>
    <el-container class="layout-container h100vh bg-#fafafa">
        <LayoutAreaAside />
        <el-container>
            <!-- <LayoutHeader /> -->
            <el-scrollbar class="w100%">
                <LayoutAreaHeader />
                <el-main>
                    <slot />
                </el-main>
            </el-scrollbar>
        </el-container>
        <!-- <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop> -->
    </el-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
@import url("~/assets/scss/admin.scss");
</style>
