<template>
    <div class="paginate">
      <button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
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
        this.$emit('page-change', pageNumber);
      },
    },
  };
  </script>
  
  <style scoped>
  .paginate {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  button {
    margin: 0 5px;
    padding: 10px;
    border: none;
    background-color: #2569a8;
    cursor: pointer;
    border-radius: 20%;
  }
  
  button.active {
    font-weight: bold;
    background-color: #29216e;
  }
  </style>