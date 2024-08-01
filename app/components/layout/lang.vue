<template>
    <el-tabs>
        <el-tab-pane v-for="item in options" :key="item.value" :label="item.label" :name="item.value" />
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref<{ label: string, value: LanguageType }[]>([
    { label: '中文', value: 'cn' },
    { label: '英文', value: 'en' },
])
</script>
