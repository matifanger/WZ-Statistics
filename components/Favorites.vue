<template>
  <div>
    <v-card elevation="0">
      <v-row>
        <v-spacer></v-spacer>

        <v-col cols="12" class="ml-1 mr-1 d-flex flex-wrap">
          <div
            class="mb-1 ml-1"
            v-for="(favorite, index) in favorites"
            :key="index"
          >
            <v-chip
              @click="getUserEmit(index)"
              close
              close-icon="mdi-close"
              @click:close="removeFavorite(index)"
              >{{ favorite }}</v-chip
            >
          </div>
        </v-col>

        <v-spacer></v-spacer>
      </v-row>
    </v-card>

    <v-chip
      @click="addFavorite(username)"
      v-if="canAddUser"
      class="ma-2"
      text-color="white"
    >
      add {{ username }}
      <v-icon right> mdi-plus </v-icon>
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ["username"],
  data() {
    return {
      favorites: [],
      newFavorite: null,
    };
  },
  computed: {
    canAddUser() {
    if (localStorage.getItem("favorites")) {
      try {
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        if (favorites.includes(this.username)) {
          return false
        }
      } catch (e) {
        console.log(e);
      }
    }
    return true
    }
  },
  methods: {
    getUserEmit(index) {
      // ! console.log("emmited");
      this.$emit("searchQueryEmmited", this.favorites[index]);
      this.$emit("getUserEmitted");
    },
    favoriteFixed(favorite) {
      return favorite.replace("#", "%23");
    },
    addFavorite(username) {
      if (username) {
        this.favorites.push(username);
        this.newFavorite = "";
        this.saveFavorite();
      }
      // asegurarse que el usuario efectivamente ha escrito algo
      if (!this.newFavorite) {
        return;
      }
      this.favorites.push(this.newFavorite);
      this.newFavorite = "";
      this.saveFavorite();
    },
    removeFavorite(x) {
      this.favorites.splice(x, 1);
      this.saveFavorite();
    },
    saveFavorite() {
      const parsed = JSON.stringify(this.favorites);
      localStorage.setItem("favorites", parsed);
    },
  },
  mounted() {
    if (localStorage.getItem("favorites")) {
      try {
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>