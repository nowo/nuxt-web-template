<script lang="ts" setup>
const { themeConfig } = useThemeState()
</script>

<template>
    <NuxtLink :to="appAdminPath" class="flex items-center justify-center">
        <img class="max-h40px" src="/vite.png" alt="">
        <span v-if="!themeConfig.isCollapse" class="text-18px">后台管理系统</span>
    </NuxtLink>
</template>

<style lang="scss" scoped></style>
