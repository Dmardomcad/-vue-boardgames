<template>
  <section class="publisher-section">
    <div v-if="loading"><Spinner /></div>
    <div class="publishers-container" v-else>
      <PublisherCard
        v-for="publisher in publishers"
        :key="publisher.id"
        :publisher="publisher"
      />
    </div>
  </section>
</template>

<script>
import PublisherCard from "./PublisherCard.vue";
import Spinner from "./Spinner.vue";
import axios from "axios";

export default {
  components: {
    PublisherCard,
    Spinner,
  },
  data() {
    return {
      loading: true,
      publishers: [],
    };
  },
  mounted() {
    axios
      .get("https://boardgameapi-production.up.railway.app/publishers")
      .then((response) => {
        this.loading = false;
        this.publishers = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped></style>
