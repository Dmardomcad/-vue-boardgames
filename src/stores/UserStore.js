import { defineStore } from "pinia"

export const useUserStore = defineStore("UserStore", {
    state: () => ({
        isLoggedIn: true,
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