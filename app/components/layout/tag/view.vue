<!-- 标签页 -->
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import type { ScrollbarInstance } from 'element-plus'
import type { RouteRecordNormalized } from '#vue-router'

const route = useRoute()
const { tagMenuList, storageMenuList, updateStoreMenuList } = useAdminMenuState()

const scrollbarRef = ref<ScrollbarInstance>()

const a = ref<HTMLDivElement>()

const list = ref(tagMenuList.value)

// 鼠标滚轮滚动
function onHandleScroll(e: WheelEvent) {
    // console.log('e :>> ', e)
    // console.log('scrollbarRef.value :>> ', scrollbarRef.value)

    if (scrollbarRef.value?.$refs.wrapRef) {
        // scrollbarRef.value.setScrollLeft(e.wheelDelta)
        (scrollbarRef.value.$refs.wrapRef as HTMLDivElement).scrollLeft += e.deltaY / 4
    }
}

// 拖拽结束事件
function onEnd(e: any) {
    // 更新缓存里的标签数据
    storageMenuList.value = list.value.map(item => item.path)
}

const mainLoad = inject<() => void>('reload')
const onContextmenu = (e: MouseEvent, row: RouteRecordNormalized) => {
    // e.stopPropagation()
    e.preventDefault() // 阻止默认行为
    // console.log('e :>> ', e)
    // console.log('row :>> ',row)
    // console.log('a :>> ',a.value)
    // console.log('scrollbarRef.value :>> ',scrollbarRef.value)
    // console.log('scrollbarRef.value.$refs.wrapRef :>> ',scrollbarRef.value.$refs.wrapRef)
    // console.log('scrollbarRef.value.$refs.wrapRef.scrollLeft :>> ',scrollbarRef.value.$refs.wrapRef.scrollLeft)
    console.log('row :>> ', e, row)
    mainLoad?.()
}

const onLink = (row: RouteRecordNormalized) => {
    if (route.path !== row.path) navigateTo(row)
}

const onCloseTag = (row: RouteRecordNormalized) => {
    updateStoreMenuList(row, 2)
}

watchEffect(() => {
    list.value = tagMenuList.value
})

onBeforeMount(() => {
    console.log(list.value)
})
</script>

<template>
    <el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll">
        <ClientOnly>
            <VueDraggable v-model="list" tag="ul" :animation="300" class="tag-view-v1 h40px flex" @end="onEnd">
                <!-- <ul class="tag-view-ul flex gap-5px p8px"> -->
                <!-- :class="{on:$route.path===v.path}" -->
                <li v-for="item in list" :key="item.path" class="tag-view-item"
                    :class="{ on: $route.path === item.path }" @click="onLink(item)"
                    @contextmenu="(e) => onContextmenu(e, item)">
                    {{ item.meta.title }}
                    <i v-if="!item.meta.isAffix" class="tag-close-icon i-ep-close" @click.stop="onCloseTag(item)">
                        <!-- <i class="i-ep-close" /> -->
                    </i>
                </li>
                <!-- </ul> -->
            </VueDraggable>
        </ClientOnly>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
.tag-view-ul {
    &:after {
        content: '';
        padding-left: 5px;
    }
}

// 谷歌标签栏风格
.tag-view-v1 {
    gap: 1px;
    padding: 0 10px;
    padding-top: 5px;
    --tag-view-hover-color: var(--el-color-primary-light-9);

    .tag-view-item {
        position: relative;
        // background: #e91e63;
        border-radius: 10px 10px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        padding: 0 15px;
        color: var(--el-text-color-regular);

        &::before,
        &::after {
            --radius-width: 16px;
            content: "";
            position: absolute;
            width: var(--radius-width);
            height: var(--radius-width);
            bottom: 0;
            opacity: 0;
        }

        &::before {
            left: calc(0px - var(--radius-width));
            background: radial-gradient(circle at 0 0, transparent var(--radius-width), var(--tag-view-hover-color) var(--radius-width));
            clip-path: polygon(100% 0, 0% 100%, 100% 100%);
            transform: rotateY(45deg);
            transform-origin: right;
        }

        &::after {
            right: calc(0px - var(--radius-width));
            // background: #000;
            background: radial-gradient(circle at 100% 0, transparent var(--radius-width), var(--tag-view-hover-color) var(--radius-width));
            clip-path: polygon(0 0, 0% 100%, 100% 100%);
            transform: rotateY(45deg);
            transform-origin: left;
        }

        &:hover,
        &.on {
            background: var(--tag-view-hover-color);
            color: var(--el-color-primary);
            z-index: 3;

            &::before,
            &::after {
                opacity: 1;
                box-shadow: 0 0 0 30px var(--tag-view-hover-color);
            }
        }

        &:hover {
            z-index: 5;
            --tag-view-hover-color: var(--el-color-primary-light-9);
        }

        .tag-close-icon {
            margin: 0 -4px 0 4px;

            &:hover {
                color: var(--el-text-color-regular);
            }
        }

    }
}

.tag-view-v2 {

    .tag-view-item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        // margin: 8px;
        padding: 0 15px;
        text-align: center;
        border: 1px solid var(--el-border-color-lighter);
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
            border-color: var(--el-color-primary-light-5);
        }

        &.on {
            color: var(--el-color-white);
            background: var(--el-color-primary);
            border-color: var(--el-color-primary);
        }

        &-v1 {
            height: 24px;
            // margin: 8px;
            padding: 0 15px;
        }
    }

}

.tag-view-item-v1 {
    background: #e6f4ff;
    border-radius: 12px 12px 0 0;
    box-shadow: 19px 10px #e6f4ff, -19px 14px #e6f4ff;
    color: #1677ff;
    opacity: 1;
    z-index: -1
}

#classic-layout .tab-main .tab-list .tab-item[data-v-66b7c75e] {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 38px;
    justify-content: center;
    min-width: 100px;
    padding: 0 20px;
    position: relative
}

#classic-layout .tab-main .tab-list .tab-item:last-child.tab-selected[data-v-66b7c75e] {
    box-shadow: 0 0, -19px 14px #e6f4ff
}

#classic-layout .tab-main .tab-list .tab-item[data-v-66b7c75e]:last-child:after {
    display: none
}

#classic-layout .tab-main .tab-list .tab-item:first-child.tab-selected[data-v-66b7c75e] {
    box-shadow: 19px 14px #e6f4ff, 0 0
}

#classic-layout .tab-main .tab-list .tab-item[data-v-66b7c75e]:first-child:before {
    display: none
}

#classic-layout .tab-main .tab-list .tab-selected[data-v-66b7c75e] {
    background: #e6f4ff;
    border-radius: 12px 12px 0 0;
    box-shadow: 19px 10px #e6f4ff, -19px 14px #e6f4ff;
    color: #1677ff;
    opacity: 1;
    z-index: -1
}

#classic-layout .tab-main .tab-list .tab-selected[data-v-66b7c75e]:before {
    background-color: #e6f4ff;
    border-top-left-radius: 12px;
    bottom: 0;
    content: "";
    height: 38px;
    left: -6px;
    position: absolute;
    transform: skew(-15deg);
    width: 12px;
    display: none;
}

#classic-layout .tab-main .tab-list .tab-selected[data-v-66b7c75e]:after {
    background-color: #e6f4ff;
    border-top-right-radius: 12px;
    bottom: 0;
    content: "";
    height: 38px;
    position: absolute;
    right: -6px;
    transform: skew(15deg);
    width: 12px;
    display: none;
}
</style>
