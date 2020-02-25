<template>
  <div>
    Details Page
    <div>{{ repositoryDetails.name }}</div>
    <div>{{ repositoryDetails.owner.login }}</div>
    <div>{{ repositoryDetails.stargazers_count }}</div>
    <div>{{ repositoryDetails.forks_count }}</div>
  </div>
</template>

<script>
export default {
  name: "RepositoryDetails",
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
