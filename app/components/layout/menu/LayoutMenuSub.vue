<!-- 菜单 -->
<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'

// 定义父组件传过来的值
const props = defineProps({
    // 菜单列表
    children: {
        type: Array<RouteRecordNormalized>,
        default: () => [],
    },
})

const { updateStoreMenuList } = useAdminMenuState()

// 获取父级菜单数据
const childList = computed(() => {
    return props.children
})
// 打开外部链接
function onALinkClick(val: RouteRecordNormalized) {
    updateStoreMenuList(val, 1)
    // navigateTo(val)
}
</script>

<template>
    <template v-for="val in childList" :key="val.path">
        <el-sub-menu v-if="val.children && val.children.length > 0" :index="val.path">
            <template #title>
                <el-icon :class="val.meta?.icon" />
                <span>{{ val.meta?.title }}</span>
            </template>
            <LayoutMenuSub :children="val.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="val.path" @click="onALinkClick(val)">
            <template v-if="!val.meta?.isLink || (val.meta.isLink && val.meta.isIframe)">
                <el-icon :class="val.meta?.icon" />
                <span>{{ val.meta?.title }}</span>
            </template>
            <template v-else>
                <a class="w100%" @click.prevent="onALinkClick(val)">
                    <el-icon :class="val.meta?.icon" />
                    {{ val.meta.title }}
                </a>
            </template>
        </el-menu-item>
    </template>
</template>
