<script lang="ts" setup>
import type { Message, Prisma, Link } from '@prisma/client'
import type { CheckboxValueType, FormInstance, FormRules } from 'element-plus'


const props = defineProps<{
    title: string
    list: Record<string, string>
}>()

const emits = defineEmits<{
    update: []
}>()

const visible = ref(false)

const operate = ref<DialogOperate>()
const comData = computed(() => {
    if (operate.value === 'add') return { title: `新增${props.title}` }
    return { title: `修改${props.title}` }
})
const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        id: 0,
        title: '', // 菜单名称
        email: '', // 菜单名称（英文）
        address: '',
        phone: '',
        content: '',
        status: 0, 
        sort:0,// 排序
    },
})

const rules = reactive<FormRules>({

    title: [
        { required: true, message: '必填项不能为空', whitespace: true },

    ],
    type: [
        { required: true, message: '必填项不能为空' },
    ],
    // email: [
    //     { required: true, message: 'Please input Activity name' },
    //     { min: 3, max: 5, message: 'Length should be 3 to 5' },
    // ],
})


const openModal = (type: DialogOperate, row?: Message) => {
    operate.value = type
    if (type === 'edit') { // 修改


        form.data.id = row?.id||0
        form.data.title = row?.title||''
        form.data.address = row?.address||''
        form.data.phone = row?.phone || ''
        form.data.email = row?.email || ''
        form.data.content = row?.content||''
        form.data.status = row?.status||0
    } else {

        form.data.id = 0
        form.data.title = ''
        form.data.phone = ''
        form.data.address = ''
        form.data.email = ''

        form.data.content = ''
        form.data.status = 0
    }
    visible.value = true
}

const closeModal = () => {
    visible.value = false
}

// 取消
const onCancel = () => {
    visible.value = false
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onConfirm = useThrottleFn(async () => {

    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return


    const data: Prisma.MessageUncheckedCreateInput = {
        title: form.data.title?.trim() ?? '',
        phone: form.data.phone?.trim() ?? '',
        email: form.data.email?.trim() ?? '',
        address: form.data.address?.trim() ?? '',
        content: form.data.content?.trim() ?? '',
        status: Number(form.data.status) || 0,
    }

    if (operate.value === 'add') {
        const res = await ApiFunc(useServerFetch('/api/v1/message/add', {
            method: 'POST',
            body: data,
        }))
        if (res.code !== 200) return ElMessage.error(res.msg)
        ElMessage.success('添加成功')
    } else if (operate.value === 'edit') {
        const param = {
            ...data,
            id: form.data.id,
        }
        const res = await ApiFunc(useServerFetch('/api/v1/message/edit', {
            method: 'POST',
            body: param,
        }))
        if (res.code !== 200) return ElMessage.error(res.msg)
        ElMessage.success('修改成功')
    }

    emits('update') // 更新列表
    onCancel()
}, 800)

defineExpose({
    openModal,
    closeModal,
})
</script>

<template>
    <CoDrawer v-model="visible" :title="comData.title" :loading="btnLoading" :width="{ lg: 50, md: 75, sm: 80 }"
        @cancel="onCancel" @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="110px">
            <el-form-item label="客户名称:" prop="title">
                <el-input v-model="form.data.title" maxlength="20" placeholder="请输入客户名称" clearable />
            </el-form-item>
            <el-form-item label="联系方式:" prop="phone">
                <el-input v-model="form.data.phone" maxlength="20" placeholder="请输入联系方式" clearable />
            </el-form-item>
            <el-form-item label="电子邮箱:" prop="email">
                <el-input v-model="form.data.email" maxlength="30" placeholder="请输入电子邮箱" clearable />
            </el-form-item>
            <el-form-item label="工作地区:" prop="address">
                <el-input v-model="form.data.address" maxlength="20" placeholder="请输入工作地区" clearable />
            </el-form-item>
            <el-form-item label="备注:" prop="content">
                <el-input v-model="form.data.content" type="textarea" maxlength="255" placeholder="请输入备注信息" clearable />
            </el-form-item>

            <el-form-item label="状态:" prop="status">
                <el-radio-group v-model="form.data.status">
                    <el-radio v-for="(item, key) in props.list" :key="key" :label="Number(key)">
                        {{ item }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="排序" prop="sort">
                <el-input-number v-model="form.data.sort" :min="0" :max="10000" controls-position="right" placeholder=""
                    class="w100%" />
            </el-form-item> -->
        </el-form>
    </CoDrawer>
</template>

<style lang="scss" scoped></style>
