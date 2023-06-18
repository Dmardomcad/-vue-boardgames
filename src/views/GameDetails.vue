<template>
  <div>
    <h1>Detalles del juego</h1>
    <h2>{{ game.name }}</h2>
    <img :src="game.detailImage" :alt="game.name" />
    <h3>Dificultad: {{ game.difficulty }}</h3>
    <p>Descripcion: {{ game.description }}</p>
    <h2>ID del juego: {{ $route.params.id }}</h2>
  </div>
  <div v-if="comments.length > 0">
    <h2>Comentarios:</h2>
    <form v-if="isLoggedIn" @submit.prevent="submitComment">
      <label for="comment">Aquí tu comentario</label>
      <input
        type="text"
        placeholder="Comentario..."
        name="comment"
        maxlength="201"
        v-model="commentData.content"
        @input="validateComment"
        @keydown.space.prevent
      />
      <span v-if="commentErrors.errorText">{{ commentErrors.errorText }}</span>
      <button type="submit">Send comment</button>
    </form>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <h4>{{ comment.username }}</h4>
        <p>{{ comment.content }}</p>
        <button
          v-if="isCommentOwner(comment)"
          @click="deleteComment(comment.id)"
        >
          BORRAR COMENTARIO
        </button>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2>Este juego no tiene comentarios</h2>
    <form v-if="isLoggedIn" @submit.prevent="submitComment">
      <label for="comment">Se el primero en comentar...</label>
      <input
        type="text"
        placeholder="Comentario..."
        name="comment"
        maxlength="201"
        v-model="commentData.content"
        @input="validateComment"
        @keydown.space.prevent
      />
      <span v-if="commentErrors.errorText">{{ commentErrors.errorText }}</span>
      <button type="submit">Send comment</button>
    </form>
  </div>
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

<style lang="scss" scoped></style>
