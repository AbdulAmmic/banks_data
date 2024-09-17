// pages/CheckoutPage.tsx
import React, { useState } from "react";
import SearchableSelect from "../../../components/searchableSelect";
import Header from "../../../components/salesMode.header";
import Receipt from "../../../components/receipt";

const CheckoutPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; label: string } | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "" });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
    setSelectedCustomer(null);
  };

  const handleCustomerSelect = (customer: { id: number; label: string }) => {
    setSelectedCustomer(customer);
    setIsNewCustomer(false);
  };

  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodSelect = (method: { id: number; label: string }) => {
    setSelectedPaymentMethod(method.label);
  };

  const handleCheckout = () => {
    setShowConfirmDialog(true);
  };

  const confirmCheckout = () => {
    setShowConfirmDialog(false);
    setPaymentSuccess(true);
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const subtotal = 20000;
  const discount = 1000;
  const tax = 500;
  const total = subtotal - discount + tax;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header 
        pendingCount={3} 
        onSearchChange={() => {}} 
        onNewInventory={() => { console.log('New inventory clicked'); }} 
      />

      {/* Main content */}
   
      <div className="p-4 max-w-3xl mx-auto">
        <div className="bg-white shadow-md p-6 rounded-lg">
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
              <label htmlFor="newCustomer" className="font-medium">
                Add New Customer
              </label>
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

          {/* Money Breakdown Table */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Money Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Subtotal</td>
                    <td className="border border-gray-300 px-4 py-2">₦20,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Discount</td>
                    <td className="border border-gray-300 px-4 py-2">₦1,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Tax</td>
                    <td className="border border-gray-300 px-4 py-2">₦500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Total</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">₦19,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            {paymentSuccess ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handlePrintReceipt}
              >
                Print Receipt
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
          </div>

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-lg font-bold mb-4">Confirm Checkout</h3>
                <p className="mb-6">Are you sure you want to complete the checkout?</p>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                    onClick={() => setShowConfirmDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={confirmCheckout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Receipt */}
       
          {showReceipt && (
            <Receipt
              customerName={selectedCustomer ? selectedCustomer.label : newCustomer.name}
              paymentMethod={selectedPaymentMethod || "N/A"}
              subtotal={subtotal}
              discount={discount}
              tax={tax}
              total={total}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
