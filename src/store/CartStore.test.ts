import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useBaseCartStore } from './CartStore';

const itemA = { id: 1, name: 'A', category: 'Cat', price: 10, available: true, image: '' };
const itemB = { id: 2, name: 'B', category: 'Cat', price: 5, available: true, image: '' };

describe('CartStore', () => {
    beforeEach(() => {
        useBaseCartStore.setState({ items: [] });
    });

    afterEach(() => {
        useBaseCartStore.setState({ items: [] });
    });

    it('adds, increases, decreases and removes items', () => {
        const { addItem, increase, decrease, remove, items: initial } = useBaseCartStore.getState();
        expect(initial).toHaveLength(0);

        addItem(itemA);
        addItem(itemA);
        addItem(itemB);
        expect(useBaseCartStore.getState().items).toEqual([
            { ...itemA, qty: 2 },
            { ...itemB, qty: 1 },
        ]);

        increase(2);
        expect(useBaseCartStore.getState().items.find(i => i.id === 2)?.qty).toBe(2);

        decrease(2);
        expect(useBaseCartStore.getState().items.find(i => i.id === 2)?.qty).toBe(1);

        decrease(2); // should remove when qty goes to 0
        expect(useBaseCartStore.getState().items.find(i => i.id === 2)).toBeUndefined();

        remove(1);
        expect(useBaseCartStore.getState().items).toHaveLength(0);
    });
});


