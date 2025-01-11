import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionsPage.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
    setFilteredTransactions(storedTransactions); // Set the initial state for filtered transactions
  }, []);

  const handleFilter = () => {
    if (startDate && endDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0); // Normalize start date to midnight
      const end = new Date(endDate).setHours(23, 59, 59, 999); // Normalize end date to end of the day

      if (start > end) {
        alert("Start date cannot be later than end date");
        return;
      }

      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date).getTime(); // Convert transaction date to timestamp
        return transactionDate >= start && transactionDate <= end;
      });

      setFilteredTransactions(filtered); // Update the filtered list
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const handleSelectTransaction = (index) => {
    setSelectedTransactions((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((id) => id !== index)
        : [...prevSelected, index]
    );
  };

  const handleDeleteTransactions = () => {
    const filteredTransactions = transactions.filter(
      (_, index) => !selectedTransactions.includes(index)
    );
    setTransactions(filteredTransactions);
    setFilteredTransactions(filteredTransactions); // Update the filtered list after deletion
    localStorage.setItem("transactions", JSON.stringify(filteredTransactions));
    setSelectedTransactions([]);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT");
    printWindow.document.write(`
      <html>
      <head>
        <title>Transactions</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Transactions</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${filteredTransactions
              .map(
                (transaction) => `
                <tr>
                  <td>${transaction.name}</td>
                  <td>${transaction.category}</td>
                  <td>
                    ${transaction.products
                      .map(
                        (prod) => `${prod.name} (${prod.quantity}) - ₹${prod.total}`
                      )
                      .join(", ")}
                  </td>
                  <td>₹${transaction.products.reduce((total, prod) => total + prod.total, 0)}</td>
                  <td>${new Date(transaction.date).toLocaleString()}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <h1>Transactions</h1>
      <div className="filter">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Category</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTransactions.includes(index)}
                  onChange={() => handleSelectTransaction(index)}
                />
              </td>
              <td>{transaction.name}</td>
              <td>{transaction.category}</td>
              <td>
                {transaction.products.map(
                  (prod) => `${prod.name} (${prod.quantity})`
                ).join(", ")}
              </td>
              <td>
                ₹{transaction.products.reduce((total, prod) => total + prod.total, 0)}
              </td>
              <td>{new Date(transaction.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button">
        <button onClick={handleDeleteTransactions}>Delete Selected Transactions</button>
        <button onClick={handlePrint}>Print Transactions</button>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    </div>
  );
};

export default TransactionsPage;
