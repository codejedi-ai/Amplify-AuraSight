"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { getCurrentUser } from "aws-amplify/auth";
import { View, Text, Button, Flex } from "@aws-amplify/ui-react";
import AuthWrapper from "./components/AuthWrapper";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function TodoApp() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <View padding="1rem">
      <Flex justifyContent="space-between" alignItems="center" marginBottom="1rem">
        <Text fontSize="1.5rem" fontWeight="bold">My todos</Text>
        <Button onClick={createTodo}>+ new</Button>
      </Flex>
      <View>
        {todos.length === 0 ? (
          <Text color="gray">No todos yet. Create your first one!</Text>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
              <li key={todo.id} style={{ 
                padding: '0.75rem', 
                marginBottom: '0.5rem', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '0.375rem',
                border: '1px solid #e9ecef'
              }}>
                {todo.content}
              </li>
            ))}
          </ul>
        )}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AuthWrapper>
      <TodoApp />
    </AuthWrapper>
  );
}
