<template>
  <div class="bookmarks">
    <h1>Bookmarks</h1>
    <div id="bookmarks-item" v-for="bookmark in bookmarks" :key="bookmark.link">
      <div @click.stop="linkToRepo(bookmark.slug)">{{ bookmark.link }}</div>
      <div @click="removeBookmark(bookmark.link)">Remove</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from "@/components/HelloWorld.vue"; */

export default {
  name: "Bookmarks",
  components: {
    /* HelloWorld */
  },
  computed: {
    bookmarks: function() {
      return this.$store.state.bookmarks;
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
