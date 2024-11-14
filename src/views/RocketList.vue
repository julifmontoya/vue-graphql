<template>
    <div v-if="result && result.rockets">
      <ul>
        <li v-for="item in result.rockets" :key="item.id">
          <router-link :to="{ name: 'Rocket', params: { id: item.id } }">
            <h2>{{ item.name }}</h2>
          </router-link>
          <p>{{ item.description }}</p>
          <p>{{ item.cost_per_launch }}</p>
        </li>
      </ul>
    </div>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
  </template>
  
  <script setup>
  import gql from "graphql-tag";
  import { useQuery } from "@vue/apollo-composable";
  
  const query = gql`
    query getRocket {
      rockets {
        id
        name
        description
        cost_per_launch
        height {
          meters
        }
      }
    }
  `;
  const { result, loading, error } = useQuery(query);
  </script>
  