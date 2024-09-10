<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const url = useRequestURL()
const { systemInfo } = await useSystemState()

console.log(url)

const { locale: lo } = useI18n()

const locale = computed(() => {
    return lo.value === 'en' ? en : zhCn
})

let script: any[] = []
if (systemInfo.value?.hm_url) {
    script = [
        { innerHTML: 'var _hmt = _hmt || [];' },
        {
            type: 'text/javascript',
            src: systemInfo.value?.hm_url,
            // async: true,
            // defer: true,
            // crossorigin: 'anonymous',
            // referrerpolicy: 'no-referrer-when-downgrade',
        },
    ]
}

useHead({
    title: `${systemInfo.value?.title || ''}`,
    meta: [
        { name: 'description', content: systemInfo.value?.description },
        { name: 'keywords', content: systemInfo.value?.keywords },
    ],
    link: [
        { rel: 'icon', href: systemInfo.value?.icon },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Organization',
                'name': systemInfo.value?.company,
                'url': '',
                'logo': systemInfo.value?.logo,
            }),
        },
        ...script
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
    <el-config-provider :locale="locale">
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
