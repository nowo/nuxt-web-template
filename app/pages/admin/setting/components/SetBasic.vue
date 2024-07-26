<script setup lang="ts">
const props = defineProps<{
    data: ISystemFormSeo & ISystemFormBasic
    type: LanguageType
}>()

const form = reactive({
    data: props.data,
})

// const lang = ref<LanguageType>(props.type)

const lang = computed(() => props.type)
</script>

<template>
    <template v-if="lang === 'cn'">
        <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
            <el-form-item prop="company" label="公司名称：">
                <el-input v-model="form.data.company" maxlength="100" clearable />
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
            <el-form-item prop="address" label="公司地址：">
                <el-input v-model="form.data.address" type="textarea" maxlength="200" clearable show-word-limit />
            </el-form-item>
        </el-col>
    </template>
    <template v-else-if="lang === 'en'">
        <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
            <el-form-item prop="company_en" label="英文公司名称：">
                <el-input v-model="form.data.company_en" maxlength="100" clearable />
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
            <el-form-item prop="address_en" label="英文公司地址：">
                <el-input v-model="form.data.address_en" type="textarea" maxlength="200" clearable show-word-limit />
            </el-form-item>
        </el-col>
    </template>
    <div class="w100%" />
    <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
        <el-form-item prop="phone" label="联系方式：">
            <el-input v-model="form.data.phone" maxlength="50" clearable />
        </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
        <el-form-item prop="email" label="邮箱：">
            <el-input v-model="form.data.email" maxlength="50" clearable />
        </el-form-item>
    </el-col>
    <!-- <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="seo_title" label="SEO标题：">
            <el-input v-model="form.data.seo_title" maxlength="50" clearable />
        </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="seo_keyword" label="SEO关键字：">
            <el-input v-model="form.data.seo_keyword" maxlength="80" clearable />
        </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item prop="seo_description" label="SEO描述：">
            <el-input v-model="form.data.seo_description" type="textarea" show-word-limit maxlength="150" clearable />
        </el-form-item>
    </el-col> -->
    <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="20">
        <!-- 减少编辑器的初始化加载 -->
        <el-form-item :prop="`filing${lang === 'en' ? '_en' : ''}`" :label="`${lang === 'en' ? '英文' : ''}备案信息：`">
            <CoEditor v-model="form.data[lang === 'en' ? 'filing_en' : 'filing']" :height="230" type="simple" />
        </el-form-item>
    </el-col>
    <!-- <el-col v-else-if="lang === 'en'" :xs="24" :sm="24" :md="22" :lg="20" :xl="20">
        <el-form-item prop="filing_en" label="英文备案信息：">
            <CoEditor v-model="form.data.filing_en" :height="230" type="simple" />
        </el-form-item>
    </el-col> -->
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <div class="flex flex-wrap">
            <el-form-item prop="logo" label="网站logo：" class="min-w200px">
                <CoUploadPhoto v-model="form.data.logo" />
            </el-form-item>
            <el-form-item prop="logo2" label="网站logo2：" class="min-w200px">
                <CoUploadPhoto v-model="form.data.logo2" />
            </el-form-item>
            <el-form-item prop="icon" label="网站图标：" class="min-w200px">
                <CoUploadPhoto v-model="form.data.icon" />
            </el-form-item>
        </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <div class="flex flex-wrap">
            <el-form-item prop="qr_code" label="二维码：" class="min-w200px">
                <CoUploadPhoto v-model="form.data.qr_code" />
            </el-form-item>
        </div>
    </el-col>
    <!-- <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form-item label="英文版" prop="is_en">
            <el-radio-group v-model="form.data.is_en">
                <el-radio :value="true">
                    开启
                </el-radio>
                <el-radio :value="false">
                    关闭
                </el-radio>
            </el-radio-group>
        </el-form-item>
    </el-col> -->
</template>

<style lang="scss" scoped></style>
