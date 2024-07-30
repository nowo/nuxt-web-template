<script setup lang="ts">

const SetAbout = defineAsyncComponent(() => import('./SetAbout.vue'))
// const LinkList = defineAsyncComponent(() => import('./LinkList.vue'))
const MessageList = defineAsyncComponent(() => import('./MessageList.vue'))
// const RecruitList = defineAsyncComponent(() => import('./RecruitList.vue'))

const props = defineProps<{
    type: IOtherType
}>()


const activeName = ref('1')

</script>

<template>
    <LayoutBox class="hei p0px!">
        <el-tabs v-model="activeName" class="tab-box" tab-position="left">
            <template v-if="props.type === 'recruit'">
                <el-tab-pane label="人才招聘" name="1">
                    <el-scrollbar>
                        <SetAbout :type="props.type" />
                    </el-scrollbar>
                </el-tab-pane>
                <!-- <el-tab-pane label="人才招聘-岗位" name="5" lazy>
                    <el-scrollbar>
                        <RecruitList title="人才招聘-岗位" />
                    </el-scrollbar>
                </el-tab-pane> -->
                <el-tab-pane label="招聘须知" name="2" lazy>
                    <el-scrollbar>
                        <SetAbout type="recruit-notice" />
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="人才培养" name="3" lazy>
                    <el-scrollbar>
                        <SetAbout type="recruit-cultivate" />
                    </el-scrollbar>
                </el-tab-pane>
            </template>
            <template v-else-if="props.type === 'message'">
                <el-tab-pane label="留言列表" name="1">
                    <el-scrollbar>
                        <MessageList title="留言" />
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="留言显示设置" name="2" lazy>
                    <el-scrollbar>
                        <SetAbout type="message" class="pl15px" />
                    </el-scrollbar>
                </el-tab-pane>
            </template>
            <!-- <template v-else-if="props.type === 'service'">
                <el-tab-pane label="资料下载" name="1">
                    <el-scrollbar>
                        <LinkList type="4,5,6" title="资料文件" item="download" />
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="服务维修" name="2" lazy>
                    <el-scrollbar>
                        <SetAbout type="service-mend" class="pl15px" />
                    </el-scrollbar>
                </el-tab-pane>
            </template> -->
            <!-- <template v-else-if="props.type==='banner'">
                <el-tab-pane label="轮播图" name="1">
                    <el-scrollbar>
                        <LinkList :type="1" title="轮播图" />
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="外部链接" name="2" lazy>
                    <el-scrollbar>
                        <LinkList :type="7" title="外部链接" />
                    </el-scrollbar>
                </el-tab-pane>
            </template> -->
            <template v-else>
                <el-tab-pane label="关于我们" name="1">
                    <el-scrollbar>
                        <SetAbout type="about" class="pl15px" />
                    </el-scrollbar>
                </el-tab-pane>
                <!-- <el-tab-pane label="关于我们-展示图" name="5" lazy>
                    <el-scrollbar>
                        <LinkList :type="9" title="关于我们-展示图" />
                    </el-scrollbar>
                </el-tab-pane> -->
                <el-tab-pane label="企业文化" name="2" lazy>
                    <el-scrollbar>
                        <SetAbout type="culture" class="pl15px" />
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="企业架构" name="3" lazy>
                    <el-scrollbar>
                        <SetAbout type="organization" class="pl15px" />
                    </el-scrollbar>
                </el-tab-pane>
                <!-- <el-tab-pane label="荣誉资质" name="4" lazy>
                    <el-scrollbar>
                        <LinkList :type="8" title="荣誉资质" />
                    </el-scrollbar>
                </el-tab-pane> -->
            </template>
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
            height: 100%;
        }
        .main-box{
            border:0
        }
    }
}
</style>
