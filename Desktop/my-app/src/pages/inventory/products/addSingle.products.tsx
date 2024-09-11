import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineBarcode, AiOutlineDollar } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";

const CreateSingleProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState<"product" | "service">("product");

  const [formData, setFormData] = useState({
    store: "",
    productName: "",
    category: "",
    unit: "",
    quantity: "",
    description: "",
    costPrice: "",
    rebate: "",
    initialStock: "",
    discountedSellingPrice: "",
    stockLevelAlert: "",
    expiryDate: "",
    pricingType: "",
    sellingPriceDiscountPercentage: "",
    sellingPriceDiscountAmount: "",
    sellingPrice: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const sellingPrice = parseFloat(formData.sellingPrice);
    setFormData((prevData) => ({
      ...prevData,
      sellingPriceDiscountAmount: value.toString(),
      sellingPriceDiscountPercentage: (sellingPrice ? (value / sellingPrice * 100).toFixed(2) : "0").toString(),
    }));
  };
  

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* Product/Service Selection */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setProductType("product")}
                className={`flex-1 py-2 rounded-md border border-blue-500 N {
                  productType === "product" ? "bg-blue-500 text-white" : "text-blue-500"
                }`}
              >
                Create Single Product
              </button>
              <button
                onClick={() => setProductType("service")}
                className={`flex-1 py-2 rounded-md border border-blue-500 N {
                  productType === "service" ? "bg-blue-500 text-white" : "text-blue-500"
                }`}
              >
                Create Service
              </button>
            </div>
          </div>

          {productType === "product" && (
            <div className="space-y-6">
                            {/* Product Form */}
                            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Create Single Product</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please provide the following information about your product.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">*Store</label>
                    <select
                      name="store"
                      value={formData.store}
                      onChange={handleInputChange}
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    >
                      <option value="">Select store...</option>
                      <option value="store1">Store 1</option>
                      <option value="store2">Store 2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">*Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">*Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Enter category"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">*Product Unit</label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      placeholder="Enter unit (e.g., sachet, carton, pills)"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">*Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange ={()=> handleInputChange}
                      placeholder="Add description to this product"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full h-24"
                    />
                  </div>
                </div>
              </div>

              {/* Product Pricing Form */}
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4">
                <h2 className="text-lg font-semibold mb-4">Product Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Cost Price</label>
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                      placeholder="Enter cost price"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Rebate</label>
                    <input
                      type="number"
                      name="rebate"
                      value={formData.rebate}
                      onChange={handleInputChange}
                      placeholder="Enter rebate"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      name="initialStock"
                      value={formData.initialStock}
                      onChange={handleInputChange}
                      placeholder="Enter initial stock"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Discounted Selling Price</label>
                    <input
                      type="number"
                      name="discountedSellingPrice"
                      value={formData.discountedSellingPrice}
                      onChange={handleInputChange}
                      placeholder="Enter discounted selling price"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Stock Level Alert</label>
                    <input
                      type="number"
                      name="stockLevelAlert"
                      value={formData.stockLevelAlert}
                      onChange={handleInputChange}
                      placeholder="Enter stock level alert"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Pricing Type</label>
                    <select
                      name="pricingType"
                      value={formData.pricingType}
                      onChange={handleInputChange}
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    >
                      <option value="">Select pricing type</option>
                      <option value="fixed">Fixed</option>
                      <option value="variable">Variable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Selling Price Discount (%)</label>
                    <input
                      type="number"
                      name="sellingPriceDiscountPercentage"
                      value={formData.sellingPriceDiscountPercentage}
                      onChange={handleDiscountChange}
                      placeholder="Enter discount percentage"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Selling Price Discount (Amount)</label>
                    <input
                      type="number"
                      name="sellingPriceDiscountAmount"
                      value={formData.sellingPriceDiscountAmount}
                      onChange={handleDiscountChange}
                      placeholder="Enter discount amount"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Selling Price</label>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                      placeholder="Enter selling price"
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Profit</label>
                    <input
                    
                      type="number"
                      name="profit"
                      value={parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice) - parseFloat(formData.rebate)}
                      readOnly
                      className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full bg-gray-100 dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateSingleProductPage;

