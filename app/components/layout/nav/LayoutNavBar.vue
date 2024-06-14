<script lang="ts" setup>
interface NavBarStateData {
    configSizeData: Record<GlobalComponentSize, string>
}

const { themeConfig, isDrawer } = useThemeState()
const { userInfo,setUserInfo } = useUserState()
setUserInfo()

const passwordRef=ref<ComponentInstance['LayoutOtherPassword']>()

const state = reactive<NavBarStateData>({
    configSizeData: {
        large: '大型',
        default: '默认',
        small: '小型',

    },
})

// 切换组件大小
function onComponentSizeChange(row: GlobalComponentSize) {
    themeConfig.value.globalComponentSize = row
}
// 打开布局配置弹窗
function onLayoutSettingClick() {
    isDrawer.value = true
}

// 打开搜索弹窗
function onSearchClick() {

}

// 全屏点击时
const { isSupported, isFullscreen, toggle } = useFullscreen()
function onScreenFullClick() {
    if (!isSupported) return ElMessage.warning('暂不不支持全屏')
    toggle() // 全屏切换
    // state.isScreenFull = !isFullscreen.value
}

function onHandleCommandClick(command: string) {
    if (command === 'logout') { // 退出登录
        ElMessageBox.confirm('您确定要退出登录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            const token = useCookie('token')
            token.value = ''
            navigateTo('/admin/login')
        }).catch(() => {
            // catch error
        })
    }else if(command==='password'){// 修改密码
        
        passwordRef.value?.openDialog()
    }
}
</script>

<template>
    <div class="layout-nav-bar pr15px">
        <ClientOnly>
            <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
                <!-- <div class="layout-navbars-breadcrumb-user-icon">
                <i class="iconfont icon-ziti" title="组件大小" />
            </div> -->
                <div class="layout-user-item">
                    <i class="i-ic:sharp-text-fields" title="组件大小" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="(item, index) in state.configSizeData" :key="index" :command="index"
                            :disabled="themeConfig.globalComponentSize === index">
                            {{ item }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="layout-user-item" @click="onLayoutSettingClick">
                <i class="i-ep-operation" title="布局配置" />
            </div>
            <div class="layout-user-item" @click="onSearchClick">
                <i class="i-ep-search" title="菜单搜索" />
            </div>
            <el-popover placement="bottom" :width="300" trigger="click">
                <template #reference>
                    <div class="layout-user-item">
                        <el-badge>
                            <i class="i-ep-bell block" title="消息" />
                        </el-badge>
                    </div>
                </template>
                <!-- <UserNews :list="[]" @update="setNewsState" /> -->
            </el-popover>
            <div class="layout-user-item mr10px" @click="onScreenFullClick">
                <i :class="isFullscreen ? 'i-ep-copy-document' : 'i-ep-full-screen'"
                    :title="isFullscreen ? '关全屏' : '开全屏'" />
            </div>

            <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
                <span class="flex items-center">
                    <el-avatar v-if="userInfo?.avatar" :src="userInfo.avatar" :size="32" class="mr5px" />
                    <el-avatar v-else :size="32" class="mr5px">
                        <i class="i-ep:user-filled text-20px" />
                    </el-avatar>
                    {{ userInfo?.username === '' ? 'common' : userInfo?.username }}
                    <i class="i-ep:arrow-down ml5px" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="/">
                            首页
                        </el-dropdown-item>
                        <el-dropdown-item command="password">
                            修改密码
                        </el-dropdown-item>
                        <!-- <el-dropdown-item command="clear">
                            清空后台缓存
                        </el-dropdown-item> -->
                        <!-- <el-dropdown-item command="/401">401</el-dropdown-item> -->
                        <el-dropdown-item divided command="logout">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <LayoutOtherPassword ref="passwordRef" />
            <Teleport to="body">
                <LayoutOtherSetting v-model="isDrawer" />
            </Teleport>
        </ClientOnly>
    </div>
</template>

<style lang="scss" scoped>
.layout-nav-bar {
    display: flex;
    height: 100%;

}

.layout-user-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    height: 100%;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }
}
</style>
