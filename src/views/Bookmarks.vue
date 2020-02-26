<template>
  <div class="component-container">
    <Toast v-if="showToast" />
    <h1>Bookmarks</h1>
    <table>
      <tr v-for="bookmark in bookmarks" :key="bookmark.link">
        <td @click.stop="linkToRepo(bookmark.slug)">{{ bookmark.link }}</td>
        <td>
          <div id="bookmarks-remove" @click="removeBookmark(bookmark.link)">
            Remove
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Toast from "@/components/Toast.vue";

export default {
  name: "Bookmarks",
  components: {
    Toast
  },
  computed: {
    bookmarks: function() {
      return this.$store.state.bookmarks;
    },
    showToast: function() {
      return this.$store.state.showToast;
    }
  },
  methods: {
    linkToRepo: function(slug) {
      this.$router.push({
        name: "RepositoryDetails",
        params: {
          slug
        }
      });
    },
    removeBookmark: function(link) {
      this.$store.dispatch("removeBookmark", link);
    }
  }
};
</script>

<style lang="scss" scoped>
#bookmarks-remove {
  background-color: #c33a3a;
  border-radius: 5px;
  color: white;
  padding: 0.4em;
  text-align: center;

  &:hover {
    background-color: #85242c;
  }
}
</style>
