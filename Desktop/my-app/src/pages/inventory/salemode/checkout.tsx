import React, { useState } from "react";
import SearchableSelect from "../../../components/searchableSelect";

const CheckoutPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; label: string } | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "" });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const customers = [
    { id: 1, label: "Abdurrahman Mustapha" },
    { id: 2, label: "Dr. Musa Muhammad" },
    { id: 3, label: "Barr. Usman Yusuf" },
  ];
  
  const paymentMethods = [
    { id: 1, label: "Cash" },
    { id: 2, label: "Credit Card" },
    { id: 3, label: "Mobile Payment" },
  ];
  
  const handleNewCustomerToggle = () => {
    setIsNewCustomer(!isNewCustomer);
    setSelectedCustomer(null); // Clear existing customer selection when choosing a new customer
  };

  const handleCustomerSelect = (customer: { id: number; label: string }) => {
    setSelectedCustomer(customer);
    setIsNewCustomer(false); // Uncheck new customer if an existing customer is selected
  };

  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodSelect = (method: { id: number; label: string }) => {
    setSelectedPaymentMethod(method.label);
  };

  const handleCheckout = () => {
    // Perform checkout actions here (like submitting the form)
    // For now, we just set a success flag
    setPaymentSuccess(true);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Customer Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Customer</label>
        <div className="mb-2">
          <input
            type="checkbox"
            id="newCustomer"
            checked={isNewCustomer}
            onChange={handleNewCustomerToggle}
            className="mr-2"
          />
          <label htmlFor="newCustomer" className="font-medium">Add New Customer</label>
        </div>

        {isNewCustomer ? (
          <div className="mt-2">
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={handleNewCustomerChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Customer Phone"
              value={newCustomer.phone}
              onChange={handleNewCustomerChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        ) : (
          <SearchableSelect
            options={customers}
            onSelect={handleCustomerSelect}
            placeholder="Search for existing customer..."
          />
        )}

        {/* Show selected customer */}
        {selectedCustomer && (
          <div className="mt-3 text-green-600">
            Selected Customer: {selectedCustomer.label}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Payment Method</label>
        <SearchableSelect
          options={paymentMethods}
          onSelect={handlePaymentMethodSelect}
          placeholder="Choose payment method..."
        />
        {selectedPaymentMethod && (
          <div className="mt-3 text-green-600">
            Selected Payment Method: {selectedPaymentMethod}
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="text-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleCheckout}
          disabled={!selectedCustomer && !isNewCustomer} // Disable button if no customer is selected or added
        >
          Complete Checkout
        </button>
      </div>

      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="mt-6 text-center text-green-600">
          Payment Successful! Thank you for your purchase.
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
