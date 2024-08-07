<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import SetSeo from './SetSeo.vue'
import SetBasic from './SetBasic.vue'

const props = defineProps<{
    type?: 'basic' | 'seo'
}>()

const { systemInfo, setSystemUpdate } = await useSystemState()

const lang = ref<LanguageType>('cn')

const formRef = ref<FormInstance>()
const form = reactive<{ data: ISystemFormBasic & ISystemFormSeo }>({

    data: {
        company: '', // 公司名称
        address: '', // 公司地址

        company_en: '',
        address_en: '', // 公司地址

        phone: '', // 公司电话
        email: '', // 公司邮箱

        logo: '', // 网站logo
        logo2: '', // 网站logo
        qr_code: '', // 二维码

        filing: '', // 备案号
        copyright: '', // 版权信息
        filing_en: '', // 备案号
        copyright_en: '', // 版权信息

        icon: '', // 网站图标
        is_en: true, // 是否开启英文版

        seo_title: '', // seo标题
        seo_keyword: '', // 关键词
        seo_description: '', // 描述
    },
})

const rules = reactive<FormRules>({

    company: [{ required: true, whitespace: true, message: '请输入公司名称', trigger: 'blur' }],
    seo_title: [{ required: true, whitespace: true, message: '请输入公司名称', trigger: 'blur' }],
})

// 初始化数据
const initDefaultData = async () => {
    const propsData = systemInfo.value

    form.data.company = propsData?.company || ''
    form.data.company_en = propsData?.company_en || ''
    form.data.address = propsData?.address || ''
    form.data.address_en = propsData?.address_en || ''
    form.data.logo = propsData?.logo || ''
    form.data.logo2 = propsData?.logo2 || ''
    form.data.qr_code = propsData?.wx_code || ''
    form.data.phone = propsData?.phone || ''
    form.data.email = propsData?.email || ''
    form.data.seo_title = propsData?.title || ''
    form.data.seo_keyword = propsData?.keyword || ''
    form.data.seo_description = propsData?.description || ''
    form.data.filing = propsData?.filing || ''
    form.data.icon = propsData?.icon || ''
    form.data.is_en = !!propsData?.is_en
}

const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onSubmit = async () => {
    const isVerify = await useFormVerify(formRef.value)
    if (!isVerify) return

    const param: ISystemEditParams = {
        company: form.data.company?.trim() ?? '',
        company_en: form.data.company_en?.trim() ?? '',

        address: form.data.address?.trim() ?? '',

        address_en: form.data.address_en?.trim() ?? '',
        phone: form.data.phone?.trim() ?? '',
        email: form.data.email?.trim() ?? '',
        logo: form.data.logo?.trim() ?? '',
        logo2: form.data.logo2?.trim() ?? '',
        wx_code: form.data.qr_code?.trim() ?? '',
        // title_en: '',
        title: form.data.seo_title?.trim() ?? '',
        keyword: form.data.seo_keyword?.trim() ?? '',
        description: form.data.seo_description?.trim() ?? '',
        filing: form.data.filing?.trim() ?? '',
        // copyright: form.data.copyright?.trim() ?? '',
        filing_en: form.data.filing_en?.trim() ?? '',
        // copyright_en: form.data.copyright_en?.trim() ?? '',
        icon: form.data.icon?.trim() ?? '',
        is_en: form.data.is_en,
    }

    const res = await ApiFunc(setSystemUpdate(param))

    if (res) ElMessage.success('设置成功')

    // initData?.() // 更新数据
}
// 重置
const onReset = async () => {
    formRef.value?.resetFields()
    initDefaultData()
}

onMounted(() => {
    initDefaultData()
})
</script>

<template>
    <el-form ref="formRef" :model="form.data" :rules="rules" label-position="top">
        <el-tabs v-model="lang">
            <el-tab-pane label="中文" name="cn" />
            <el-tab-pane label="英文" name="en" />
        </el-tabs>
        <div class="pr20px">
            <el-row :gutter="20">
                <SetSeo v-if="props.type === 'seo'" :data="form.data" :type="lang" />
                <SetBasic v-else :data="form.data" :type="lang" />

                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item>
                        <el-button type="primary" :loading="btnLoading" @click="onSubmit">
                            确定
                        </el-button>
                        <el-button @click="onReset">
                            重置
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
    </el-form>
</template>

<style lang="scss" scoped></style>
