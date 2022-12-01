import { defineStore } from 'pinia'

export const useCountProduct = defineStore("countproduct", {

    state: () => {
        return{
            count: 0
        }
    },

})