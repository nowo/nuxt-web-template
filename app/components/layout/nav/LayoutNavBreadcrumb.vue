<!-- 面包屑导航 -->
<script lang="ts" setup>
const { themeConfig } = useThemeState()
const { adminRoutes } = useAdminMenuState()

const isShowBreadcrumb = ref(true)

const breadcrumbList = computed(() => {
    const currentPath = useRoute().path
    const pathArr = [appAdminPath]
    if (currentPath !== appAdminPath) pathArr.push(currentPath)
    const list = pathArr.map((item) => {
        const route = adminRoutes.value.find(route => route.path === item)
        return route || undefined
    }).filter(item => !!item)
    return list

    // return [] as RouteRecordCustom[]
})

function onThemeConfigChange() {
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}
</script>

<template>
    <div v-if="isShowBreadcrumb" class="flex items-center justify-center">
        <!-- 侧边菜单展开收起 -->
        <div class="h100% w40px flex cursor-pointer items-center justify-center" @click="onThemeConfigChange">
            <i :class="themeConfig.isCollapse ? 'i-ep-expand' : 'i-ep-fold'" />
        </div>
        <!-- 面包屑导航 -->
        <el-breadcrumb>
            <el-breadcrumb-item v-for="v in breadcrumbList" :key="v.path" :to="v.path">
                <el-icon v-if="themeConfig.isBreadcrumbIcon" class="align-bottom" :class="v.meta?.icon" />
                {{ v.meta?.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<style lang="scss" scoped></style>
