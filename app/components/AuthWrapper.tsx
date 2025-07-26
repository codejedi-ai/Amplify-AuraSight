"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Authenticator, Button, Flex, Heading, View, useTheme } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { tokens } = useTheme();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  if (isLoading) {
    return (
      <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.medium}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading level={3}>AuraSight</Heading>
          <Button isLoading>Loading...</Button>
        </Flex>
      </View>
    );
  }

  return (
    <View>
      <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.medium}
        style={{ borderBottom: `1px solid ${tokens.colors.border.primary}` }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading level={3}>AuraSight</Heading>
          <Flex gap={tokens.space.small} alignItems="center">
            {user ? (
              <>
                <View fontSize={tokens.fontSizes.small} color={tokens.colors.font.secondary}>
                  Welcome, {user.username}
                </View>
                <Button onClick={handleSignOut} variation="link">
                  Sign Out
                </Button>
              </>
            ) : (
              <View fontSize={tokens.fontSizes.small} color={tokens.colors.font.secondary}>
                Please sign in to continue
              </View>
            )}
          </Flex>
        </Flex>
      </View>
      
      {user ? (
        children
      ) : (
        <View padding="2rem">
          <Authenticator initialState="signIn" />
        </View>
      )}
    </View>
  );
} 