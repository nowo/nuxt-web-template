<script setup lang="ts">
const online = useOnline()

async function onTest() {
    const { data } = await useFetch('/api/v1/system/info')
    console.log('data.value :>> ', data.value)
}

// timeout: 1.728ms
// ✔ Vite server hmr 9 files in 21.796ms
// timeout: 1.888ms
// timeout: 1.87ms
// timeout: 2.245ms
// timeout: 3.22ms
// timeout: 1.514ms
</script>

<template>
    <div>
        <Logos id="logo-im" mb-6 msg="Vite + Vue" is-hide is-error is-loading is-info is-show is-success is-primary
            is-warning is-active class="logo-img" />
        <Suspense>
            <ClientOnly>
                <PageView v-if="online" />
                <div v-else text-gray:80>
                    You're offline
                </div>
            </ClientOnly>
            <template #fallback>
                <div italic op50>
                    <span animate-pulse>Loading...</span>
                </div>
            </template>
        </Suspense>
        <InputEntry />
        首页
        <button @click="onTest">
            测试
        </button>
    </div>
</template>
