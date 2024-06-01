<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '后台主页',
    icon: 'i-ep-home-filled',
    sort: -999,
    fixed: true,
    isAffix: true,
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
        data:image/svg+xml,<svg width="100" height="34" viewBox="0 0 100 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m27,0c-7.99582,0 -11.95105,0.00205 -12,12l0,6c0,8.284 -0.48549,16.49691 -8.76949,16.49691l54.37857,-0.11145c-8.284,0 -8.60908,-8.10146 -8.60908,-16.38546l0,-6c0.11145,-12.08445 -4.38441,-12 -12,-12l-13,0z" fill="#23409eff" /></svg>
    </LayoutBox>
</template>
