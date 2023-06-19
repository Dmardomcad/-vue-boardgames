<template>
  <h1>Detalles del juego</h1>
  <section class="boardgame-details">
    <h2>{{ game.name }}</h2>
    <img class="boardgame-img" :src="game.detailImage" :alt="game.name" />
    <h3>Dificultad: {{ game.difficulty }}</h3>
    <p>Descripcion: {{ game.description }}</p>
    <h2>ID del juego: {{ $route.params.id }}</h2>
  </section>
  <section class="comments-section" v-if="comments.length > 0">
    <h2>Comentarios:</h2>
    <form class="comment-form" v-if="isLoggedIn" @submit.prevent="submitComment">
      <label class="comment-label" for="comment">Aquí tu comentario</label>
      <input
        class="comment-input"
        type="text"
        placeholder="Comentario..."
        name="comment"
        maxlength="201"
        v-model="commentData.content"
        @input="validateComment"
      />
      <span v-if="commentErrors.errorText">{{ commentErrors.errorText }}</span>
      <button class="btn-primary" type="submit">Enviar comentario</button>
    </form>
    <ul class="comment-list">
      <li class="comment-list-item" :class="{ 'comment-list-item-odd': index % 2 === 1 }" v-for="(comment, index) in comments" :key="comment.id">
        <h2>{{ comment.username }}</h2>
        <p>{{ comment.content }}</p>
        <button
          class="comment-delete-button"
          v-if="isCommentOwner(comment)"
          @click="deleteComment(comment.id)"
        >
          BORRAR COMENTARIO
        </button>
      </li>
    </ul>
  </section>
  <section class="comments-section" v-else>
    <h2>Este juego no tiene comentarios</h2>
    <form class="comment-form" v-if="isLoggedIn" @submit.prevent="submitComment">
      <label class="comment-label" for="comment">Se el primero en comentar...</label>
      <input
        class="comment-input"
        type="text"
        placeholder="Comentario..."
        name="comment"
        maxlength="201"
        v-model="commentData.content"
        @input="validateComment"
      />
      <span v-if="commentErrors.errorText">{{ commentErrors.errorText }}</span>
      <button class="btn-primary" type="submit">Enviar comentario</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/UserStore.js";

export default {
  data() {
    return {
      commentData: {
        content: "",
      },
      commentErrors: {
        errorText: "",
      },
      game: "",
      comments: [],
    };
  },
  mounted() {
    this.fetchGameDetails();
  },
  methods: {
    validateComment() {
      if (this.commentData.content.length > 200) {
        this.commentErrors.errorText = "El comentario es demasiado largo";
      } else if (this.commentData.content.length < 10) {
        this.commentErrors.errorText = "El comentario es demasiado corto";
      } else {
        this.commentErrors.errorText = "";
      }
    },
    fetchGameDetails() {
      const gameId = this.$route.params.id;
      axios
        .get(
          `https://boardgameapi-production.up.railway.app/boardgames/${gameId}`
        )
        .then((response) => {
          this.game = response.data;
          this.comments = response.data.comments || [];
          console.log(this.game.comments);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    submitComment() {
      const token = localStorage.getItem("token");
      const gameId = this.$route.params.id;
      const content = this.commentData.content;
      const username = localStorage.getItem("username");
      if (content.length > 10) {
        axios
          .get(
            `https://boardgameapi-production.up.railway.app/users/${username}`
          )
          .then((response) => {
            const user = response.data;
            const userId = user.id;
            axios
              .post(
                "https://boardgameapi-production.up.railway.app/comments/create",
                {
                  content: content,
                  user: {
                    id: userId,
                  },
                  boardgame: {
                    id: gameId,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log(response.data);
                this.fetchGameDetails();
                this.commentData.content = "";
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.commentErrors.errorText = "Comentario demasiado corto";
      }
    },
    isCommentOwner(comment) {
      const username = localStorage.getItem("username");
      return comment.username === username;
    },
    deleteComment(commentId) {
      const token = localStorage.getItem("token");

      axios
        .delete(
          `https://boardgameapi-production.up.railway.app/comments/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.fetchGameDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    isLoggedIn() {
      const UserStore = useUserStore();
      return UserStore.isLoggedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-primary {
    margin-left: 1rem;
  }
</style>
