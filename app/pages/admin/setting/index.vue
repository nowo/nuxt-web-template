<script setup lang="ts">
import SetSystem from './components/SetSystem.vue'

const SetEmail = defineAsyncComponent(() => import('./components/SetEmail.vue'))
const SetTheme = defineAsyncComponent(() => import('./components/SetTheme.vue'))

definePageMeta({
    layout: 'admin',
    title: '系统设置',
    icon: 'i-ep-setting',
    sort: 1000,
})
</script>

<template>
    <LayoutBox class="hei p0px!">
        <el-tabs tab-position="left" class="tab-box">
            <el-tab-pane label="基本设置">
                <el-scrollbar>
                    <client-only>
                        <SetSystem />
                    </client-only>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="SEO设置" lazy>
                <el-scrollbar>
                    <SetSystem type="seo" />
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="邮件设置" lazy>
                <el-scrollbar>
                    <SetEmail />
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="主题设置">
                <el-scrollbar>
                    <SetTheme />
                </el-scrollbar>
            </el-tab-pane>
            <!-- <el-tab-pane label="安全设置">
                <el-scrollbar>
                    <SetBasic :data="systemInfo" />
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="附件设置">
                <el-scrollbar>
                    <SetBasic :data="systemInfo" />
                </el-scrollbar>
            </el-tab-pane> -->
        </el-tabs>
    </LayoutBox>
</template>

<style scoped lang="scss">
.tab-box {
    height: 100%;

    :deep(.el-tabs__nav-wrap.is-left) {
        --el-border-color-light: var(--el-border-color-extra-light);
        --el-tabs-header-height: 48px;

        .el-tabs__item {
            min-width: 120px;

            &.is-active {

                background-color: var(--el-color-primary-light-9);
            }
        }

    }

    :deep(.el-tabs__content) {
        height: 100%;

        .el-tab-pane {
            height:100%;
            padding-left:15px;
        }
    }
}
</style>
