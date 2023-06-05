<template>
    <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/boardgames">Lista de juegos</router-link>
        <div v-if="isLoggedIn">
            <router-link to="/profile"> Perfil</router-link>
        </div>
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