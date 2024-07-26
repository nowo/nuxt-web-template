<script lang="ts" setup>
const { themeConfig } = useThemeState()
</script>

<template>
    <el-aside class="flex flex-col" :style="`--el-menu-bg-color:${themeConfig.menuBar}`">
        <LayoutOtherLogo class="py10px" />
        <div class="min-h-0 flex-1">
            <el-scrollbar>
                <LayoutMenu :background-color="themeConfig.menuBar" :text-color="themeConfig.menuBarColor" />
            </el-scrollbar>
        </div>
    </el-aside>
</template>

<style lang="scss" scoped></style>
