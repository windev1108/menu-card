import { useEffect, useState } from "react";
import type { IMenuItem } from "../types/common";

export function useMenuData() {
    const [menu, setMenu] = useState<IMenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            import("../mock/menu.json")
                .then((data) => {
                    setMenu(data.default);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to load menu");
                    setLoading(false);
                });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return { menu, loading, error };
}

export default useMenuData;


