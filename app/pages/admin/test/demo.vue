<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '测试demo',
    icon: 'i-ep-menu',
    sort: 99,
})

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}

const mainLoad = inject<() => void>('reload')
</script>

<template>
    <LayoutBox>
        <el-button @click="mainLoad">
            刷新页面
        </el-button>
        测试{{ item }}
    </LayoutBox>
</template>
