import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(persist(
    (set) => ({
      userAuth: null,
  
      setUserAuth: (user) => set(() => ({
        userAuth: user
      }))
    }),
    {
      name: 'userStore', // clave para el almacenamiento local
      getStorage: () => localStorage // almacenamiento local del navegador
    }
  ));
