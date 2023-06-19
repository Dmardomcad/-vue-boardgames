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
    padding: 2vh;
  }
  
  button {
    font-size: 18px;
    padding: 10px;
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    background: dodgerblue;
    color: white;
    border-radius: 4px;
    margin: 0.6rem;
    border-radius: 9999px;
  }
  button:hover {
    background: #29216e;
    cursor: pointer
  }
  button.active {
    background-color: #29216e;
    color: white;
  }
  </style>