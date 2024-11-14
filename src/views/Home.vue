<template>
  <p v-show="loading">Loading...</p>

  <!-- Check if the data is loaded and available -->
  <div v-if="result">
    <h2>{{ result.company.name }}</h2>
    <p><strong>Founded:</strong> {{ result.company.founded }}</p>
    <p><strong>Founder:</strong> {{ result.company.founder }}</p>
    <p><strong>Summary:</strong> {{ result.company.summary }}</p>
  </div>

  <p v-else-if="error">Error: {{ error.message }}</p>
</template>

<script setup>
import gql from "graphql-tag"
import { useQuery } from "@vue/apollo-composable"

const QUERY = gql`
  query Company {
    company {
      founded
      founder
      name
      summary
    }
  }
`
const { result, loading, error } = useQuery(QUERY)
</script>