import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
                primary: '#41b883',
                background: '#fff',
                error: '#d63031',
                info: '#0984e3',
                secondary: '#fdcb6e',
                success: '#00cec9',
                surface: '#fff',
                warning: '#2d3436',
            },
          },
          dark: {
            colors: {
                primary: '#121212',
                background: '#121212',
                error: '#d63031',
                info: '#0984e3',
                secondary: '#fdcb6e',
                success: '#00cec9',
                surface: '#121212',
                warning: '#2d3436',
            }
          },
        },
    },
})