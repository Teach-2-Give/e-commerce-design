document.addEventListener('DOMContentLoaded', function () {
    var productCards = document.querySelectorAll('.product-card');
    var dragStartIndex;
    function dragStart(event) {
        dragStartIndex = Array.from(productCards).indexOf(event.target);
    }
    function dragOver(event) {
        event.preventDefault();
    }
    function dragDrop(event) {
        var dragEndIndex = Array.from(productCards).indexOf(event.target);
        swapItems(dragStartIndex, dragEndIndex);
    }
    function swapItems(fromIndex, toIndex) {
        var productGrid = document.querySelector('.products-grid');
        var items = document.querySelectorAll('.product-card');
        var itemA = items[fromIndex];
        var itemB = items[toIndex];
        productGrid.insertBefore(itemA, itemB);
    }
    productCards.forEach(function (card) {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('drop', dragDrop);
    });
});
