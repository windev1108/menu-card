import { useCartStore } from "../store/CartStore";
import type { IMenuItem } from "../types/common";
import MenuItem from "./MenuItem";

export default function MenuList({ items }: { items: IMenuItem[] }) {
    const addToCart = useCartStore((s) => s.addItem);
    return (
        <>
            {items.map((item) => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
            ))}
        </>
    );
}