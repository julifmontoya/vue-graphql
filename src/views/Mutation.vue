<template>
    <button @click="sendMessage">Send message</button>
  </template>
  
  <script setup>
  import gql from "graphql-tag";
  import { useMutation } from "@vue/apollo-composable";
  
  // Define the mutation
  const MUTATE_INSERT_USERS = gql`
    mutation Mutation($objects: [users_insert_input!]!) {
      insert_users(objects: $objects) {
        affected_rows
        returning {
          id
          name
          timestamp
        }
      }
    }
  `;
  
  // Define the data to be sent as variables
  const necessaryData = {
    objects: [
      {
        name: "John Doe", // Example data, adjust as needed
        timestamp: new Date().toISOString(),
      },
    ],
  };
  
  // Use the useMutation hook to create a mutate function
  const { mutate, onDone, onError } = useMutation(MUTATE_INSERT_USERS, {
    variables: necessaryData,
  });
  
  // Function to execute the mutation
  const sendMessage = () => {
    mutate()
      .then((response) => {
        console.log("Mutation successful:", response.data);
      })
      .catch((error) => {
        console.error("Error occurred during mutation:", error);
      });
  };
  
  // Optional: handle the completion and error events
  onDone(({ data }) => {
    console.log("Mutation completed successfully:", data);
  });
  
  onError((error) => {
    console.error("Error in mutation:", error);
  });
  </script>
  