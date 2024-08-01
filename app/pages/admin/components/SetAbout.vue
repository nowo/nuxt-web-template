<script setup lang="ts">
import type { Other } from '@prisma/client'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
    type: IOtherType
}>()



const lang = ref<LanguageType>('cn')

const formRef = ref<FormInstance>()
const form = reactive({
    data: {
        title: '', // 公司名称
        title_en: '',
        subtitle: '', // 公司地址
        subtitle_en: '', // 公司地址
        content: '', // 公司地址
        content_en: '', // 公司地址
        img: '', // 图片
        // imgList: [] as string[],
    },
})

const rules = reactive<FormRules>({

    title: [{ required: true, whitespace: true, message: '请输入标题', trigger: 'blur' }],
})

// 初始化数据
const initDefaultData = async () => {
    if (!props.type) return

    const res = await useServerFetch<Other>('/api/v1/other/info', {
        method: 'post',
        body: { type: props.type },
    })

    // console.log('res :>> ', res)
    if (res.code !== 200) return ElMessage.error('网络错误')
    const propsData = res.data

    form.data.title = propsData?.title || ''
    form.data.title_en = propsData?.title_en || ''
    form.data.subtitle = propsData?.subtitle || ''
    form.data.subtitle_en = propsData?.subtitle_en || ''
    form.data.content = propsData?.content || ''
    form.data.content_en = propsData?.content_en || ''
    form.data.img = propsData?.img || ''

}



const [ApiFunc, btnLoading] = useLoadingSubmit()
// 确定
const onSubmit = async () => {
    const param: IOtherInfoUpdate = {
        title: form.data.title?.trim() ?? '',
        title_en: form.data.title_en?.trim() ?? '',
        subtitle: form.data.subtitle?.trim() ?? '',
        subtitle_en: form.data.subtitle_en?.trim() ?? '',
        content: form.data.content?.trim() ?? '',
        content_en: form.data.content_en?.trim() ?? '',
        img: form.data.img ?? '',
        type: props.type,
    }

    const res = await ApiFunc(useServerFetch('/api/v1/other/update', {
        method: 'POST',
        body: param,
    }))

    if (res) ElMessage.success('设置成功')

    // initData?.() // 更新数据
}
// 重置
const onReset = async () => {
    formRef.value?.resetFields()
    initDefaultData()
}


onBeforeMount(() => {
    initDefaultData()
})
</script>

<template>
    <el-form ref="formRef" :model="form.data" :rules="rules" label-position="top">
        <LayoutLang v-model="lang" />
        <div class="pr15px">
            <el-row>
                <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
                    <el-form-item v-if="lang === 'cn'" prop="title" label="标题：">
                        <el-input v-model="form.data.title" maxlength="100" clearable />
                    </el-form-item>
                    <el-form-item v-else-if="lang === 'en'" prop="title_en" label="英文标题名称：">
                        <el-input v-model="form.data.title_en" maxlength="100" clearable />
                    </el-form-item>
                </el-col>
                <el-col v-if="props.type === 'service-mend'" :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
                    <el-form-item v-if="lang === 'cn'" prop="subtitle" label="副标题：">
                        <el-input v-model="form.data.subtitle" maxlength="100" clearable />
                    </el-form-item>
                    <el-form-item v-else-if="lang === 'en'" prop="subtitle_en" label="英文副标题名称：">
                        <el-input v-model="form.data.subtitle_en" maxlength="100" clearable />
                    </el-form-item>
                </el-col>
                <el-col
                    v-if="!(props.type === 'culture' || props.type === 'recruit-cultivate' || props.type === 'service-mend')"
                    :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
                    <el-form-item prop="img" label="图片：">
                        <CoUploadPhoto v-model="form.data.img" />
                    </el-form-item>
                </el-col>
                <el-col v-if="props.type !== 'organization'" :xs="24" :sm="24" :md="24" :lg="23" :xl="22">
                    <!-- <el-form-item v-if="lang === 'cn'" prop="content" label="描述信息：">
                        <CoEditor v-model="form.data.content" />
                    </el-form-item>
                    <el-form-item v-else-if="lang === 'en'" prop="content_en" label="英文描述信息：">
                        <CoEditor v-model="form.data.content_en" />
                    </el-form-item> -->
                    <!-- 减少编辑器的初始化加载 -->
                    <el-form-item :prop="`content${lang === 'en' ? '_en' : ''}`"
                        :label="`${lang === 'en' ? '英文' : ''}描述信息：`">
                        <CoEditor v-model="form.data[lang === 'en' ? 'content_en' : 'content']" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20px">
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

<style lang="scss" scoped>
.upload {
    --co-upload-picture-card-size: 120px;
}
</style>
