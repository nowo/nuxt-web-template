<!-- 菜单 -->
<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

// 定义父组件传过来的值
const props = defineProps({
    // 菜单列表
    children: {
        type: Array<RouteRecordRaw>,
        default: () => [],
    },
})

const { themeConfig } = useThemeState()
const { adminRoutes } = useAdminMenuState()

// 获取父级菜单数据
const childList = computed(() => {
    return props.children
})
</script>

<template>
    <el-menu router :default-active="$route.path" :collapse="themeConfig.isCollapse">
        <LayoutMenuSub :children="adminRoutes" />
    </el-menu>
</template>
