<template>
    <el-aside>
        <el-scrollbar>
            <LayoutMenu />
        </el-scrollbar>
    </el-aside>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'


const { isDrawer } = useThemeState()


</script>

<style lang="scss" scoped></style>