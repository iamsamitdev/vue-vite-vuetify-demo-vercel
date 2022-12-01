<template>

    <v-app id="inspire">
        
        <v-navigation-drawer v-model="drawer">

            <v-list>
                <v-list-item
                    prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
                    title="John Doe"
                    subtitle="john@email.com"
                    class="pa-md-8"
                >
                    <template v-slot:append>
                        <v-btn
                            size="small"
                            variant="text"
                            icon="mdi-menu-down"
                        ></v-btn>
                    </template>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav>
                <v-list-item prepend-icon="mdi-view-dashboard" value="dashboad" to="/dashboard">{{ t('menu_dashboard') }}</v-list-item>
                <v-list-item prepend-icon="mdi-storefront" value="products" to="/product">{{ t('menu_product') }}</v-list-item>
                <v-list-item prepend-icon="mdi-cart" value="orders" to="/order">{{ t('menu_order') }}</v-list-item>
                <v-list-item prepend-icon="mdi-chart-areaspline" value="reports" to="/report">{{ t('menu_report') }}</v-list-item>
                <v-list-item prepend-icon="mdi-cog" value="settings" to="/setting">{{ t('menu_setting') }}</v-list-item>
            </v-list>

            <div class="d-flex align-end h-50">
                <v-container fluid class="pa-0">
                    <v-divider></v-divider>
                    
                    <v-list nav>
                        <v-list-item prepend-icon="mdi-logout-variant" value="logout">{{ t('menu_logout') }}</v-list-item>
                    </v-list>
                </v-container>
            </div>



        </v-navigation-drawer>

        <v-app-bar>

            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ t(`${route.meta.header}`) }}</v-toolbar-title>

            <v-btn class="text-none" stacked @click="clearCount">
                <v-badge v-if="count.total > 0" :content="count.total" color="error">
                    <v-icon>mdi-store-outline</v-icon>
                </v-badge>
                <v-icon v-if="count.total <= 0">mdi-store-outline</v-icon>
            </v-btn>

            <v-menu open-on-click>
                
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">
                        {{ activeLang }}
                        <v-icon small right icon="mdi-menu-down" />
                    </v-btn>
                </template>

                <v-list dense>
                    <v-list-item v-for="(value, key) in langs" :key="key">
                        <v-btn block variant="plain" @click="handleMenuItemClick(key.toString())">{{ value }}</v-btn>
                    </v-list-item>
                </v-list>

            </v-menu>

            <v-btn v-if="theme.global.current.value.dark" icon="mdi-white-balance-sunny" @click="toggleTheme()"></v-btn>
            <v-btn v-if="!theme.global.current.value.dark" icon="mdi-moon-waning-crescent" @click="toggleTheme()"></v-btn>

        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>

    </v-app>

</template>

<script setup lang="ts">
    
    import { ref, computed, onMounted } from 'vue'
    import { useTheme, useDisplay  } from 'vuetify'
    import { useI18n } from 'vue-i18n'
    import { useRoute } from 'vue-router'
    import { useTitle } from '@vueuse/core'   
    import router from '@/router/index'

    import { db } from '../plugins/firebase'

    const count:any = ref(0)

    // Fetch Product count
    onMounted(() => {
        db.collection("product_counts")
        .onSnapshot((querySnapshot) => {
            count.value = querySnapshot.docs[0].data()
            // console.log(count.value.total)
        })
    })
    
    // Pinia Store
    // import { useCountProduct } from '@/store/index'

    // Object store
    // const store = useCountProduct()

    // Get Meta Router
    const route = useRoute()
    // console.log(route.meta.header)

    // Clear count state
    const clearCount = () => {
        // store.count = 0
        router.push('/product')

        // update store count
        db.collection("product_counts")
        .doc('p_count')
        .update({
            total: 0,
        })
    }

    // Toggle Drawer
    const { lgAndUp } = useDisplay()
    const drawer =  ref(lgAndUp)

    const theme: any = useTheme()

    // Get theme from local storage
    if(localStorage.getItem('theme_store') != null){
        theme.global.name.value = localStorage.getItem('theme_store')?.toString()
    }else{
        theme.global.name.value = 'light'
    }

    // Toggle Theme
    const toggleTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light':'dark'
        // Set to local storage
        localStorage.setItem('theme_store', theme.global.name.value)
    }

    // console.log(theme.global.name.value)

    // Use i18n
    let { t, locale } = useI18n({
        inheritLocale: true,
        useScope: 'global'
    })

    // console.log(locale.value)

    
    // Get Title and Set new value
    const title: any = computed(() => {
        return t(`${route.meta.header}`)
    })

    useTitle(title)


    // Switch Multi Language
    const langs: any =  {
        'en': 'Eng',
        'th': 'ไทย',
        'la': 'ລາວ',
        'kr': '한국어'
    }

    // Toggle Language
    let activeLang = ref(langs[`${locale.value}`])

    function handleMenuItemClick(lang: string) {
        activeLang.value = langs[lang]
        // console.log(lang)
        // console.log(activeLang.value)
        // Set new locale
        locale.value = lang

        // Set language to localStorage
        localStorage.setItem('lang_store', lang)
    }

</script>

<style scoped>

</style>