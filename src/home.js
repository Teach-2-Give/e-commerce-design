document.addEventListener('DOMContentLoaded', function (event) {
    var shoesContainer = document.getElementById('shoes');
    var row = shoesContainer.querySelector('.row');
    var fetchAndDisplayProducts = function () {
        fetch('http://localhost:3000/products')
            .then(function (response) { return response.json(); })
            .then(function (products) {
            row.innerHTML = '';
            products.forEach(function (product) {
                var col = document.createElement('div');
                col.classList.add('col');
                col.innerHTML = "\n                        <div class=\"card border-0 shadow h-100\">\n                            <img src=\"".concat(product.image, "\" class=\"card-img-top\" alt=\"").concat(product.name, "\">\n                            <div class=\"card-body\">\n                                <h5 class=\"card-title\">").concat(product.name, "</h5>\n                                <p class=\"card-text\">$").concat(product.price, "</p>\n                            </div>\n                            <div class=\"m-3\">\n                                <button class=\"shopy-btn\">Shop Now</button>\n                            </div>\n                        </div>\n                    ");
                row.appendChild(col);
            });
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    };
    if (shoesContainer && row) {
        // Initial fetch and display products
        fetchAndDisplayProducts();
    }
});
