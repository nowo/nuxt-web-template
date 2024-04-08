<script lang="ts" setup>
const { isDrawer } = useThemeState()
</script>

<template>
    <el-aside>
        <el-scrollbar>
            <LayoutMenu />
        </el-scrollbar>
    </el-aside>
</template>

<style lang="scss" scoped></style>
