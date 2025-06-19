import axios from "axios";
import { create } from "zustand";

const base_url: string = "http://localhost:3000";

interface FormData {
  category: string;
  title: string;
  content: string;
}

interface Note {
  id: number;
  category: string;
  title: string;
  content: string;
}

interface NoteStore {
  notes: Note[];
  loading: boolean;
  error: string | null;

  formData: FormData;
  setFormData: (formData: FormData) => void;
  resetFormData: () => void;

  filters: {
    categories: string[];
  };
  setFilters: (filters: { categories: string[] }) => void;

  createNote: (e: React.FormEvent) => Promise<void>;
  getAllNotes: () => Promise<void>;
  getNote: (id: string | undefined) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  updateNote: (id: number) => Promise<void>;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  formData: {
    category: "",
    title: "",
    content: "",
  },

  filters: {
    categories: [],
  },

  setFilters: (filters) => set({ filters }),

  setFormData: (formData) => set({ formData }),

  resetFormData: () =>
    set({ formData: { title: "", category: "", content: "" } }),

  createNote: async (e) => {
    e.preventDefault();
    try {
      const { formData } = get();
      await axios.post(`${base_url}/api/notes`, formData);
      await get().getAllNotes();
      get().resetFormData();
    } catch (err) {
      set({ error: `Error: ${err}` });
    } finally {
      set({ loading: false });
    }
  },

  getNote: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${base_url}/api/notes/${id}`);
      set({ formData: response.data, error: null });
    } catch (err) {
      set({ error: `Error: ${err}` });
    } finally {
      set({ loading: false });
    }
  },

  getAllNotes: async () => {
    set({ loading: true });
    try {
      const { filters } = get();
      let url = `${base_url}/api/notes`;

      if (filters.categories.length > 0) {
        const categoriesQuery = filters.categories.join(",");
        url += `?categories=${encodeURIComponent(categoriesQuery)}`;
      }
      
      const response = await axios.get(`${url}`);
      set({ notes: response.data, error: null });
    } catch (err) {
      set({ error: `Error: ${err}` });
    } finally {
      set({ loading: false });
    }
  },

  deleteNote: async (id: number) => {
    set({ loading: true });
    try {
      await axios.delete(`${base_url}/api/notes/${id}`);
      set((prev) => ({
        notes: prev.notes.filter((note) => note.id !== id),
      }));
    } catch (err) {
      set({ error: `Error: ${err}` });
    } finally {
      set({ loading: false });
    }
  },

  updateNote: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.put(`${base_url}/api/notes/${id}`, formData);
      await get().getAllNotes();
      get().resetFormData();
    } catch (err) {
      set({ error: `Error: ${err}` });
    } finally {
      set({ loading: false });
    }
  },
}));
