import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMenuFilters } from './useMenuFilters';

const menu = [
    { id: 1, name: 'Margherita', category: 'Pizza', price: 10, available: true, image: '' },
    { id: 2, name: 'Pepperoni', category: 'Pizza', price: 12, available: false, image: '' },
    { id: 3, name: 'Coke', category: 'Drink', price: 3, available: true, image: '' },
];

describe('useMenuFilters', () => {
    it('filters by search, category, and availability', () => {
        const { result } = renderHook(() => useMenuFilters(menu));
        expect(result.current.filtered).toHaveLength(3);
        act(() => result.current.setSearch('pe'));
        expect(result.current.filtered.map(i => i.name)).toEqual(['Pepperoni']);
        act(() => result.current.setOnlyAvailable(true));
        expect(result.current.filtered).toHaveLength(0);
        act(() => result.current.setSearch(''));
        act(() => result.current.setCategory('Pizza'));
        expect(result.current.filtered.map(i => i.name)).toEqual(['Margherita']);
    });
});


