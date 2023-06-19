<template>
  <input
    class="game-searchbar"
    type="text"
    placeholder="Buscar juegos..."
    v-model="searchTerm"
    @input="search"
  />
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style lang="scss" scoped></style>
