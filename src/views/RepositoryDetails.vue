<template>
  <div>
    Details Page
    <div>{{ repositoryDetails.name }}</div>
    <div>{{ repositoryDetails.owner && repositoryDetails.owner.login }}</div>
    <div>{{ repositoryDetails.stargazers_count }}</div>
    <div>{{ repositoryDetails.forks_count }}</div>
    <VueMarkdown :source="readme"></VueMarkdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown-v2";

export default {
  name: "RepositoryDetails",
  components: { VueMarkdown },
  mounted: function() {
    if (!this.slug) {
      this.$router.replace("/");
    }
    this.$store.dispatch("fetchRepository", this.slug);
    this.$store.dispatch("fetchReadme", this.slug);
  },
  computed: {
    slug: function() {
      return this.$route.params.slug;
    },
    repositoryDetails: function() {
      return this.$store.state.repositoryDetails;
    },
    readme: function() {
      return this.$store.state.readme.substring(0, 2400);
    }
  }
};
</script>

<style lang="scss" scoped></style>
