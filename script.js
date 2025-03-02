let cart = [];
        let totalPrice = 0;

        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                let product = button.parentElement;
                let name = product.getAttribute('data-name');
                let price = parseFloat(product.getAttribute('data-price'));
                let aisle = product.getAttribute('data-aisle');
                let row = product.getAttribute('data-row');

                let cartItem = cart.find(item => item.name === name);
                if (cartItem) {
                    cartItem.count += 1;
                } else {
                    cart.push({ name, price, count: 1, aisle, row });
                }

                
                totalPrice += price;
                updateCart();
            });
        });

        function updateCart() {
            let cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';

            cart.forEach(item => {
                let cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <span>${item.name} (x${item.count})</span>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });

            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        }

        
        function removeFromCart(name) {
            let itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex !== -1) {
                let item = cart[itemIndex];
                totalPrice -= item.price * item.count;
                cart.splice(itemIndex, 1);
                updateCart();
            }
        }

        
        function generateBarcode() {
            let barcodeSvg = document.getElementById('barcode');
            let totalPriceStr = totalPrice.toFixed(2).toString();
            JsBarcode(barcodeSvg, totalPriceStr, { format: "CODE128" });
            document.getElementById('barcode-message').textContent = "Scan this barcode to view your total bill.";
        }

        
        document.getElementById('search').addEventListener('keyup', function() {
            let searchText = this.value.toLowerCase();
            let products = document.querySelectorAll('.product');

            products.forEach(product => {
                let name = product.getAttribute('data-name').toLowerCase();
                let aisle = product.getAttribute('data-aisle').toLowerCase();
                let row = product.getAttribute('data-row').toLowerCase();

                if (name.includes(searchText) || aisle.includes(searchText) || row.includes(searchText)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });

