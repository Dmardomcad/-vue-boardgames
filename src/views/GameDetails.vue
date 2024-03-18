<template>
  <h2 class="game-details-title">{{ game.name }}</h2>
  <section class="boardgame-details">
    <img class="boardgame-img" :src="game.detailImage" :alt="game.name" />
    <div class="boardgame-info">
      <p class="boardgame-info-text">
        <strong>Dificultad: </strong>{{ game.difficulty }}
      </p>
      <p class="boardgame-info-text">
        <strong>Categoría: </strong> {{ game.category }}
      </p>
      <p class="boardgame-info-text">
        <strong>Descripcion: </strong> {{ game.description }}
      </p>
    </div>
  </section>
  <section class="comment-section" v-if="comments.length > 0">
    <h2 class="comment-section-title">Comentarios:</h2>
    <form
      class="comment-form"
      v-if="isLoggedIn"
      @submit.prevent="submitComment"
    >
      <div class="comment-field">
        <label class="comment-label" for="comment">Aquí tu comentario:</label>
        <input
          class="comment-input"
          type="text"
          placeholder="Comentario..."
          name="comment"
          maxlength="201"
          v-model="commentData.content"
          @input="validateComment"
        />
        <span class="error" v-if="commentErrors.errorText">{{
          commentErrors.errorText
        }}</span>
        <button class="btn-primary" type="submit">Enviar comentario</button>
      </div>
    </form>
    <ul class="comment-list">
      <li
        class="comment-list-item"
        :class="{ 'comment-list-item-odd': index % 2 === 1 }"
        v-for="(comment, index) in comments"
        :key="comment.id"
      >
        <sub>Por:</sub>
        <h2>{{ comment.username }}</h2>
        <p>{{ comment.content }}</p>
        <button
          class="comment-delete-button"
          v-if="isCommentOwner(comment)"
          @click="deleteComment(comment.id)"
        >
          BORRAR
        </button>
      </li>
    </ul>
  </section>
  <section class="comments-section" v-else>
    <h2 class="comment-section-empty">Este juego no tiene comentarios</h2>
    <form
      class="comment-form"
      v-if="isLoggedIn"
      @submit.prevent="submitComment"
    >
      <div class="comment-field">
        <label class="comment-label" for="comment"
          >Se el primero en comentar:</label
        >
        <input
          class="comment-input"
          type="text"
          placeholder="Comentario..."
          name="comment"
          maxlength="201"
          v-model="commentData.content"
          @input="validateComment"
        />
        <span class="error" v-if="commentErrors.errorText">{{
          commentErrors.errorText
        }}</span>
        <button class="btn-primary" type="submit">Enviar comentario</button>
      </div>
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
    window.scrollTo(0, 0);
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
.error {
  color: red;
}
.btn-primary {
  margin-top: 5px;
}
.comment-section-empty{
  padding: 2rem;
  display: flex;
  justify-content: center;
}
</style>