<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="result && result.rocket">
    <h2>{{ result.rocket.name }}</h2>
    <p>{{ result.rocket.description }}</p>
    <p>Cost per Launch: {{ result.rocket.costPerLaunch }}</p>
  </div>
</template>

<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";

const query = gql`
  query getRocket($id: ID!) {
    rocket(id: $id) {
      id
      name
      description
      costPerLaunch: cost_per_launch
    }
  }
`;

// Use the Vue Router to get the `id` parameter from the route
const route = useRoute();
const { id } = route.params;

// Execute the query with the `id` variable
const { result, loading, error } = useQuery(query, { id });
</script>
