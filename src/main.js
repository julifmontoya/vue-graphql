import './assets/main.css'

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

