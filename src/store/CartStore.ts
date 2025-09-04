import { create } from "zustand";
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import type { IMenuItem } from "../types/common";

type CartItem = IMenuItem & { qty: number };

type CartState = {
    items: CartItem[];
    addItem: (item: IMenuItem) => void;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    remove: (id: number) => void;
};

export const useBaseCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item) =>
        set((state) => {
            const exists = state.items.find((i) => i.id === item.id);
            if (exists) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...item, qty: 1 }] };
        }),
    increase: (id) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + 1 } : i
            ),
        })),
    decrease: (id) =>
        set((state) => ({
            items: state.items
                .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0),
        })),
    remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}));

export const useCartStore = createSelectorFunctions(useBaseCartStore);
