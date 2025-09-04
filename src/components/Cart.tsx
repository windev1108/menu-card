import { useMemo } from "react";
import { useCartStore } from "../store/CartStore";

export default function Cart() {
    const { items, increase, decrease, remove } = useCartStore();
    const sumaryCart = useMemo(() => {
        const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        return {
            subtotal,
            tax,
            total
        }
    }, [items])

    return (
        <div className="rounded-md shadow-md border-[1px] border-slate-100 p-4 h-fit" aria-live="polite">
            <div className="flex items-center justify-between">
                <h2 className="font-bold mb-4 text-left text-xl" id="cart-heading">Cart</h2>
                <div className="bg-orange-500 p-2 rounded-full w-fit h-6 flex items-center justify-center ">
                    <span className="text-white font-semibold">{items.length}</span>
                </div>
            </div>
            {items.length === 0 && <p className="text-gray-500">Empty cart</p>}
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-2" role="listitem">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-1.5">
                        <button onClick={() => decrease(item.id)} className="px-2 border" aria-label={`Decrease quantity of ${item.name}`}>
                            -
                        </button>
                        <span className="p-2">{item.qty}</span>
                        <button onClick={() => increase(item.id)} className="px-2 border" aria-label={`Increase quantity of ${item.name}`}>
                            +
                        </button>
                        <button
                            onClick={() => remove(item.id)}
                            className="text-red-500 px-2"
                            aria-label={`Remove ${item.name} from cart`}
                        >
                            🗑
                        </button>
                    </div>
                    <span>${(item.qty * item.price).toFixed(2)}</span>
                </div>
            ))}
            <hr className="my-2" />
            <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{`${sumaryCart.subtotal.toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Tax 10%</span>
                <span className="font-semibold">{`${sumaryCart.tax.toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Grand total</span>
                <span className="font-semibold">{`${sumaryCart.total.toFixed(2)}`}</span>
            </div>
            <button className="w-full mt-4 !bg-orange-500 text-white py-2 rounded">
                Checkout
            </button>
        </div>
    );
}