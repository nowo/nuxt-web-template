<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const { systemInfo } = await useSystemState()
useHead({
    title: `${systemInfo.value?.title || ''}`,
    meta: [
        { name: 'description', content: systemInfo.value?.description },
        { name: 'keywords', content: systemInfo.value?.keywords },
    ],
})

onMounted(() => {
    // document.body.style.zIndex = '1000'
    // console.log('window.self !== window.top :>> ', window.self !== window.top);
    window.childDefineFunction = (message) => {
        // console.log(message);
        const list = message as { key: string, value: string }[]
        const el = document.documentElement
        list.forEach(item => {
            el.style.setProperty(item.key, item.value)
        })
    };

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
@import url("~/assets/scss/transition.scss");

html,
body,
#__nuxt {
    // height: 100vh;
    margin: 0;
    padding: 0;
    font-size: 14px;
}

html.dark {
    background: #222;
    color: white;
}
</style>
