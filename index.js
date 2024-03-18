// script.js

// Global variables to store the sorted and filtered data
let sortedData = [];
let filteredData = [];

// Function to fetch data from the API and display it
function fetchDataAndDisplay() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        sortedData = data; // Store the original data
        filteredData = sortedData; // Initialize filtered data with original data
        console.log(sortedData);
        displayProducts(filteredData); // Display products
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display products in the container
function displayProducts(products) {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
           <!-- <p>${product.description}</p> -->  
            <p>Price: $${product.price}</p>
        `;

        container.appendChild(productDiv);
    });
}


function filterProducts() {
    const category = document.getElementById('category').value.toLowerCase();
    filteredData = sortedData.filter(product => {
        if (category === 'all') {
            return true; // Show all products
        } else {
            // Check if the product category exactly matches the selected category
            return product.category.toLowerCase() === category.toLowerCase();
        }
    });
    displayProducts(filteredData);
}



// Function to sort products by price in ascending order
function sortByPriceAscending() {
    filteredData.sort((a, b) => a.price - b.price);
    displayProducts(filteredData);
}

// Function to sort products by price in descending order
function sortByPriceDescending() {
    filteredData.sort((a, b) => b.price - a.price);
    displayProducts(filteredData);
}

// Fetch data and display products on page load
fetchDataAndDisplay();
