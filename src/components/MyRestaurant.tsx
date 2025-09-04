
import MenuList from "./MenuList";
import Cart from "./Cart";
import Filter from "./Filter";
import { useMenuData } from "../hooks/useMenuData";
import { LoadingMessage, ErrorMessage } from "./ui/Status";
import { useMenuFilters } from "../hooks/useMenuFilters";

export default function MyRestaurant() {
    const { menu, loading, error } = useMenuData();
    const { search, setSearch, onlyAvailable, setOnlyAvailable, category, setCategory, categories, filtered } = useMenuFilters(menu);

    if (loading) return <LoadingMessage />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <main>
            <header className="mb-6" role="banner">
                <h1 className="text-2xl font-bold text-left">My Restaurant</h1>
                <Filter search={search} onlyAvailable={onlyAvailable} setOnlyAvailable={setOnlyAvailable} setSearch={setSearch} categories={categories} category={category} setCategory={setCategory} />
            </header>

            <div className="grid md:grid-cols-3 gap-6 min-h-[30rem]">
                <section aria-labelledby="menu-heading" className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <h2 id="menu-heading" className="sr-only">Menu items</h2>
                    {filtered.length > 0 ?
                        <MenuList items={filtered} />
                        :
                        <p className="w-full text-center" role="status" aria-live="polite">No items found</p>
                    }
                </section>
                <aside aria-label="Your cart">
                    <Cart />
                </aside>
            </div>
        </main>
    );
}