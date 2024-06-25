<script lang="ts" setup>
import type { Menu, Prisma } from '@prisma/client'
import type { CheckboxValueType, FormInstance, FormRules } from 'element-plus'
import { deepClone } from '@cooj/utils'

const props = defineProps<{
    data: Prisma.MenuUncheckedCreateInput[]
}>()

const emits = defineEmits<{
    update: []
}>()

const operate = ref<DialogOperate>()
const stateData = reactive({
    visible: false, // 弹窗显示
    menuData: [] as Prisma.MenuUncheckedCreateInput[], // 上级菜单数据
    ready: false,
    hrefList: [
        '/',
        '/about',
        '/product',
        '/news',
        '/service',
        '/recruit',
        '/contact',
    ],

})

const comData = computed(() => {
    if (operate.value === 'add') return { title: '新增菜单' }
    return { title: '修改菜单' }
})
const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        id: 0,
        p_id: 0 as number | '', // 父级id
        title: '',
        title_en: '',
        href: '',
        icon: '',
        sort: 0,

        status: 1, // 1:启用 0:禁用
        imgList: [] as string[], // 图片列表
    },
})

const rules = reactive<FormRules>({
    title: [ // 菜单名称
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    title_en: [ // 菜单名称
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    // name: [
    //     { required: true, pattern: /^[0-9a-zA-Z]+$/, message: '只能输入数字和英文' },
    // ],
    href: [
        // { required: true, pattern: /^(\/([A-Za-z0-9_-]*))+$/, message: '以/开头,后面为字母或数字,不能有空格' },
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    img: [ // 图片
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
})


/**
 * 相同id，及子类设置禁用
 * @param data 树形数据
 * @param val 值
 * @param key val对应的键名
 * @param children 子类集合
 * @param disable 设置禁用的字段，默认使用的是a_disable
 * @returns
 */
function setDisableTree<T = any>(data: T[], val: number | string, key = 'id' as keyof T, children = 'children' as keyof T, disable = 'disabled'): (T & { disabled?: boolean })[] {
    const result = data.map((item: any) => {
        if (item[key] === val || val === '_s_') {
            item[disable] = true
            if (item[children] && item[children].length > 0) {
                // 如果有子集，则把子集作为参数重新执行本方法
                item[children] = setDisableTree(item[children], '_s_', key, children, disable)
            }
        } else {
            if (item[children] && item[children].length > 0) {
                // 如果有子集，则把子集作为参数重新执行本方法
                item[children] = setDisableTree(item[children], val, key, children, disable)
            }
        }
        return item
    })
    return result
}

const openModal = (type: DialogOperate, row?: Menu) => {
    operate.value = type
    let arr = deepClone(props.data)

    if (type === 'edit' && row) { // 修改
        const list = setDisableTree(arr, row?.id || 0, 'id', 'children')
        arr = list

        form.data.id = row.id
        form.data.title = row.title || ''
        form.data.title_en = row.title_en || ''
        form.data.href = row.href || ''
        form.data.sort = row.sort || 0
        form.data.p_id = row.p_id || ''
        form.data.status = row.status ? 1 : 0

        form.data.imgList = row.icon ? [row.icon] : []
    } else { // 新增
        form.data.id = 0
        form.data.title = ''
        form.data.title_en = ''
        form.data.href = ''
        form.data.sort = 0
        form.data.status = 1
        form.data.icon = ''
        form.data.imgList = []

        if (row) form.data.p_id = typeof row.id === 'number' ? row.id : ''
    }
    stateData.menuData = arr
    stateData.visible = true
}

// 取消
const onCancel = () => {
    stateData.visible = false
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onConfirm = useThrottleFn(async () => {
    const isVerify = await useFormVerify(formRef.value)
    console.log(isVerify)
    if (!isVerify) return

    const data: Prisma.MenuUncheckedCreateInput = {
        p_id: Number(form.data.p_id),
        title: form.data.title?.trim() ?? '',
        title_en: form.data.title_en?.trim() ?? '',
        href: form.data.href?.trim() ?? '',
        sort: Number(form.data.sort),
        status: form.data.status ? 1 : 0,
        icon: form.data.icon?.trim() ?? '',
    }

    // // console.log(data)
    if (operate.value === 'add') {
        const res = await ApiFunc(useServerFetch('/api/v1/menu/add', {
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
        const res = await ApiFunc(useServerFetch('/api/v1/menu/edit', {
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
})
</script>

<template>
    <CoDrawer v-model="stateData.visible" :title="comData.title" :loading="btnLoading" :width="{lg:40,md:50,sm:60}" @cancel="onCancel"
        @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :rules="rules" label-width="120px">
            <el-form-item label="上级菜单:" prop="p_id">
                <CoCascader v-model="form.data.p_id" class="w100%" :options="stateData.menuData"
                    :props="{ checkStrictly: true, value: 'id', label: 'title', disabled: 'disabled' }"
                    placeholder="请选择上级菜单" />
            </el-form-item>
            <el-form-item label="菜单名称:" prop="title">
                <el-input v-model="form.data.title" maxlength="20" placeholder="请输入菜单名称" clearable />
            </el-form-item>

            <el-form-item label="英文菜单名称:" prop="title_en">
                <el-input v-model="form.data.title_en" maxlength="30" placeholder="请输入英文菜单名称" clearable />
            </el-form-item>
            <el-form-item label="链接地址:" prop="href">
                <el-select v-model="form.data.href" clearable filterable allow-create :disabled="operate === 'edit'">
                    <el-option v-for="(item, index) in stateData.hrefList" :key="index" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="展示图:" :prop="`${!form.data.p_id && form.data.href !== '/' ? 'img' : ''}`">
                <div class="w100% flex">
                    <CoUploadPhoto v-model="form.data.imgList" :limit="1" />
                    <span class="ml5px text-12px">顶级菜单请添加图片!</span>
                </div>
            </el-form-item> -->

            <el-form-item label="排序:">
                <el-input-number v-model="form.data.sort" :min="0" :max="10000" controls-position="right" placeholder=""
                    class="w100%" />
            </el-form-item>
            <el-form-item label="状态:">
                <el-switch v-model="form.data.status" inline-prompt active-text="显示" inactive-text="隐藏"
                    :active-value="1" :inactive-value="0" />
            </el-form-item>
        </el-form>
    </CoDrawer>
</template>

<style lang="scss" scoped>
.check-box {
    >.el-checkbox {
        margin-right: 15px;
    }

    :deep(.el-checkbox-group) {
        .el-checkbox {
            margin-right: 0;

            +.el-checkbox {
                margin-left: 15px;
            }
        }
    }
}
</style>
