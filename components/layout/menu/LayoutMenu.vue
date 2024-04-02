<!-- 菜单 -->
<template>
    <el-menu router :default-active="$route.path" :collapse="themeConfig.isCollapse" @open="handleOpen"
        @close="handleClose">
        <LayoutMenuSub :children="routes" />
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="2-2">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-2">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>

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

const { themeConfig, isDrawer } = useThemeState()

const routes = useRouter().getRoutes()
// console.log(routes)
routes.forEach(item=>{
    item.meta.title = item.meta.title || item.name
})

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)

    const routes = useRouter().getRoutes()
    console.log(routes)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

// 获取父级菜单数据
const childList = computed(() => {
    return props.children
})
// 打开外部链接
const onALinkClick = (val: RouteRecordRaw) => {
    // handleOpenLink(val as RouteItem)
}
</script>
