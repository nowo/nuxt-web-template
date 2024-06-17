<script lang="ts" setup>
import type { RouteRecordNormalized } from '#vue-router'

const { setStoreMenuList } = useAdminMenuState()

const state = reactive({
    visible: false,
    top: 0,
    left: 0,
    arrowLeft: 20,
    currentRoute: undefined as RouteRecordNormalized | undefined,
})

const dropdownList = ref<{ id: 1 | 2 | 3 | 4 | 5, name: string, icon: string, isHide?: boolean }[]>([
    { id: 1, name: '刷新', icon: 'i-ep-refresh-right' },
    { id: 2, name: '关闭', icon: 'i-ep-close', isHide: false },
    { id: 3, name: '关闭其它', icon: 'i-ep-circle-close' },
    { id: 4, name: '全部关闭', icon: 'i-ep-folder-delete' },
    { id: 5, name: '当前页全屏', icon: 'i-ep:full-screen' },
])

const popStyles = computed(() => {
    return {
        top: `${state.top + 10}px`,
        left: `${state.left - state.arrowLeft}px`,
    }
})

// 标签右键打开事件
const openContextmenu = (e: MouseEvent, row: RouteRecordNormalized) => {
    // console.log('e :>> ', e)
    state.top = e.pageY
    state.left = e.pageX
    state.currentRoute = row

    dropdownList.value[1].isHide = !!row.meta?.isAffix

    state.visible = false
    setTimeout(() => {
        state.visible = true
    }, 30)
}

// 空白关闭弹出层
const popRef = ref()
onClickOutside(popRef, (event) => {
    state.visible = false
})

const onCurrentContextmenuClick = (id: 1 | 2 | 3 | 4 | 5) => {
    if (state.currentRoute) setStoreMenuList(id, state.currentRoute)

    state.visible = false
}

defineExpose({
    openContextmenu,
})
</script>

<template>
    <transition name="el-zoom-in-center">
        <div v-show="state.visible" ref="popRef"
            class="el-popper is-light el-popover el-popover--plain el-dropdown__popper pop-box" :style="popStyles">
            <ul class="el-dropdown-menu">
                <template v-for=" item in dropdownList">
                    <li v-if="!item.isHide" :key="item.id" class="el-dropdown-menu__item" aria-disabled="false"
                        tabindex="-1" @click="onCurrentContextmenuClick(item.id)">
                        <!-- <SvgIcon :name="v.icon" /> -->
                        <i :class="item.icon" />
                        <span>{{ item.name }}</span>
                    </li>
                </template>
            </ul>
            <span class="el-popper__arrow" :style="`left: ${state.arrowLeft}px;top:-5px;`" />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.pop-box {
    &.el-popper {
        // --el-dropdown-menu-box-shadow: var(--el-box-shadow-light);
        // --el-dropdown-menuItem-hover-fill: var(--el-color-primary-light-9);
        // --el-dropdown-menuItem-hover-color: var(--el-color-primary);
        // position: absolute;
        // z-index: 999;
        --el-popover-padding: 0;
        min-width: 70px;
    }

    .el-dropdown-menu__item {
        --el-font-size-base: 12px;

        // &:hover {
        //     background-color: var(--el-dropdown-menuItem-hover-fill);
        //     color: var(--el-dropdown-menuItem-hover-color);
        // }
    }
}
</style>
