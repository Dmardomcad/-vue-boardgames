<template>
  <div>
    <router-link :to="'/publishers/' + publisher.id">
      <h2>{{ publisher.name }}</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    publisher: {
      Type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
