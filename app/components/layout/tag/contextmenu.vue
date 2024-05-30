<script lang="ts" setup>
const a = ref('1')
</script>

<template>
    <div id="el-id-3601-49" class="el-popper is-light el-popover el-popover--plain" tabindex="-1" aria-hidden="false"
        style="z-index: 2038; position: absolute; inset: 596px auto auto 464px; width: 200px;" role="tooltip"
        aria-label="Title" data-popper-reference-hidden="false" data-popper-escaped="false"
        data-popper-placement="bottom">
        <el-dropdown-menu>
            <el-dropdown-item>刷新</el-dropdown-item>
            <el-dropdown-item>关闭</el-dropdown-item>
            <el-dropdown-item>关闭其他</el-dropdown-item>
            <el-dropdown-item>全部关闭</el-dropdown-item>
            <el-dropdown-item>当前页全屏</el-dropdown-item>
        </el-dropdown-menu>
        <span class="el-popper__arrow" data-popper-arrow="" style="position: absolute; left: 94px;" />{{ a }}
    </div>
</template>

<style lang="scss" scoped>
.pop-box {
    width: 200px;
    height: 200px;
    background-color: red;
    position: absolute;
    z-index: 999;
}
</style>
