<template>
  <div class="publisher-card">
    <router-link class="publisher-element" :to="'/publishers/' + publisher.id">
      <h2>{{ publisher.name }}</h2>
      <img class="publisher-img" :src="publisher.imagePublisher" alt="" />
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
