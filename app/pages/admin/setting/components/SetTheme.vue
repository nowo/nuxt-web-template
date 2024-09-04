<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const isEdit = ref(import.meta.env.DEV)

const { systemInfo } = await useSystemState()

type ContentComponentType = 'input' | 'color' | 'number'   // 组件使用输入控件类型
interface ContentDataType {
    key: string
    value: string
    name: string
    type: ContentComponentType   // 组件使用输入控件类型
}

const stateData = reactive({
    varList: [
        { name: '主题色', key: '--co-main-color' },
        { name: '次文本色', key: '--co-main-color' },
    ],
    typeList: ['input', 'color', 'number'] as ContentComponentType[],
})


const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        service: '', // 邮件服务商
        port: undefined as undefined | number,   // 端口号
        email: '', // 发送方邮箱
        pass: '',    // 授权码
        name: '',   // 发送方姓名
        status: 1,   // 状态 1：启用，0：禁用
        toEmail: '', // 收件人邮箱
        contentData: [] as ContentDataType[]
    },
})

const rules = reactive<FormRules>({
    required: [{ required: true, message: '必填项不能为空' }],
})

const tableData = reactive<CoTableProps<ContentDataType>>({
    data: [],
    tableHeader: [
        { property: 'name', label: '标题名称', width: '180' },
        { property: 'key', label: '变量名', width: '180', other: { isHide: !isEdit.value } },
        { property: 'type', label: '组件类型', width: '180', other: { isHide: !isEdit.value } },
        { property: 'value', label: '值', minWidth: '180' },
        { property: 'operate', label: '操作', width: '100', align: 'center', fixed: 'right', other: { isHide: !isEdit.value } },

    ],
    pagination: paginationConfig,
    isTool: false,
})

// 初始化数据
const initDefaultData = async () => {
    const res = await useServerFetch<IConfigInfoUpdate>('/api/v1/config/info', {
        method: 'post',
        body: { type: 'theme' },
    })

    // console.log('res :>> ', res)
    if (res.code !== 200) return ElMessage.error('网络错误')
    const propsData = res.data
    try {
        let content = propsData?.content ? JSON.parse(propsData?.content) : []
        form.data.contentData = Array.isArray(content) ? content : []
    } catch (e) {
        form.data.contentData = []
    }

}

const onChangeName = (row: ContentDataType) => {
    if (row.key) return
    let node = stateData.varList.find(item => item.name === row.name)
    if (node) row.key = node.key
}


const onAddItem = () => {
    let item: ContentDataType = {
        key: '',
        value: '',
        name: '',
        type: 'input'
    }
    form.data.contentData.push(item)
}

const onRemoveItem = (index: number) => {
    if (index >= 0) form.data.contentData.splice(index, 1)
}

const visible = ref(false)
const iframeRef = ref<HTMLIFrameElement>()

// 向iframe发送样式数据
const sendIframeData = useDebounceFn(() => {
    let data = form.data.contentData.map(item => {
        return {
            key: item.key,
            value: item.value
        }
    })
    // console.log('data :>> ', data);
    // 发送，需在同一个域
    iframeRef.value?.contentWindow?.childDefineFunction(data)

}, 1000, { maxWait: 5000 })
const onToggleVisible = () => {
    visible.value = !visible.value
    if (visible.value) sendIframeData()

}


const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onSubmit = async () => {
    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return

    const param: IConfigInfoUpdate = {
        title: form.data.service?.trim() ?? '',
        port: form.data.port || 0,
        password: form.data.pass?.trim() ?? '',
        name: form.data.name?.trim() ?? '',
        status: form.data.status || 0,
        email: form.data.email?.trim() ?? '',
        href: form.data.toEmail?.trim() ?? '',
        type: 'theme',
        img: '',
        content: JSON.stringify(form.data.contentData),

    }

    const res = await ApiFunc(useServerFetch('/api/v1/config/update', {
        method: 'POST',
        body: param,
    }))

    if (res) ElMessage.success('设置成功')
}
// 重置
const onReset = async () => {
    formRef.value?.resetFields()
    initDefaultData()
}

// 监听表单变化
watch(() => form.data.contentData, () => {
    if (visible.value) sendIframeData()
}, { deep: true })

onMounted(() => {
    initDefaultData()
})
</script>

<template>
    <el-form ref="formRef" :model="form.data" :rules="rules" label-width="120px" label-position="right">
        <div class="pr20px pt20px">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="22" :md="18" :lg="18" :xl="isEdit ? 16 : 12">
                    <CoTable v-model:option="tableData" :data="form.data.contentData" auto-height border>
                        <template #name="{ row, $index }">
                            <el-form-item v-if="isEdit" :prop="`contentData.${$index}.name`" label-width="auto"
                                :rules="$index >= 0 ? rules.required : []">
                                <el-select v-model="row.name" filterable allow-create default-first-option
                                    @change="onChangeName(row)">
                                    <el-option v-for="item in stateData.varList" :key="item.key" :label="item.name"
                                        :value="item.name" />
                                </el-select>
                            </el-form-item>
                            <span v-else>{{ row.name }}</span>
                        </template>
                        <template #key="{ row, $index }">
                            <el-form-item :prop="`contentData.${$index}.key`" label-width="auto"
                                :rules="$index >= 0 ? rules.required : []">
                                <el-input v-model="row.key" maxlength="100" clearable />
                            </el-form-item>
                        </template>
                        <template #type="{ row, $index }">
                            <el-form-item :prop="`contentData.${$index}.type`" label-width="auto"
                                :rules="$index >= 0 ? rules.required : []">
                                <el-select v-model="row.type" filterable clearable>
                                    <el-option v-for="item in stateData.typeList" :key="item" :label="item"
                                        :value="item" />
                                </el-select>
                            </el-form-item>
                        </template>
                        <template #value="{ row, $index }">
                            <el-form-item :prop="`contentData.${$index}.value`" label-width="auto"
                                :rules="$index >= 0 ? rules.required : []">
                                <el-color-picker v-if="row.type == 'color'" v-model="row.value" show-alpha />
                                <el-input v-else v-model="row.value" maxlength="100" clearable />
                            </el-form-item>
                        </template>
                        <template #operateHeader>
                            <el-button @click="onAddItem()">
                                <i class="i-ep-plus" />
                            </el-button>
                        </template>
                        <template #operate="{ $index }">
                            <el-button type="danger" plain @click="onRemoveItem($index)">
                                <i class="i-ep-delete" />
                            </el-button>
                        </template>
                    </CoTable>
                </el-col>

                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mt15px">
                    <el-form-item label-width="50px">
                        <el-button type="primary" :loading="btnLoading" @click="onSubmit">
                            确定
                        </el-button>
                        <el-button @click="onReset">
                            重置
                        </el-button>

                        <el-popover placement="right" :width="1250" :visible="visible">
                            <template #reference>
                                <el-button @click="onToggleVisible">预览</el-button>
                            </template>
                            <iframe class="w100% h80vh" ref="iframeRef" src="/" frameborder="0"></iframe>
                        </el-popover>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
    </el-form>
</template>

<style lang="scss" scoped></style>
