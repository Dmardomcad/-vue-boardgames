<template>
  <h1>{{ publisher.name }}</h1>
  <h2>Juegos:</h2>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      publisher: "",
    };
  },
  mounted() {
    this.fetchPublisherDetails();
  },
  methods: {
    fetchPublisherDetails() {
      const publisherID = this.$route.params.id;
      axios
        .get(
          `https://boardgameapi-production.up.railway.app/publishers/${publisherID}`
        )
        .then((response) => {
          this.publisher = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
