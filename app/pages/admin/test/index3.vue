<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '测试',
    icon: 'i-ep-menu',
    sort: 99,
})

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
</script>

<template>
    <LayoutBox>
        测试{{ item }}
    </LayoutBox>
</template>
