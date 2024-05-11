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

const { themeConfig, isDrawer } = useThemeState()

const routes = useRouter().getRoutes()

function arrayToTreeList<T = any>(arr: T[], key: keyof T) {
    console.log(arr)
    const map: any = {}
    const roots: T[] = []

    arr.forEach((item) => {
        map[item[key]] = {
            ...item,
            children: [],
        }
    })

    arr.forEach((item) => {
        const path = item[key] as string
        const parentPath = path.substring(0, path.lastIndexOf('/'))
        if (parentPath !== '') {
            if (map[parentPath]) {
                map[parentPath].children.push(map[path])
            }
            else {
                // If parent does not exist in the array, add to the roots
                roots.push(map[path])
            }
        }
        else {
            roots.push(map[path])
        }
    })

    return roots
}

// const treeData = arrayToTreeList(routes,'path');
// console.log('1231313', treeData);

const routeList = computed(() => {
    const list = routes.filter((item) => {
        // console.log(item.path, 'startStr.startsWith(item.path) :>> ', item.path.startsWith(startStr));
        if (item.path.startsWith(appAdminPath) && !item?.meta?.isHide) {
            return true
        }
        else {
            return false
        }
    }).map((item) => { // 处理标题和排序字段
        item.meta.title = item.meta.title || item.name as string
        item.meta.sort = item.meta.sort || 0
        return item
    }).sort((a, b) => { // 排序
        return (a.meta?.sort || 0) - (b.meta?.sort || 0) // 从小到大排序
    })

    return list
})

const isCollapse = ref(false)
function handleOpen(key: string, keyPath: string[]) {
    console.log(key, keyPath)

    const routes = useRouter().getRoutes()
    console.log(routes)
}
function handleClose(key: string, keyPath: string[]) {
    console.log(key, keyPath)
}

// 获取父级菜单数据
const childList = computed(() => {
    return props.children
})
// 打开外部链接
function onALinkClick(val: RouteRecordRaw) {
    // handleOpenLink(val as RouteItem)
}
</script>

<template>
    <el-menu router :default-active="$route.path" :collapse="themeConfig.isCollapse" @open="handleOpen"
        @close="handleClose">
        <LayoutMenuSub :children="routeList" />
        <el-sub-menu index="1">
            <template #title>
                <el-icon class="i-ep-location" />
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">
                    item one
                </el-menu-item>
                <el-menu-item index="1-2">
                    item two
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">
                    item three
                </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title>
                    item four
                </template>
                <el-menu-item index="1-4-1">
                    item one
                </el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon class="i-ep-location" />
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="2-2">
                    item one
                </el-menu-item>
                <el-menu-item index="2-2">
                    item two
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="2-3">
                    item three
                </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
                <template #title>
                    item four
                </template>
                <el-menu-item index="2-4-2">
                    item one
                </el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon class="i-ep-location" />
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="3-3">
                    item one
                </el-menu-item>
                <el-menu-item index="3-3">
                    item two
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="3-3">
                    item three
                </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
                <template #title>
                    item four
                </template>
                <el-menu-item index="3-4-3">
                    item one
                </el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>
