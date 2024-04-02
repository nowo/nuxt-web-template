<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { appName } from '~/config/constant'

useHead({
    title: appName,
})


</script>

<template>
    <el-config-provider :locale="zhCn">
        <VitePwaManifest />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </el-config-provider>
</template>

<style lang="scss">
@import url("~/assets/scss/element-plus.scss");
html,
body,
#__nuxt {
    height: 100vh;
    margin: 0;
    padding: 0;
}

html.dark {
    background: #222;
    color: white;
}
</style>
