import type { IMenuItem } from '../types/common';

interface MenuItemProps {
    item: IMenuItem;
    addToCart: (item: IMenuItem) => void;
}

const MenuItem = ({ item, addToCart }: MenuItemProps) => {
    return (
        <div
            className="rounded-md border-[1px] border-slate-100 p-4 flex flex-col  h-fit hover:shadow-xl"
        >
            <img
                src={item.image}
                alt={item.name}
                className="h-32 w-full object-cover rounded"
            />
            <h3 className="font-semibold text-xl mt-2 text-left">{item.name}</h3>
            <div className="flex items-center justify-between">
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <span
                    className={`text-sm px-2 py-1 rounded-md w-fit mt-1 ${item.available ? "bg-green-100 text-green-700" : "bg-gray-200"
                        }`}
                >
                    {item.available ? "Available" : "Sold out"}
                </span>
            </div>
            <button
                disabled={!item.available}
                onClick={() => addToCart(item)}
                className="mt-2 !bg-orange-500 text-white rounded py-1 px-3 disabled:cursor-not-allowed disabled:!bg-gray-400"
            >
                Add to cart
            </button>
        </div>
    )
}

export default MenuItem