# How to Integrate GraphQL with Vue 3
This guide will walk you through integrating GraphQL with Vue 3 using Apollo Client to manage queries. The setup will use @vue/apollo-composable for Vue 3 compatibility, allowing easy integration of GraphQL queries and mutations.

## Step 1: Setting up a GraphQL Client
First, install the necessary dependencies:

```bash
npm install @apollo/client @vue/apollo-composable graphql graphql-tag
```

## Step 2: Configure Apollo Client
Create an Apollo Client instance in a new file to connect to your GraphQL API. Here, we'll connect to the SpaceX API as an example.

### src/apollo.js
```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

export default apolloClient;
```

## Step 3: Set Up Vue Apollo Provider
In your main application file, import the Apollo Client and configure it with Vue’s Apollo composable to make it available to your components.

### src/main.js
```javascript
import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router'
import apolloClient from '../src/apollo';

const app = createApp({
  setup() {
    // Provide the Apollo Client to the entire app
    provide(ApolloClients, {
      default: apolloClient, // Register the Apollo Client instance
    });
  },
  render: () => h(App),
});

app.use(router);
app.mount('#app');
```

## Step 4: Create Components for GraphQL Queries
Now, create Vue components that use the Apollo Client to make queries. Below are two examples: a list of rockets and a detail view for a single rocket.

### RocketList.vue
This component retrieves and displays a list of rockets from the GraphQL API.

```javascript
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
```

### RocketItem.vue
This component retrieves details for a specific rocket based on the id passed through the route.

```javascript
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
```

## Step 5: Run
```bash
npm run dev
```