<script setup lang="ts">
const online = useOnline()

const data = ref<{ t: string, end: string, length: number }[]>([])

async function onTest() {
    const t = new Date().getTime().toString()
    const s1 = await setSignRule(t)
    const { data } = await useFetch('/api/v1/system/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-sign': `${s1}-${t}`,
        },
    })
    console.log('data.value :>> ', data.value)
}

const onSign = async () => {
    ['123456', '666666', 'abc123'].forEach(async (s, i) => {
        const t = (new Date().getTime() + i * 10).toString()
        const s1 = await setSignRule(t)
        data.value.push({ t, length: s1.length, end: s1 })
    })
}

const onSignVerify = async () => {
    const tab: any[] = []
    data.value.forEach(async (item, i) => {
        const s1 = await setSignRule(item.t)
        tab.push({ t: item.t, length: s1.length, end: s1 })
    })
    console.log(tab)
}
</script>

<template>
    <div>
        <Logos id="logo-im" msg="Vite + Vue" is-hide is-error is-loading is-info is-show is-success is-primary
            is-warning is-active mb-6 class="logo-img" />
        <Suspense>
            <ClientOnly>
                1231
                <!-- <PageView v-if="online" />
                <div v-else text-gray:80>
                    You're offline
                </div> -->
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
        <br>
        <button @click="onSignVerify">
            验证
        </button>
        <button class="bg-#eee p5px" @click="onSign">
            生成数据
        </button>
        <el-table :data="data" border>
            <el-table-column prop="s" label="s" width="100" />
            <el-table-column prop="t" label="t" width="150" />
            <el-table-column prop="end" label="end" />
            <el-table-column prop="length" label="length" width="100" />
        </el-table>
    </div>
</template>
