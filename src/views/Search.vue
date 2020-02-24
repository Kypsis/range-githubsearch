<template>
  <div class="search">
    <h1>Search</h1>
    <div id="example-1">
      <div v-for="result in results" :key="result.id">
        {{ result.full_name }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from "@/components/HelloWorld.vue"; */

export default {
  name: "Search",
  components: {
    /* HelloWorld */
  },
  created: function() {
    this.$store.dispatch("fetchData", "studio");
  },
  data: () => ({}),
  computed: {
    results: function() {
      return this.$store.state.results;
    }
  },
  watch: {},
  methods: {}
};
</script>
