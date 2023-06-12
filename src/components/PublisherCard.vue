<template>
    <div>
        <h2>{{ publisher.name }}</h2>
    </div>
</template>

<script>
    export default {
        props: {
            publisher: {
                Type: Object,
                required: true,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>