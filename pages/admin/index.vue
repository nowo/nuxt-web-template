<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '后台主页',
    icon: 'i-ep-home-filled',
    sort: -999,
})

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 30 }).fill(item))
</script>

<template>
    <LayoutBox>
        首页
        <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </LayoutBox>
</template>
