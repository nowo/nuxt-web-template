<template>
    <el-drawer ref="drawerRef" v-bind="$attrs" :size="width">
        <template v-if="$slots.header" #header>
            <slot name="header" />
        </template>
        <el-scrollbar class="px20px">
            <slot />
        </el-scrollbar>
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

const props = defineProps<{
    loading?: boolean,
    width?: number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>>
    // width?: number | Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>
}>()

const emits = defineEmits<{
    cancel: [],
    confirm: []
}>()

const { width: wWid } = useWindowSize()

const width = computed(() => {
    let wid = 30

    if (typeof props.width === 'number') {
        wid = props.width
    } else if (typeof props.width === 'object') {
        let winWidth = wWid.value
        // console.log('winWidth :>> ', winWidth);
        const { xs, sm, md, lg, xl } = props.width;
        if (xl && winWidth > 1200) {
            wid = xl
        } else if (lg && winWidth > 992) {
            wid = lg
        } else if (md && winWidth > 768) {
            wid = md
        } else if (sm && winWidth > 576) {
            wid = sm
        } else if (xs && winWidth > 380) {
            wid = xs
        } else {
            wid = xs || sm || md || lg || xl || wid
        }
    }
    // console.log(wid)
    return `${wid}%`
})


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