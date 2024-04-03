<template>
    <el-scrollbar>菜单管理
        <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </el-scrollbar>

</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '菜单管理',
    icon: 'i-ep-menu'

})

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>