import { create } from 'zustand';

export const useNavBarStore = create((set) => ({

  searchText: '',
  productFromDb: "",

  setSearchText: (searchText) => set({ searchText }),
}));
