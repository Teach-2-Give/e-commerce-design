document.addEventListener('DOMContentLoaded', function (event) {
    var createButton = document.getElementById('create-btn');
    var productForm = document.getElementById('product-form');
    var cancelIcon = document.getElementById('cancel-icon');
    var submitButton = document.getElementById('submit-button');
    var productNameInput = document.getElementById('product-name');
    var productPriceInput = document.getElementById('product-price');
    var productImageInput = document.getElementById('product-image');
    var productsGrid = document.querySelector('.products-grid');
    var editingProductId = null;
    // Fetch and display products from the database
    var fetchAndDisplayProducts = function () {
        fetch('http://localhost:3000/products')
            .then(function (response) { return response.json(); })
            .then(function (products) {
            productsGrid.innerHTML = ''; // Clear existing products
            products.forEach(function (product) {
                var productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = "\n                        <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                        <div class=\"product-details\">\n                            <p>").concat(product.name, "</p>\n                            <p>$").concat(product.price, "</p>\n                            <div class=\"product-actions\">\n                                <button class=\"edit-btn\" data-id=\"").concat(product.id, "\"><i class=\"fas fa-edit\"></i></button>\n                                <button class=\"delete-btn\" data-id=\"").concat(product.id, "\"><i class=\"fas fa-trash\"></i></button>\n                            </div>\n                        </div>\n                    ");
                productsGrid.appendChild(productCard);
                var newEditButton = productCard.querySelector('.edit-btn');
                var newDeleteButton = productCard.querySelector('.delete-btn');
                if (newEditButton) {
                    newEditButton.addEventListener('click', function () {
                        fetch("http://localhost:3000/products/".concat(newEditButton.dataset.id))
                            .then(function (response) { return response.json(); })
                            .then(function (product) {
                            productForm.style.display = 'block';
                            productForm.classList.add('show');
                            submitButton.textContent = 'Update';
                            productNameInput.value = product.name;
                            productPriceInput.value = product.price;
                            productImageInput.value = product.image;
                            editingProductId = product.id;
                        })
                            .catch(function (error) {
                            console.error('Error:', error);
                        });
                    });
                }
                if (newDeleteButton) {
                    newDeleteButton.addEventListener('click', function () {
                        var id = newDeleteButton.dataset.id;
                        fetch("http://localhost:3000/products/".concat(id), {
                            method: 'DELETE',
                        })
                            .then(function (response) { return response.json(); })
                            .then(function (data) {
                            console.log('Success:', data);
                            productCard.remove();
                        })
                            .catch(function (error) {
                            console.error('Error:', error);
                        });
                    });
                }
            });
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    };
    if (createButton && productForm && cancelIcon && submitButton && productNameInput && productPriceInput && productImageInput && productsGrid) {
        createButton.addEventListener('click', function () {
            productForm.style.display = 'block';
            productForm.classList.add('show');
            submitButton.textContent = 'Create';
            productNameInput.value = '';
            productPriceInput.value = '';
            productImageInput.value = '';
            editingProductId = null;
        });
        cancelIcon.addEventListener('click', function () {
            productForm.style.display = 'none';
            productForm.classList.remove('show');
        });
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                image: productImageInput.value
            };
            if (editingProductId) {
                // Update existing product
                fetch("http://localhost:3000/products/".concat(editingProductId), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    console.log('Success:', data);
                    fetchAndDisplayProducts();
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                    .catch(function (error) {
                    console.error('Error:', error);
                });
            }
            else {
                // Create new product
                fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    console.log('Success:', data);
                    var productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = "\n                        <img src=\"".concat(data.image, "\" alt=\"").concat(data.name, "\">\n                        <div class=\"product-details\">\n                            <p>").concat(data.name, "</p>\n                            <p>$").concat(data.price, "</p>\n                            <div class=\"product-actions\">\n                                <button class=\"edit-btn\" data-id=\"").concat(data.id, "\"><i class=\"fas fa-edit\"></i></button>\n                                <button class=\"delete-btn\" data-id=\"").concat(data.id, "\"><i class=\"fas fa-trash\"></i></button>\n                            </div>\n                        </div>\n                    ");
                    productsGrid.appendChild(productCard);
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                    .catch(function (error) {
                    console.error('Error:', error);
                });
            }
        });
        // Initial fetch and display products
        fetchAndDisplayProducts();
    }
});
