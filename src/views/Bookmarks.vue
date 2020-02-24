<template>
  <div class="bookmarks">
    <h1>Bookmarks</h1>
    <div id="bookmarks-item" v-for="bookmark in bookmarks" :key="bookmark.link">
      <div @click.stop="linkToRepo(bookmark.link)">{{ bookmark.link }}</div>
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
    linkToRepo: function(link) {
      window.open(link, "_blank");
    },
    removeBookmark: function(link) {
      this.$store.dispatch("removeBookmark", link);
    }
  }
};
</script>
