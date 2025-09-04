import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMenuStore, selectFilteredMenu } from './MenuStore';

const menu = [
    { id: 1, name: 'Alpha', category: 'X', price: 10, available: true, image: '' },
    { id: 2, name: 'Beta', category: 'X', price: 12, available: false, image: '' },
    { id: 3, name: 'Cola', category: 'Drink', price: 3, available: true, image: '' },
];

describe('MenuStore', () => {
    beforeEach(() => {
        useMenuStore.setState({ menu: [], loading: false, error: '', search: '', onlyAvailable: false });
    });

    it('sets state and filters with selector', () => {
        const { setMenu, setSearch, toggleOnlyAvailable } = useMenuStore.getState();
        setMenu(menu);
        expect(selectFilteredMenu(useMenuStore.getState())).toHaveLength(3);

        setSearch('a');
        expect(selectFilteredMenu(useMenuStore.getState()).map(i => i.name)).toEqual(['Alpha', 'Beta']);

        toggleOnlyAvailable();
        expect(selectFilteredMenu(useMenuStore.getState()).map(i => i.name)).toEqual(['Alpha']);
    });

    it('loadMenu toggles loading and populates menu', async () => {
        vi.useFakeTimers();
        const { loadMenu } = useMenuStore.getState();
        const promise = loadMenu();
        expect(useMenuStore.getState().loading).toBe(true);
        // advance the artificial delay inside loadMenu
        await vi.advanceTimersByTimeAsync(1000);
        await promise;
        expect(useMenuStore.getState().loading).toBe(false);
        expect(useMenuStore.getState().menu.length).toBeGreaterThan(0);
        vi.useRealTimers();
    });
});


