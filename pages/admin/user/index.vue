<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '系统用户',
    icon: 'i-ep-user',
    sort: 10,
})

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<template>
    <LayoutBox>user</LayoutBox>
</template>
