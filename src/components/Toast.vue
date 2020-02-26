<template>
  <div id="toast-container">
    <b>{{ toastMessage }}</b>
    <div id="toast-undo" @click="undoBookmark">Undo</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  created: function() {
    this.hideToast();
  },
  data: function() {
    return {
      timer: null
    };
  },
  computed: {
    toastMessage: function() {
      return this.$store.state.toastMessage;
    }
  },
  methods: {
    hideToast: function() {
      this.$store.dispatch("hideToast");
    },
    undoBookmark: function() {
      this.$store.dispatch("undoBookmark");
    }
  }
};
</script>

<style lang="scss" scoped>
#toast-container {
  align-items: center;
  background-color: #4db050;
  border-radius: 3px;
  bottom: 4em;
  color: white;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  position: absolute;
  height: 2em;
  width: 14em;

  -webkit-box-shadow: 0px 9px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 9px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 9px 12px -7px rgba(0, 0, 0, 0.75);
}

#toast-undo {
  color: #0000ee;
  cursor: pointer;
}
</style>
