import { defineStore } from "pinia"

export const useUserStore = defineStore("UserStore", {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        login() {
            this.isLoggedIn = true
        },
        logout(){
            this.isLoggedIn = false
        }
    }
})