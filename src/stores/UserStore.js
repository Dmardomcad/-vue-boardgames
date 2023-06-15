import { defineStore } from "pinia"

export const useUserStore = defineStore("UserStore", {
    state: () => ({
        isLoggedIn: false,
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
    }),
    actions: {
        login(bool) {
            this.isLoggedIn = true
            localStorage.setItem('isLoggedIn', bool.toString())
        },
        logout(){
            this.isLoggedIn = false,
            this.username = '',
            localStorage.clear()
        },
        setToken(token) {
            this.toke = token,
            localStorage.setItem('token', token)
        }
    }
})