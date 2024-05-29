"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function (event) {
    // Get the "Create new" button, the form, the cancel icon, and the submit button
    var createButton = document.getElementById('create-btn');
    var productForm = document.getElementById('product-form');
    var cancelIcon = document.getElementById('cancel-icon');
    var submitButton = document.getElementById('submit-button');
    var productNameInput = document.getElementById('product-name');
    var productPriceInput = document.getElementById('product-price');
    var productImageInput = document.getElementById('product-image');
    var productsGrid = document.querySelector('.products-grid');
    var addEventListenersToButtons = function () {
        // Get all the edit buttons
        var editButtons = document.getElementsByClassName('edit-btn');
        // Show the form and change the submit button text when an edit button is clicked
        for (var i = 0; i < editButtons.length; i++) {
            var editButton = editButtons[i];
            if (editButton) {
                editButton.addEventListener('click', function () {
                    productForm.style.display = 'block';
                    productForm.classList.add('show');
                    submitButton.textContent = 'Update';
                });
            }
        }
        // Get all the delete buttons
        var deleteButtons = document.getElementsByClassName('delete-btn');
        var _loop_1 = function (i) {
            var deleteButton = deleteButtons[i];
            if (deleteButton) {
                deleteButton.addEventListener('click', function () {
                    var id = deleteButton.dataset.id;
                    fetch("http://localhost:3000/products/".concat(id), {
                        method: 'DELETE',
                    })
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        console.log('Success:', data);
                        // Remove the product from the products grid
                        if (deleteButton.parentElement && deleteButton.parentElement.parentElement && deleteButton.parentElement.parentElement.parentElement) {
                            deleteButton.parentElement.parentElement.parentElement.remove();
                        }
                    })
                        .catch(function (error) {
                        console.error('Error:', error);
                    });
                });
            }
        };
        // Delete the product when a delete button is clicked
        for (var i = 0; i < deleteButtons.length; i++) {
            _loop_1(i);
        }
    };
    // Ensure the elements were found before adding event listeners
    if (createButton && productForm && cancelIcon && submitButton && productNameInput && productPriceInput && productImageInput && productsGrid) {
        // Show the form and change the submit button text when the "Create new" button is clicked
        createButton.addEventListener('click', function () {
            productForm.style.display = 'block';
            productForm.classList.add('show');
            submitButton.textContent = 'Create';
        });
        // Hide the form when the cancel icon is clicked
        cancelIcon.addEventListener('click', function () {
            productForm.style.display = 'none';
            productForm.classList.remove('show');
        });
        // Submit the form
        submitButton.addEventListener('click', function (event) { return __awaiter(void 0, void 0, void 0, function () {
            var product, response, data, productCard, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        product = {
                            name: productNameInput.value,
                            price: productPriceInput.value,
                            image: productImageInput.value
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('http://localhost:3000/products', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(product),
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        console.log('Success:', data);
                        productCard = document.createElement('div');
                        productCard.classList.add('product-card');
                        productCard.innerHTML = "\n                    <img src=\"".concat(data.image, "\" alt=\"").concat(data.name, "\">\n                    <div class=\"product-details\">\n                        <p>").concat(data.name, "</p>\n                        <p>$").concat(data.price, "</p>\n                        <div class=\"product-actions\">\n                            <button class=\"edit-btn\"><i class=\"fas fa-edit\"></i></button>\n                            <button class=\"delete-btn\" data-id=\"").concat(data.id, "\"><i class=\"fas fa-trash\"></i></button>\n                        </div>\n                    </div>\n                ");
                        productsGrid.appendChild(productCard);
                        // Add event listeners to the new buttons
                        addEventListenersToButtons();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        // Add event listeners to the existing buttons
        addEventListenersToButtons();
    }
});
