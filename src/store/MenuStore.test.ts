import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMenuStore, selectFilteredMenu } from './MenuStore';

const mockMenu = [
    { id: 1, name: 'Mock A', category: 'X', price: 1, available: true, image: '' },
];

vi.mock('../mock/menu.json', () => ({
    default: mockMenu,
}));

const menu = [
    { id: 1, name: 'Alpha', category: 'X', price: 10, available: true, image: '' },
    { id: 2, name: 'Beta', category: 'X', price: 12, available: false, image: '' },
];

describe('MenuStore', () => {
    beforeEach(() => {
        useMenuStore.setState({ menu: [], loading: false, error: '', search: '', onlyAvailable: false });
    });

    it('sets state and filters with selector', () => {
        const { setMenu, setSearch, toggleOnlyAvailable } = useMenuStore.getState();
        setMenu(menu);
        expect(selectFilteredMenu(useMenuStore.getState())).toHaveLength(2);

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
        expect(useMenuStore.getState().menu).toEqual(mockMenu);
        vi.useRealTimers();
    });
});


