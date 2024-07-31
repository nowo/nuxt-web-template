<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: '后台主页',
    icon: 'i-ep-home-filled',
    sort: -999,
    fixed: true,
    isAffix: true,
})

const { systemInfo } =await useSystemState()

</script>

<template>
    <LayoutBox>
            <CoMap :title="systemInfo?.company" :address="systemInfo?.address" class="h500px">
            </CoMap>
    </LayoutBox>
</template>
