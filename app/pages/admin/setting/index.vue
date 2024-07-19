<script setup lang="ts">
import SetBasic from './components/SetBasic.vue'
import SetSeo from './components/SetSeo.vue'

definePageMeta({
    layout: 'admin',
    title: '系统设置',
    icon: 'i-ep-setting',
    sort: 1000,
})

const {systemInfo} =await useSystemState()
</script>

<template>
    <LayoutBox class="hei p0px!">
        <el-tabs tab-position="left" class="tab-box">
            <el-tab-pane label="基本设置">
                <el-scrollbar>
                    <client-only>
                        <SetBasic :data="systemInfo" class="pl15px" />
                    </client-only>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="SEO设置" lazy>
                <el-scrollbar>
                    <SetSeo :data="systemInfo" class="pl15px" />
                </el-scrollbar>
            </el-tab-pane>
            <!-- <el-tab-pane label="其他设置">
                <el-scrollbar>
                    <SetBasic :data="systemInfo" class="pl15px" />
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="安全设置">
                <el-scrollbar>
                    <SetBasic :data="systemInfo" class="pl15px" />
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="邮件设置">
                <el-scrollbar>
                    <SetBasic :data="systemInfo" class="pl15px" />
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="附件设置">
                <el-scrollbar>
                    <SetBasic :data="systemInfo" class="pl15px" />
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
        }
    }
}
</style>
