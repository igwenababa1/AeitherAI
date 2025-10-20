import React from 'react';

const defaultProducts = [
    {
        id: 1,
        name: 'Quantum Laptop',
        price: '$1499.99',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Aether Headphones',
        price: '$199.99',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Chrono Smartwatch',
        price: '$249.99',
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Nova Smartphone',
        price: '$899.99',
        imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop',
    },
];

interface ECommercePreviewProps {
  products?: {
    name: string;
    price: string;
  }[];
}

export const ECommercePreview: React.FC<ECommercePreviewProps> = ({ products: dynamicProducts }) => {
    const productsToRender = (dynamicProducts && dynamicProducts.length > 0)
        ? dynamicProducts.map((product, index) => ({
            ...product,
            id: index + 1,
            imageUrl: defaultProducts[index % defaultProducts.length].imageUrl,
        }))
        : defaultProducts;

    return (
        <div className="w-full h-full bg-gray-100 text-gray-800 font-sans rounded-b-lg flex flex-col">
            <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">AetherWear</h1>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Cart (0)</span>
                </div>
            </header>
            <main className="flex-grow p-6 overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productsToRender.map(product => (
                        <div key={product.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                <p className="text-gray-700 font-semibold mt-1">{product.price}</p>
                                <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};