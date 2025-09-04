import { useMemo, useState } from "react";
import type { IMenuItem } from "../types/common";

export function useMenuFilters(menu: IMenuItem[]) {
    const [search, setSearch] = useState("");
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [category, setCategory] = useState<string>("All");

    const categories = useMemo(() => {
        const unique = Array.from(new Set(menu.map((m) => m.category))).sort();
        return ["All", ...unique];
    }, [menu]);

    const filtered = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const isAllCategory = category === "All";

        return menu.filter((item) => {
            const matchName = item.name.toLowerCase().includes(normalizedSearch);
            const matchAvail = onlyAvailable ? item.available : true;
            const matchCategory = isAllCategory ? true : item.category === category;
            return matchName && matchAvail && matchCategory;
        });
    }, [menu, search, onlyAvailable, category]);

    return {
        // state
        search,
        onlyAvailable,
        category,
        // setters
        setSearch,
        setOnlyAvailable,
        setCategory,
        // derived
        categories,
        filtered,
    } as const;
}

export default useMenuFilters;


