document.addEventListener('DOMContentLoaded', (event) => {
    const createButton = document.getElementById('create-btn') as HTMLButtonElement;
    const productForm = document.getElementById('product-form') as HTMLDivElement;
    const cancelIcon = document.getElementById('cancel-icon') as HTMLElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const productNameInput = document.getElementById('product-name') as HTMLInputElement;
    const productPriceInput = document.getElementById('product-price') as HTMLInputElement;
    const productImageInput = document.getElementById('product-image') as HTMLInputElement;
    const productsGrid = document.querySelector('.products-grid') as HTMLElement;
    let editingProductId: string | null = null;

    // Fetch and display products from the database
    const fetchAndDisplayProducts = () => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                productsGrid.innerHTML = ''; // Clear existing products
                products.forEach((product: { id: string, name: string, price: string, image: string }) => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-details">
                            <p>${product.name}</p>
                            <p>$${product.price}</p>
                            <div class="product-actions">
                                <button class="edit-btn" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                                <button class="delete-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;
                    productsGrid.appendChild(productCard);

                    const newEditButton = productCard.querySelector('.edit-btn') as HTMLButtonElement;
                    const newDeleteButton = productCard.querySelector('.delete-btn') as HTMLButtonElement;
                    if (newEditButton) {
                        newEditButton.addEventListener('click', () => {
                            fetch(`http://localhost:3000/products/${newEditButton.dataset.id}`)
                                .then(response => response.json())
                                .then(product => {
                                    productForm.style.display = 'block';
                                    productForm.classList.add('show');
                                    submitButton.textContent = 'Update';
                                    productNameInput.value = product.name;
                                    productPriceInput.value = product.price;
                                    productImageInput.value = product.image;
                                    editingProductId = product.id;
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        });
                    }
                    if (newDeleteButton) {
                        newDeleteButton.addEventListener('click', () => {
                            const id = newDeleteButton.dataset.id;
                            fetch(`http://localhost:3000/products/${id}`, {
                                method: 'DELETE',
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);
                                productCard.remove();
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (createButton && productForm && cancelIcon && submitButton && productNameInput && productPriceInput && productImageInput && productsGrid) {
        createButton.addEventListener('click', () => {
            productForm.style.display = 'block';
            productForm.classList.add('show');
            submitButton.textContent = 'Create';
            productNameInput.value = '';
            productPriceInput.value = '';
            productImageInput.value = '';
            editingProductId = null;
        });

        cancelIcon.addEventListener('click', () => {
            productForm.style.display = 'none';
            productForm.classList.remove('show');
        });

        submitButton.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                image: productImageInput.value
            };

            if (editingProductId) {
                // Update existing product
                fetch(`http://localhost:3000/products/${editingProductId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    fetchAndDisplayProducts();
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                // Create new product
                fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${data.image}" alt="${data.name}">
                        <div class="product-details">
                            <p>${data.name}</p>
                            <p>$${data.price}</p>
                            <div class="product-actions">
                                <button class="edit-btn" data-id="${data.id}"><i class="fas fa-edit"></i></button>
                                <button class="delete-btn" data-id="${data.id}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;
                    productsGrid.appendChild(productCard);
                    productForm.style.display = 'none';
                    productForm.classList.remove('show');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });

        // Initial fetch and display products
        fetchAndDisplayProducts();
    }
});
