import { create } from "zustand";
import type { IMenuItem } from "../types/common";

interface MenuState {
    menu: IMenuItem[];
    loading: boolean;
    error: string;
    search: string;
    onlyAvailable: boolean;
    // actions
    setMenu: (items: IMenuItem[]) => void;
    setLoading: (value: boolean) => void;
    setError: (message: string) => void;
    setSearch: (value: string) => void;
    toggleOnlyAvailable: () => void;
    loadMenu: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set, get) => ({
    menu: [],
    loading: true,
    error: "",
    search: "",
    onlyAvailable: false,

    setMenu: (items) => set({ menu: items }),
    setLoading: (value) => set({ loading: value }),
    setError: (message) => set({ error: message }),
    setSearch: (value) => set({ search: value }),
    toggleOnlyAvailable: () => set((s) => ({ onlyAvailable: !s.onlyAvailable })),

    loadMenu: async () => {
        set({ loading: true, error: "" });
        try {
            // mimic existing behavior and code-splitting via dynamic import
            await new Promise((r) => setTimeout(r, 1000));
            const data = await import("../mock/menu.json");
            set({ menu: data.default, loading: false });
        } catch {
            set({ error: "Failed to load menu", loading: false });
        }
    },
}));

// Selector to compute filtered items
export const selectFilteredMenu = (state: MenuState): IMenuItem[] => {
    const { menu, search, onlyAvailable } = state;
    if (!search && !onlyAvailable) return menu;
    const searchLower = search.toLowerCase();
    return menu.filter((item) => {
        const matchName = item.name.toLowerCase().includes(searchLower);
        const matchAvail = !onlyAvailable || item.available;
        return matchName && matchAvail;
    });
};


