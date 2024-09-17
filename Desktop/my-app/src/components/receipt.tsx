// components/Receipt.tsx
import React, { useEffect } from "react";

interface ReceiptProps {
  customerName: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

const Receipt: React.FC<ReceiptProps> = ({ customerName, paymentMethod, subtotal, discount, tax, total }) => {
  
  useEffect(() => {
    // Trigger print dialog when component mounts
    window.print();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="receipt bg-white p-6 shadow-md text-center w-full max-w-md">
      {/* Header */}
      <h1 className="font-bold text-lg">NAMUTUNCI PHARMACY LIMITED</h1>
      <h3>Layout, near building and customs</h3>
      <h4>Phone: 0908754366, 82652442</h4>
      <p>Katsina State</p>
  
      {/* Transaction Details Table */}
      <table className="table-auto w-full mt-6">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Customer</td>
            <td className="border px-4 py-2">{customerName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Payment Method</td>
            <td className="border px-4 py-2">{paymentMethod}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Date</td>
            <td className="border px-4 py-2">{new Date().toLocaleDateString()}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Phone Number</td>
            <td className="border px-4 py-2">0908754366</td> {/* Dynamic phone number can be added here */}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Transaction ID</td>
            <td className="border px-4 py-2">TXN-{Math.floor(Math.random() * 1000000)}</td>
          </tr>
        </tbody>
      </table>
  
      {/* Receipt Breakdown */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Subtotal</td>
            <td className="border px-4 py-2">₦{subtotal.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Discount</td>
            <td className="border px-4 py-2">₦{discount.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Tax</td>
            <td className="border px-4 py-2">₦{tax.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2 font-bold">₦{total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
  
      <p className="mt-6 font-semibold">Thank you for your purchase!</p>
    </div>
  </div>
  
  
  );
};

// Utility function to generate a random phone number
const generatePhoneNumber = () => {
  const areaCode = "070";
  const number = `${Math.floor(Math.random() * 900000000) + 100000000}`;
  return `${areaCode}-${number}`;
};

export default Receipt;
