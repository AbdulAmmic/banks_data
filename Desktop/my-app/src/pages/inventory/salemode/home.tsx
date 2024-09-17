import React, { useState } from "react";
import Header from "../../../components/salesMode.header";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  isInCart: boolean;
  inputQuantity: number; // For input quantity
}

const SalesMode: React.FC = () => {
  const [pendingCount, setPendingCount] = useState<number>(5); // Example pending count
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Paracetamol",
      quantity: 100,
      price: 50,
      image: "https://via.placeholder.com/50",
      isInCart: false,
      inputQuantity: 1,
    },
    {
      id: 2,
      name: "Amoxicillin",
      quantity: 50,
      price: 200,
      image: "https://via.placeholder.com/50",
      isInCart: false,
      inputQuantity: 1,
    },
    {
      id: 3,
      name: "Cough Syrup",
      quantity: 30,
      price: 350,
      image: "https://via.placeholder.com/50",
      isInCart: false,
      inputQuantity: 1,
    },
    {
      id: 4,
      name: "Vitamin C Tablets",
      quantity: 120,
      price: 150,
      image: "https://via.placeholder.com/50",
      isInCart: false,
      inputQuantity: 1,
    },
    {
      id: 5,
      name: "Ibuprofen",
      quantity: 80,
      price: 100,
      image: "https://via.placeholder.com/50",
      isInCart: false,
      inputQuantity: 1,
    },
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (filteredProducts.length === 0 && query !== "") {
      setNotFoundMessage(`Cannot find:${query}`);
    } else {
      setNotFoundMessage(null);
    }
  };
  


  // Filtered products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle add/remove from cart
  const handleCartToggle = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.isInCart) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems([...cartItems, { ...product, inputQuantity: 1 }]);
    }

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, isInCart: !p.isInCart } : p
      )
    );
  };

  // Handle input quantity change
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, inputQuantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, isInCart: false } : p
      )
    );
  };

  // Calculate totals
  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.inputQuantity * item.price, 0);
  const subtotal = calculateSubtotal();
  const total = subtotal - discount + deliveryFee + vat;
  const handleNewInventory = () => {
    // Logic to start a new inventory purchase, e.g., resetting state or navigating to a new page
   alert("You will reset the inventory and create another one?");
   navigate('/sell_mode');
    
  };
const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        pendingCount={pendingCount}
        onSearchChange={handleSearchChange}
        onNewInventory={handleNewInventory} 
      />

      <div className="p-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Card 1 - 70% of the screen width */}
        <div className="bg-white rounded-md w-full lg:w-7/10 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Products 
          </h3>

          {/* Product Table */}
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">S/N</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Qnty.</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product, index) => (
      <tr key={product.id} className="border-t border-gray-300">
        <td className="py-2 px-4">{index + 1}</td>
        <td className="py-2 px-4">
          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
        </td>
        <td className="py-2 px-4">{product.name}</td>
        <td className="py-2 px-4">
          <input
            type="number"
            value={product.inputQuantity}
            min="1"
            max={product.quantity}
            onChange={(e) => handleQuantityChange(product.id, +e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-16"
          />
        </td>
        <td className="py-2 px-4">₦{product.price.toLocaleString()}</td>
        <td className="py-2 px-4">
          <button
            className={`px-3 py-2 rounded flex items-center space-x-2 ${
              product.isInCart
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => handleCartToggle(product.id)}
          >
            <AiOutlineShoppingCart />
            <span>{product.isInCart ? "Remove" : "Add"}</span>
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="py-4 text-center text-gray-600">
        {notFoundMessage || "No products found"}
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        {/* Card 2 - 30% of the screen width */}
        <div className="bg-white rounded-md w-full lg:w-3/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Cart</h3>

          {/* Cart Table */}
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Item</th>
                <th className="py-2 px-4">Price (₦)</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Total (₦)</th>
                <th className="py-2 px-4">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">₦{item.price.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.inputQuantity}
                      min="1"
                      max={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, +e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-16"
                    />
                  </td>
                  <td className="py-2 px-4">₦{(item.inputQuantity * item.price).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Section */}
          <div className="mt-6 border m-2 p-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Discount:</span>
              <span>₦{discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Delivery Fee:</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>VAT:</span>
              <span>₦{vat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total:</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex space-x-4">
            <button
            onClick={()=>{
              navigate('/sell_mode/checkout')
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Checkout {cartItems.length} Items &rarr;
            </button>
            <button
              className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
              onClick={() => setDiscount(discount + 10)} // Example: Increase discount by 10
            >
              Add Discount
            </button>
            <button
              className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600"
              onClick={() => setDeliveryFee(deliveryFee + 100)} // Example: Increase delivery fee by 100
            >
              Add Delivery Fee
            </button>

            <button
        className="border border-green-300 text-gray-700 px-2 py-2 rounded hover:bg-green-50 hover:text-gray-900"
        onClick={() => setDeliveryFee(deliveryFee + 100)} // Example: Increase delivery fee by 100
>
  Pend Checkout
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesMode;
