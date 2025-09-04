import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMenuData } from './useMenuData';

describe('useMenuData', () => {
    it('loads menu and handles loading state', async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useMenuData());
        expect(result.current.loading).toBe(true);
        await vi.advanceTimersByTimeAsync(1000);
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.menu.length).toBeGreaterThan(0);
        vi.useRealTimers();
    });
});


