document.addEventListener('DOMContentLoaded', (event) => {
    const shoesContainer = document.getElementById('shoes') as HTMLElement;
    const row = shoesContainer.querySelector('.row') as HTMLElement;

    const fetchAndDisplayProducts = () => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                row.innerHTML = '';
                products.forEach((product: { id: string, name: string, price: string, image: string }) => {
                    const col = document.createElement('div');
                    col.classList.add('col');
                    col.innerHTML = `
                        <div class="card border-0 shadow h-100" style="width: 200px;">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 100px;">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">$${product.price}</p>
                            </div>
                            <div class="m-3">
                                <button class="shopy-btn">Shop Now</button>
                            </div>
                        </div>
                    `;
                    row.appendChild(col);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (shoesContainer && row) {
        // Initial fetch and display products
        fetchAndDisplayProducts();
    }
});