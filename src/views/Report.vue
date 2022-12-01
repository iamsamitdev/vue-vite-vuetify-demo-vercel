<template>
    <div class="pa-8">
        <p>{{ t('lorem_text')}}</p>
    </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'

// Use i18n
let { t } = useI18n({
    inheritLocale: true,
    useScope: 'global'
})

</script>

<style scoped>

</style>