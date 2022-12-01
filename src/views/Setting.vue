<template>
    <v-card-actions class="justify-center h-100">
        <v-row justify="center" class="flex-column" style="flex-grow: 0">

            <Datepicker 
                ref="datepicker"
                v-model="date" 
                locale="th"
                :format="format"
                modelType="yyyy-MM-dd HH:mm:ss"  
                placeholder="เลือกวัน" 
                position="center"
                autoApply 
                @update:modelValue="handleDate"
                style="margin-top: 300px">

                <template #year="{ year }">
                    {{ year + 543 }}
                </template>

            </Datepicker>

            <h4 class="mt-4">ค่าที่จะนำไปใช้: {{ date }}</h4>

        </v-row>
    </v-card-actions>
</template>

<script setup lang="ts">

import { ref } from 'vue'

// import { useI18n } from 'vue-i18n'

// // Use i18n
// let { t } = useI18n({
//     inheritLocale: true,
//     useScope: 'global'
// })

// Date Picker
const date = ref()

const format = (date: any) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()

    // return `Selected date is ${day}/${month}/${year}`;
    // return `${day}/${month}/${year+543} ${hour}:${min}:${sec}`
    return `${day}/${month}/${year+543}`
}

const handleDate = (modelData: null) => {
    date.value = modelData
    if(date.value != null){
        console.log(date.value)
    }
}

</script>

<style scoped>

</style>