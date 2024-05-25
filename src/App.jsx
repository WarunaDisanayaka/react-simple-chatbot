import React from 'react';
import ChatBot from 'react-chatbotify';
import './App.css';

const MyChatBot = () => {
  const productList = [
    { name: "Apples", price: "$1.99", description: "Fresh apples from local farms." },
    { name: "Bananas", price: "$0.99", description: "Ripe bananas ready to eat." },
    { name: "Oranges", price: "$2.49", description: "Juicy oranges packed with vitamin C." },
    { name: "Milk", price: "$3.49", description: "Fresh milk from organic dairy farms." },
    { name: "Bread", price: "$2.00", description: "Soft and fluffy bread perfect for sandwiches." }
  ];

  const formatProductList = () => {
    return productList.map(product => `${product.name} - ${product.price}`);
  };

  const flow = {
    start: {
      message: "Welcome to our grocery store! What's your name?",
      path: "ask_name"
    },
    ask_name: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        const userName = params.userInput;
        await params.injectMessage(`Nice to meet you, ${userName}!`);
        return "ask_product_interest";
      }
    },
    ask_product_interest: {
      message: "Which product are you interested in?",
      path: "show_catalog"
    },
    show_catalog: {
      message: "Here are some products we offer:",
      options: formatProductList(),
      path: "process_selection"
    },
    process_selection: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        const selectedOption = params.userInput.toLowerCase();
        const selectedProduct = productList.find(product => selectedOption.includes(product.name.toLowerCase()));
        if (selectedProduct) {
          await params.injectMessage(`${selectedProduct.name}: ${selectedProduct.price}`);
        } else {
          await params.injectMessage("Sorry, we don't have that product available.");
        }
        return "repeat";
      },
    },
    repeat: {
      transition: { duration: 0 },
      path: "ask_product_interest"
    }
  };

  return (
    <ChatBot options={{ theme: { embedded: true }, chatHistory: { storageKey: "grocery_chat_bot" } }} flow={flow} />
  );
};

function App() {
  return (
    <div className="App">
      <MyChatBot />
      <p className="read-the-docs">
        {/* Add any content here */}
      </p>
    </div>
  );
}

export default App;
