import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineArrowLeft } from 'react-icons/ai';

const NewSupplyPage = () => {
  const [supplies, setSupplies] = useState([
    { product: '', unit: '', quantity: '', price: '' }
  ]);
  const [amountPaid, setAmountPaid] = useState('');

  const handleAddRow = () => {
    setSupplies([...supplies, { product: '', unit: '', quantity: '', price: '' }]);
  };

  type SupplyField = 'product' | 'unit' | 'quantity' | 'price';

  const handleInputChange = (index: number, field: SupplyField, value: string) => {
    const updatedSupplies = [...supplies];
    updatedSupplies[index] = { ...updatedSupplies[index], [field]: value };
    setSupplies(updatedSupplies);
  };

  const handleAddSupply = () => {
    if (window.confirm('Are you sure you want to add this supply?')) {
      alert('Supply successfully added!');
    }
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return supplies.reduce((total, supply) => {
      return total + (parseFloat(supply.price) || 0) * (parseInt(supply.quantity) || 0);
    }, 0);
  };

  // Format number as currency with commas
  const formatCurrency = (num: number) => {
    return num.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
  };

  // Calculate outstanding balance
  const calculateOutstanding = () => {
    const total = calculateTotal();
    return total - (parseFloat(amountPaid) || 0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        <AiOutlineArrowLeft />
        Back
      </button>

      {/* Introductory Card */}
      <div className="border border-gray-300 p-4 rounded-md mb-6">
        <h1 className="text-2xl font-semibold mb-2">Company Name: XYZ Supplies</h1>
        <p className="mb-4">Address: 123 Supply Street, Warehouse City</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Desk Supplier Name:</label>
            <input
              type="text"
              placeholder="Enter Desk Supplier Name"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone Number:</label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Supply Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S/N</th>
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Unit</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={supply.product}
                    onChange={(e) => handleInputChange(index, 'product', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Enter Product"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={supply.unit}
                    onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                  >
                    <option value="">Select Unit</option>
                    <option value="Carton">Carton</option>
                    <option value="Sachet">Sachet</option>
                    <option value="Row">Row</option>
                    <option value="Zing">Zing</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={supply.quantity}
                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Enter Quantity"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={supply.price}
                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md"
                    placeholder="Enter Price"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row Button */}
        <button
          onClick={handleAddRow}
          className="mt-4 flex items-center bg-green-600 text-white px-4 py-2 rounded-md"
        >
          <AiOutlinePlus/>
          Add Row
        </button>
      </div>

      {/* Total Amount */}
      <div className="mt-6">
        <div className="mb-4">
          <label className="block font-semibold">Amount Paid (in Naira):</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            placeholder="Enter Amount Paid"
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Total Price: {formatCurrency(calculateTotal())}</p>
          <p className="font-semibold">Amount Paid: {formatCurrency(parseFloat(amountPaid) || 0)}</p>
          <p className="font-semibold">
            Outstanding Balance: {formatCurrency(calculateOutstanding())}
          </p>
        </div>
      </div>

      {/* Receipt Upload */}
      <div className="mt-6">
        <label className="block font-semibold mb-2">Upload Receipt (optional):</label>
        <input type="file" className="border border-gray-300 p-2 w-full rounded-md" />
      </div>

      {/* Add Supply Button */}
      <button
        onClick={handleAddSupply}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md"
      >
        Add Supply
      </button>
    </div>
  );
};

export default NewSupplyPage;
