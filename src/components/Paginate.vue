<template>
  <div class="paginate">
    <button class="before-next"
    @click="previousPage()"> &lt;</button>
    <button class="paginate-button"
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="{ active: pageNumber === currentPage }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button class="before-next"
    @click="nextPage()"> > </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("page-change", pageNumber);
    },
  },
};
</script>

<style scoped>

</style>
