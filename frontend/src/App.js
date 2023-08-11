import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import ItemList from "./components/Items";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [discounts, setSelectedDiscounts] = useState([]);
  const [merchantInfo, setMerchantInfo] = useState({
    redirectConfirmUrl: "https://portal.integration.scalapay.com/success-url",
    redirectCancelUrl: "https://portal.integration.scalapay.com/failure-url",
  });

  const merchantReference = "merchantOrder-1234";
  const taxAmount = { amount: "3.70", currency: "EUR" };
  const shippingAmount = { amount: "10.00", currency: "EUR" };
  const [totalAmount, setTotalAmount] = useState({
    amount: "00.00",
    currency: "EUR",
  });

  const [consumerInfo, setConsumerInfo] = useState({});

  const [shippingInfo, SetShippingInfo] = useState({});

  const [billingInfo, SetBillingInfo] = useState({});

  const handleConsumerInputChange = (event) => {
    const { name, value } = event.target;
    setConsumerInfo((prevConsumerInfo) => ({
      ...prevConsumerInfo,
      [name]: value,
    }));
  };

  const exampleDiscounts = [
    { displayName: "10% Off", amount: { amount: "3.00", currency: "EUR" } },
    { displayName: "50% Off", amount: { amount: "6.00", currency: "EUR" } },
  ];
  const exampleItems = [
    {
      name: "T-Shirt",
      category: "clothes",
      subcategory: ["shirt", "long-sleeve"],
      brand: "TopChoice",
      gtin: "123458791330",
      sku: "12341234",
      quantity: 1,
      price: { amount: "10.00", currency: "EUR" },
    },
    {
      name: "Jeans",
      category: "clothes",
      subcategory: ["pants", "jeans"],
      brand: "TopChoice",
      gtin: "123458722222",
      sku: "12341235",
      quantity: 1,
      price: { amount: "20.00", currency: "EUR" },
    },
  ];

  const handleSelectItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
    calculateTotalAmount([...selectedItems, item]);
  };

  const handleDiscountChange = (discount) => {
    if (discounts.includes(discount)) {
      console.log(discounts);
      setSelectedDiscounts(discounts.filter((d) => d !== discount));
    } else {
      setSelectedDiscounts([...discounts, discount]);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    SetBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [name]: value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    SetShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: value,
    }));
  };

  const calculateTotalAmount = (item, discount) => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += parseFloat(item.price.amount);
    });

    discounts.forEach((discount) => {
      total -= parseFloat(discount.amount.amount);
    });

    setTotalAmount({ amount: total.toFixed(2), currency: "EUR" });
  };

  const [requestData, setRequestData] = useState({
    totalAmount,
    consumer: consumerInfo,
    billing: billingInfo,
    shipping: shippingInfo,
    items: selectedItems,
    discounts,
    merchant: merchantInfo,
    merchantReference,
    taxAmount,
    shippingAmount,
    type: "online",
    frequency: { number: "1", frequencyType: "monthly" },
    product: "pay-in-3",
    orderExpiryMilliseconds: 600000,
  });

  useEffect(() => {
    setRequestData({
      totalAmount,
      consumer: consumerInfo,
      billing: billingInfo,
      shipping: shippingInfo,
      items: selectedItems,
      discounts,
      merchant: merchantInfo,
      merchantReference,
      taxAmount,
      shippingAmount,
      type: "online",
      frequency: { number: "1", frequencyType: "monthly" },
      product: "pay-in-3",
      orderExpiryMilliseconds: 600000,
    });
  }, [totalAmount, discounts, consumerInfo, shippingInfo, billingInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(consumerInfo);
    axios
      .post("http://localhost:8080/api/create-order", requestData)
      .then((response) => {
        window.location.href = response.data.checkoutUrl;
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="App">
      <form className="form-container">
        <h1>Item Selection</h1>
        <ItemList items={exampleItems} onSelect={handleSelectItem} />
        <>
          <h2>Selected Items</h2>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <h2>Total Amount</h2>
          <p>
            {totalAmount.amount} {totalAmount.currency}
          </p>
        </>
        <div>
          {exampleDiscounts.map((discount) => (
            <label key={discounts.displayName}>
              <input
                type="checkbox"
                checked={discounts.includes(discount)}
                onChange={() => handleDiscountChange(discount)}
              />
              {discount.displayName}
            </label>
          ))}
        </div>
        <div>
          <h2>Consumer Information</h2>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={consumerInfo.phoneNumber}
              onChange={handleConsumerInputChange}
              required
            />
          </div>
          <div>
            <label>Given Names:</label>
            <input
              type="text"
              name="givenNames"
              value={consumerInfo.givenNames}
              onChange={handleConsumerInputChange}
              required
            />
          </div>
          <div>
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={consumerInfo.surname}
              onChange={handleConsumerInputChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={consumerInfo.email}
              onChange={handleConsumerInputChange}
              required
            />
          </div>
          <div>
            <h2>Billing Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={billingInfo.name}
                onChange={handleBillingChange}
                required
              />
            </label>
            <label>
              Line 1:
              <input
                type="text"
                name="line1"
                value={billingInfo.line1}
                onChange={handleBillingChange}
                required
              />
            </label>
            <label>
              Suburb:
              <input
                type="text"
                name="billingSuburb"
                value={billingInfo.suburb}
                onChange={handleBillingChange}
                required
              />
            </label>
            <label>
              Postcode:
              <input
                type="text"
                name="billingPostcode"
                value={billingInfo.postcode}
                onChange={handleBillingChange}
                required
              />
            </label>
            <label>
              Country Code:
              <input
                type="text"
                name="billingCountryCode"
                value={billingInfo.countryCode}
                onChange={handleBillingChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="billingPhoneNumber"
                value={billingInfo.phoneNumber}
                onChange={handleBillingChange}
                required
              />
            </label>

            <h2>Shipping Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingChange}
                required
              />
            </label>
            <label>
              Line 1:
              <input
                type="text"
                name="line1"
                value={shippingInfo.line1}
                onChange={handleShippingChange}
                required
              />
            </label>
            <label>
              Suburb:
              <input
                type="text"
                name="shippingSuburb"
                value={shippingInfo.suburb}
                onChange={handleShippingChange}
                required
              />
            </label>
            <label>
              Postcode:
              <input
                type="text"
                name="shippingPostcode"
                value={shippingInfo.postcode}
                onChange={handleShippingChange}
                required
              />
            </label>
            <label>
              Country Code:
              <input
                type="text"
                name="shippingCountryCode"
                value={shippingInfo.countryCode}
                onChange={handleShippingChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="shippingPhoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleShippingChange}
                required
              />
            </label>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
