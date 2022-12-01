import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import th from '../locales/th.json'
import la from '../locales/la.json'
import kr from '../locales/kr.json'

// Get Language from Local Storage
let local_store_lang

if(localStorage.getItem('lang_store') != null) {
    local_store_lang = localStorage.getItem('lang_store')
 }else{
    local_store_lang = 'en'
}

export default createI18n({
    locale: local_store_lang?.toString(),
    fallbackLocale: local_store_lang?.toString(),
    messages: {
        en,
        th,
        la,
        kr
    }
})