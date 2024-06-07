<template>
    <el-drawer ref="drawerRef" v-bind="$attrs">
        <template v-if="$slots.header" #header>
            <slot name="header" />
        </template>
        <slot />
        <template #footer>
            <slot v-if="$slots.footer" name="footer" />
            <div v-else>
                <el-button @click="onCancel">取消</el-button>
                <el-button type="primary" :loading="props.loading" @click="onConfirm">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>


const props=defineProps<{
    loading?:boolean
}>()

const emits=defineEmits<{
    cancel:[],
    confirm:[]
}>()

const drawerRef = ref<ComponentInstance['ElDrawer']>()

// 取消
const onCancel = () => {
    emits('cancel')
}

// 确认
const onConfirm = () => {
    emits('confirm')
}

defineExpose({
    drawerRef,
    onCancel,
    onConfirm,
})
</script>