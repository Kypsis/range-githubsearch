<template>
  <div id="toast-container">
    {{ toastMessage }}
    <div @click="undoBookmark">Undo</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  mounted: function() {
    setTimeout(this.hideToast, 3000);
  },
  computed: {
    toastMessage: function() {
      return this.$store.state.toastMessage;
    }
  },
  methods: {
    undoBookmark: function() {
      this.$store.dispatch("undoBookmark");
    },
    hideToast: function() {
      this.$store.dispatch("hideToast");
    }
  }
};
</script>

<style lang="scss" scoped>
#toast-container {
  background-color: cyan;
  position: absolute;
}
</style>
