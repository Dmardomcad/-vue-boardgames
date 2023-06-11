<template>
    <nav class="nav-main">
        <ul class="nav-list">
            <li class="nav-item"><router-link to="/">Inicio</router-link></li>
            <li class="nav-item"> <router-link to="/boardgames">Lista de juegos</router-link></li>
            <li class="nav-item" v-if="isLoggedIn">
                <router-link to="/profile"> Perfil</router-link>
            </li>
            <li class="nav-item" v-else>
                <router-link to="/register"> <button class="btn-primary">REGISTRARSE</button></router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import { computed } from 'vue'
    import { useUserStore } from '@/stores/UserStore.js'

    export default {
        setup() {
            const userStore = useUserStore()
            const isLoggedIn = computed(()=> userStore.isLoggedIn)

            return {
                isLoggedIn
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>