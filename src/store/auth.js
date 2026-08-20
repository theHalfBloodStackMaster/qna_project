import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID } from "appwrite";
import { account } from "@/models/client/config";

// Create Zustand store
export const useAuthStore = create()(
  persist(
    immer((set) => ({
      // Initial state
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      // Called after persisted state is restored
      setHydrated() {
        set({ hydrated: true });
      },

      // Check if a user session already exists
      async verifySession() {
        try {
          const session = await account.getSession("current");

          // Store the current session
          set({ session });
        } catch (error) {
          console.log(error);
        }
      },

      // Login existing user
      async login(email, password) {
        try {
          // Create Appwrite session
          const session = await account.createEmailPasswordSession(
            email,
            password,
          );

          // Fetch user details and JWT simultaneously
          const [user, { jwt }] = await Promise.all([
            account.get(),
            account.createJWT(),
          ]);

          // Initialize reputation if it doesn't exist
          if (!user.prefs?.reputation) {
            await account.updatePrefs({
              reputation: 0,
            });
          }

          // Save everything to Zustand
          set({
            session,
            user,
            jwt,
          });

          return { success: true };
        } catch (error) {
          console.log(error);

          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      // Create a new account
      async createAccount(name, email, password) {
        try {
          await account.create(ID.unique(), email, password, name);

          return { success: true };
        } catch (error) {
          console.log(error);

          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      // Logout user
      async logout() {
        try {
          // Remove all active sessions
          await account.deleteSessions();

          // Clear local state
          set({
            session: null,
            jwt: null,
            user: null,
          });
        } catch (error) {
          console.log(error);
        }
      },
    })),
    {
      // Name used for localStorage persistence
      name: "auth",

      // Runs after persisted state is restored
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) {
            state?.setHydrated();
          }
        };
      },
    },
  ),
);
