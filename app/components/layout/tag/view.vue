<!-- 标签页 -->
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import type { ScrollbarInstance } from 'element-plus'
import type { RouteRecordNormalized } from '#vue-router'

const route = useRoute()
const { tagMenuList, storageMenuList, updateStoreMenuList } = useAdminMenuState()

const scrollbarRef = ref<ScrollbarInstance>()

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

const onLink = (row: RouteRecordNormalized) => {
    if (route.path !== row.path) navigateTo(row)
}

const onCloseTag = (row: RouteRecordNormalized) => {
    updateStoreMenuList(row, 2)
}

watchEffect(() => {
    list.value = tagMenuList.value
})

// 右键菜单操作内容
const contextmenuRef = ref<ComponentInstance['LayoutTagContextmenu']>()
const onContextmenu = (e: MouseEvent, row: RouteRecordNormalized) => {
    contextmenuRef.value?.openContextmenu(e, row)
}
</script>

<template>
    <el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll">
        <div class="h40px">
            <ClientOnly>
                <VueDraggable v-model="list" tag="ul" :animation="300" class="tag-view-v1 h100% flex" @end="onEnd">
                    <!-- <ul class="tag-view-ul flex gap-5px p8px"> -->
                    <!-- :class="{on:$route.path===v.path}" -->
                    <li v-for="item in list" :key="item.path" class="tag-view-item"
                        :class="{ on: $route.path === item.path }" @click="onLink(item)"
                        @contextmenu.prevent="(e) => onContextmenu(e, item)">
                        {{ item.meta.title }}
                        <i v-if="!item.meta.isAffix" class="i-ep-close tag-close-icon" @click.stop="onCloseTag(item)">
                            <!-- <i class="i-ep-close" /> -->
                        </i>
                    </li>
                    <!-- </ul> -->
                </VueDraggable>
                <Teleport to="body">
                    <LayoutTagContextmenu ref="contextmenuRef" />
                </Teleport>
            </ClientOnly>
        </div>
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
</style>
