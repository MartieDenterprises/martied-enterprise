// ===== CONFIGURATION =====
        const BASE_IMAGE_URL = 'images/';

        // ===== PAGINATION CONFIG =====
        const PRODUCTS_PER_PAGE = 8;
        let currentPage = 1;
        let filteredProducts = [];
        let isLoading = false;
        let infiniteScrollEnabled = false;
        let currentSort = 'default';

        // ===== PRODUCT DATA WITH STOCK =====
        let products = JSON.parse(localStorage.getItem('martied_products')) || [
            // ===== PAGE 1: HOUSEHOLD KITCHEN ESSENTIALS =====
            { id: 1, name: "Laundry Net", category: "household", price: 1800, bulkPrice: 1500, bulkQty: 12, image: "laundry-net.jpeg", badge: "", description: "Durable mesh net for protecting clothes in the washing machine.", stock: 50, soldToday: 3 },
            { id: 2, name: "Portable Rechargeable Juicer", category: "kitchenware", price: 4500, bulkPrice: 3800, bulkQty: 10, image: "portable-juicer.jpeg", badge: "hot", description: "USB rechargeable mini blender. Perfect for smoothies on the go.", stock: 30, soldToday: 5 },
            { id: 3, name: "Potato Peeler", category: "kitchenware", price: 1800, bulkPrice: 1500, bulkQty: 20, image: "potato-peeler.jpeg", badge: "", description: "Sharp stainless steel blade with comfortable grip handle.", stock: 60, soldToday: 2 },
            { id: 4, name: "2 Step Soap Case", category: "household", price: 1600, bulkPrice: 1300, bulkQty: 24, image: "soap-case.jpeg", badge: "", description: "Drainage soap dish with two-tier design. Keeps soap dry.", stock: 45, soldToday: 1 },
            { id: 5, name: "6 Way Aluminium Grater", category: "kitchenware", price: 3500, bulkPrice: 2900, bulkQty: 12, image: "aluminium-grater.jpeg", badge: "", description: "Multi-purpose grater with 6 different blade styles.", stock: 35, soldToday: 2 },
            { id: 6, name: "Lunch Bag (Insulated)", category: "household", price: 2600, bulkPrice: 2200, bulkQty: 15, image: "lunch-bag.jpeg", badge: "", description: "Thermal insulated lunch bag. Keeps food warm or cold.", stock: 40, soldToday: 3 },

            // ===== PAGE 2: MORE HOUSEHOLD ESSENTIALS =====
            { id: 7, name: "Gym/Student Size Towel", category: "household", price: 2500, bulkPrice: 2000, bulkQty: 12, image: "gym-towel.jpeg", badge: "", description: "Compact quick-dry towel. Perfect for gym, travel, or school.", stock: 55, soldToday: 4 },
            { id: 8, name: "Bowl - Dozen", category: "kitchenware", price: 7500, bulkPrice: 6500, bulkQty: 5, image: "bowl-dozen.jpeg", badge: "", description: "Set of 12 colorful plastic bowls. Stackable and durable.", stock: 25, soldToday: 1 },
            { id: 9, name: "Fruit Basket - Dozen", category: "kitchenware", price: 6500, bulkPrice: 5500, bulkQty: 6, image: "fruit-basket.jpeg", badge: "", description: "12-piece fruit basket set. Elegant design for serving.", stock: 20, soldToday: 2 },
            { id: 10, name: "Hand Grater", category: "kitchenware", price: 3000, bulkPrice: 2500, bulkQty: 15, image: "hand-grater.jpeg", badge: "", description: "Ergonomic hand grater for cheese, vegetables, and more.", stock: 40, soldToday: 3 },
            { id: 11, name: "Cloth Peg Basket Set", category: "household", price: 2000, bulkPrice: 1600, bulkQty: 24, image: "peg-basket.jpeg", badge: "bestseller", description: "Basket with 24 cloth pegs included. Best seller item!", stock: 70, soldToday: 8 },
            { id: 12, name: "Kitchen Napkins (Set)", category: "household", price: 5000, bulkPrice: 4200, bulkQty: 8, image: "kitchen-napkins.jpeg", badge: "", description: "Premium kitchen napkins. Absorbent and reusable.", stock: 30, soldToday: 2 },
            { id: 13, name: "2 IN 1 Towel", category: "household", price: 3500, bulkPrice: 2900, bulkQty: 10, image: "2in1-towel.jpeg", badge: "", description: "Dual-purpose towel set. Soft and highly absorbent.", stock: 35, soldToday: 1 },
            { id: 14, name: "Gold Insulated Vacuum Flask", category: "household", price: 5000, bulkPrice: 4200, bulkQty: 10, image: "vacuum-flask.jpeg", badge: "", description: "Stainless steel flask. Keeps drinks hot/cold for 12 hours.", stock: 25, soldToday: 3 },
            { id: 15, name: "Keyholders (Assorted)", category: "gifts", price: 6000, bulkPrice: 5000, bulkQty: 10, image: "keyholders.jpeg", badge: "", description: "Stylish keyholder set. Great for gifts or personal use.", stock: 40, soldToday: 4 },

            // ===== PAGE 3: STYLISH GIFT ITEMS =====
            { id: 16, name: "Big Size Jute Bag", category: "gifts", price: 3000, bulkPrice: 2500, bulkQty: 20, image: "jute-bag.jpeg", badge: "", description: "Eco-friendly large jute bag. Perfect for shopping or gifts.", stock: 50, soldToday: 5 },
            { id: 17, name: "Shoe Kit", category: "gifts", price: 1800, bulkPrice: 1500, bulkQty: 30, image: "shoe-kit.jpeg", badge: "", description: "Complete shoe care kit with polish, brush, and cloth.", stock: 60, soldToday: 3 },
            { id: 18, name: "Nice Bottle with Handle", category: "gifts", price: 1800, bulkPrice: 1500, bulkQty: 30, image: "bottle-handle.jpeg", badge: "bestseller", description: "Stylish water bottle with carry handle. Customer favorite!", stock: 80, soldToday: 12 },
            { id: 19, name: "Rechargeable Lamps", category: "household", price: 6500, bulkPrice: 5500, bulkQty: 8, image: "rechargeable-lamp.jpeg", badge: "hot", description: "LED rechargeable lamp. Perfect for reading and power outages.", stock: 35, soldToday: 6 },
            { id: 20, name: "Bamboo Cooperate 4 in 1", category: "gifts", price: 2500, bulkPrice: 2000, bulkQty: 20, image: "bamboo-set.jpg", badge: "", description: "4-piece bamboo stationery set. Eco-friendly corporate gift.", stock: 45, soldToday: 2 },
            { id: 21, name: "Luxury Wall Clock", category: "decor", price: 4000, bulkPrice: 3400, bulkQty: 12, image: "wall-clock.jpeg", badge: "", description: "Elegant decorative wall clock. Adds style to any room.", stock: 20, soldToday: 1 },
            { id: 22, name: "Lunch Bag (Premium)", category: "gifts", price: 3500, bulkPrice: 2900, bulkQty: 15, image: "lunch-bag-premium.jpg", badge: "", description: "Premium insulated lunch bag with compartments.", stock: 30, soldToday: 2 },
            { id: 23, name: "Souvenir Bag Dozen", category: "gifts", price: 20000, bulkPrice: 17000, bulkQty: 3, image: "souvenir-bag.jpeg", badge: "", description: "12 custom souvenir bags. Perfect for events and weddings.", stock: 15, soldToday: 1 },
            { id: 24, name: "4 in 1 Cooperate Set", category: "gifts", price: 25000, bulkPrice: 21000, bulkQty: 3, image: "corporate-set.jpeg", badge: "", description: "Executive gift set: pen, notebook, card holder, and keychain.", stock: 10, soldToday: 2 },

            // ===== PAGE 4: EVERYDAY ESSENTIALS =====
            { id: 25, name: "5 in 1 Gym Size Towel", category: "household", price: 5000, bulkPrice: 4200, bulkQty: 8, image: "gym-towel-5in1.jpg", badge: "", description: "Set of 5 gym towels. Quick-dry and compact.", stock: 40, soldToday: 3 },
            { id: 26, name: "Cocktail Cups", category: "kitchenware", price: 2400, bulkPrice: 2000, bulkQty: 20, image: "cocktail-cups.jpg", badge: "", description: "Colorful cocktail cup set. Perfect for parties and events.", stock: 60, soldToday: 4 },
            { id: 27, name: "Mini Basket - Dozen", category: "household", price: 6500, bulkPrice: 5500, bulkQty: 6, image: "mini-basket.jpg", badge: "", description: "12 mini storage baskets. Organize small items easily.", stock: 30, soldToday: 2 },
            { id: 28, name: "Multipurpose Cable", category: "gadgets", price: 4500, bulkPrice: 3800, bulkQty: 10, image: "multipurpose-cable.jpg", badge: "", description: "3-in-1 charging cable. Compatible with all phone types.", stock: 50, soldToday: 7 },
            { id: 29, name: "Slub Cup", category: "kitchenware", price: 2000, bulkPrice: 1700, bulkQty: 24, image: "slub-cup.jpg", badge: "", description: "Textured ceramic slub cup. Stylish and durable.", stock: 45, soldToday: 3 },
            { id: 30, name: "Toilet Brush", category: "household", price: 1500, bulkPrice: 1200, bulkQty: 30, image: "toilet-brush.jpg", badge: "", description: "Long-handled toilet brush with holder. Hygienic design.", stock: 70, soldToday: 5 },
            { id: 31, name: "Foldable Bowl", category: "kitchenware", price: 1500, bulkPrice: 1200, bulkQty: 30, image: "foldable-bowl.jpg", badge: "", description: "Silicone foldable bowl. Space-saving and portable.", stock: 55, soldToday: 4 },
            { id: 32, name: "Keyholder MOQ 30Pcs", category: "gifts", price: 1500, bulkPrice: 1200, bulkQty: 30, image: "keyholder-moq.jpg", badge: "", description: "Custom keyholders. Minimum order 30 pieces.", stock: 100, soldToday: 8 },
            { id: 33, name: "Office Mugs", category: "gifts", price: 2900, bulkPrice: 2400, bulkQty: 15, image: "office-mugs.jpg", badge: "", description: "Ceramic office mug set. Professional and elegant.", stock: 40, soldToday: 3 },

            // ===== PAGE 5: HOME HANDY ESSENTIALS =====
            { id: 34, name: "Plate Rack", category: "kitchenware", price: 4500, bulkPrice: 3800, bulkQty: 10, image: "plate-rack.jpg", badge: "", description: "3-tier plate drying rack. Drainage tray included.", stock: 25, soldToday: 2 },
            { id: 35, name: "Serving Spoon (Set)", category: "kitchenware", price: 2000, bulkPrice: 1700, bulkQty: 20, image: "serving-spoon.jpg", badge: "", description: "Set of wooden serving spoons. Smooth finish.", stock: 50, soldToday: 4 },
            { id: 36, name: "Smp Bowl - Dozen", category: "kitchenware", price: 24000, bulkPrice: 20000, bulkQty: 2, image: "smp-bowl.jpg", badge: "", description: "12-piece premium bowl set. High-quality melamine.", stock: 15, soldToday: 1 },
            { id: 37, name: "Data Cable", category: "gadgets", price: 3000, bulkPrice: 2500, bulkQty: 20, image: "data-cable.jpg", badge: "", description: "Fast-charging data cable. Braided for durability.", stock: 60, soldToday: 6 },
            { id: 38, name: "6Up Bottles", category: "gifts", price: 1600, bulkPrice: 1300, bulkQty: 30, image: "6up-bottles.jpg", badge: "", description: "Set of 6 colorful bottles. Great for kids and events.", stock: 80, soldToday: 5 },
            { id: 39, name: "Mini Touch Light", category: "gadgets", price: 1800, bulkPrice: 1500, bulkQty: 25, image: "mini-touch-light.jpg", badge: "", description: "LED touch-activated light. Stick anywhere.", stock: 70, soldToday: 7 },
            { id: 40, name: "Knife Sharpener", category: "kitchenware", price: 800, bulkPrice: 650, bulkQty: 50, image: "knife-sharpener.jpg", badge: "", description: "Compact knife sharpener. Restores blade edge quickly.", stock: 100, soldToday: 10 },
            { id: 41, name: "3 in 1 Bottle", category: "gifts", price: 6500, bulkPrice: 5500, bulkQty: 8, image: "3in1-bottle.jpeg", badge: "", description: "3-compartment bottle. Separate drinks or snacks.", stock: 30, soldToday: 3 },
            { id: 42, name: "Notepad with Pen", category: "gifts", price: 6000, bulkPrice: 5000, bulkQty: 10, image: "notepad-pen.jpeg", badge: "", description: "Executive notepad with matching pen. Corporate gift ready.", stock: 35, soldToday: 4 }
        ];

        const placeholderImage = "https://via.placeholder.com/300x180/f5f0f7/652e92?text=";

        // ===== WISHLIST =====
        let wishlist = JSON.parse(localStorage.getItem('martied_wishlist')) || [];

        function saveWishlist() {
            localStorage.setItem('martied_wishlist', JSON.stringify(wishlist));
        }

        function toggleWishlist(productId, event) {
            if (event) event.stopPropagation();
            
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
                showToast('Removed from wishlist');
            } else {
                wishlist.push(productId);
                showToast('Added to wishlist!');
            }
            saveWishlist();
            renderProducts(filteredProducts, false); // Re-render to update hearts
            updateWishlistButton(productId);
        }

        function toggleWishlistFromDetail() {
            const productId = parseInt(document.getElementById('detailAddToCart').dataset.productId);
            toggleWishlist(productId);
        }

        function updateWishlistButton(productId) {
            const btn = document.getElementById('detailWishlist');
            if (wishlist.includes(productId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }

        // ===== CART LOGIC =====
        let cart = JSON.parse(localStorage.getItem('martied_cart')) || [];
        let isAdmin = false;
        let editMode = false;

        function saveCart() {
            localStorage.setItem('martied_cart', JSON.stringify(cart));
            updateCartUI();
        }

        function saveProducts() {
            localStorage.setItem('martied_products', JSON.stringify(products));
        }

        function updateCartUI() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            const countEl = document.getElementById('cartCount');
            countEl.textContent = count;
            countEl.style.display = count > 0 ? 'flex' : 'none';
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product.stock <= 0) {
                showToast('Sorry, out of stock!');
                return;
            }
            
            const existing = cart.find(item => item.id === productId);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            saveCart();
            showToast('Added to cart!');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            renderCartItems();
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                    renderCartItems();
                }
            }
        }

        function renderCartItems() {
            const container = document.getElementById('cartItems');
            const footer = document.getElementById('cartFooter');

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-basket"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
                footer.style.display = 'none';
                return;
            }

            let html = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                const imageUrl = getImageUrl({image: item.image});
                html += `
                    <div class="cart-item">
                        <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-times"></i></button>
                        <div class="cart-item-image"><img src="${imageUrl}" alt="${item.name}" onerror="this.src='${placeholderImage}${encodeURIComponent(item.name)}'"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                            <div class="cart-item-quantity">
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="qty-value">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <div style="margin-top: 5px; font-weight: 700; color: var(--primary-purple);">₦${itemTotal.toLocaleString()}</div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
            document.getElementById('cartTotal').textContent = '₦' + total.toLocaleString();
            footer.style.display = 'block';
        }

        function toggleCart() {
            const overlay = document.getElementById('cartOverlay');
            const sidebar = document.getElementById('cartSidebar');

            if (sidebar.classList.contains('active')) {
                overlay.classList.remove('active');
                sidebar.classList.remove('active');
            } else {
                overlay.classList.add('active');
                sidebar.classList.add('active');
                renderCartItems();
            }
        }

        // ===== CHECKOUT =====
        function showCheckout() {
            toggleCart();
            const overlay = document.getElementById('checkoutOverlay');
            const itemsContainer = document.getElementById('checkoutItems');

            let html = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                html += `
                    <div class="checkout-item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>₦${itemTotal.toLocaleString()}</span>
                    </div>
                `;
            });

            itemsContainer.innerHTML = html;
            document.getElementById('checkoutTotal').textContent = '₦' + total.toLocaleString();

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCheckout() {
            document.getElementById('checkoutOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        function closeCheckoutOnOverlay(event) {
            if (event.target === event.currentTarget) {
                closeCheckout();
            }
        }

        function selectPayment(method) {
            document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
            document.getElementById('bankDetails').classList.remove('active');
            document.getElementById('btnWhatsApp').style.display = 'none';
            document.getElementById('btnBank').style.display = 'none';

            document.getElementById('opt-' + method).classList.add('selected');

            if (method === 'bank') {
                document.getElementById('bankDetails').classList.add('active');
                document.getElementById('btnBank').style.display = 'block';
            } else {
                document.getElementById('btnWhatsApp').style.display = 'block';
            }
        }

        function copyAccount() {
            navigator.clipboard.writeText('9130485545').then(() => {
                alert('Account number copied!');
            });
        }

        function finalizeOrder(method) {
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const address = document.getElementById('customerAddress').value.trim();

            if (!name || !phone || !address) {
                alert('Please fill all fields');
                return;
            }

            let message = `*ORDER - Martie-D*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Phone:* ${phone}%0A`;
            message += `*Address:* ${address}%0A%0A`;
            message += `*Items:*%0A`;

            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                message += `• ${item.name} x${item.quantity} = ₦${itemTotal.toLocaleString()}%0A`;
            });

            message += `%0A*Total: ₦${total.toLocaleString()}*%0A`;
            message += `*Payment:* ${method === 'bank' ? 'Bank Transfer (Moniepoint)' : 'WhatsApp/OD'}%0A`;

            window.open(`https://wa.me/2348168140356?text=${message}`, '_blank');

            cart = [];
            saveCart();
            closeCheckout();
            showToast('Order sent!');
        }

        // ===== PRODUCT DISPLAY =====
        function getImageUrl(product) {
            if (product.image.startsWith('http') || product.image.startsWith('data:')) {
                return product.image;
            }
            return BASE_IMAGE_URL + product.image;
        }

        function getStockBadge(stock) {
            if (stock <= 0) return '<span class="stock-badge stock-out">Out of Stock</span>';
            if (stock <= 5) return `<span class="stock-badge stock-low">Only ${stock} left!</span>`;
            return '<span class="stock-badge stock-high">In Stock</span>';
        }

        function getSocialProof(soldToday) {
            if (soldToday === 0) return '';
            return `<div class="social-proof"><i class="fas fa-fire"></i> ${soldToday} sold today</div>`;
        }

        function renderProducts(productsToRender = filteredProducts, resetPage = true) {
            const grid = document.getElementById('productsGrid');
            
            if (resetPage) {
                currentPage = 1;
                grid.innerHTML = '';
            }
            
            const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
            const endIndex = currentPage * PRODUCTS_PER_PAGE;
            const productsToShow = productsToRender.slice(startIndex, endIndex);
            
            if (productsToShow.length === 0 && resetPage) {
                grid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No products found</p>
                        <button class="reset-btn" onclick="resetFilters()">Show All Products</button>
                    </div>
                `;
                updateLoadMoreButton(0, 0);
                updateResultsCount(0);
                return;
            }
            
            let html = '';
            productsToShow.forEach((product, index) => {
                const imageUrl = getImageUrl(product);
                const badge = product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge === 'hot' ? '🔥 Hot' : product.badge === 'new' ? '✨ New' : '⭐ Best'}</span>` : '';
                const bulkNote = product.bulkQty ? `<p class="bulk-note">Bulk ${product.bulkQty}+: ₦${product.bulkPrice.toLocaleString()}</p>` : '';
                const stockBadge = getStockBadge(product.stock);
                const socialProof = getSocialProof(product.soldToday);
                const isWishlisted = wishlist.includes(product.id);
                const animationDelay = index * 0.05;

                html += `
                    <div class="product-card" data-id="${product.id}" data-category="${product.category}" style="animation-delay: ${animationDelay}s">
                        <button class="admin-edit-btn" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
                            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        ${badge}
                        <div class="product-image" onclick="showProductDetail(${product.id})">
                            <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.src='${placeholderImage}${encodeURIComponent(product.name)}'">
                            <button class="quick-view-btn">Quick View</button>
                        </div>
                        <div class="product-content">
                            <div class="product-category">${product.category}</div>
                            <h3 class="product-name" onclick="showProductDetail(${product.id})">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-price">₦${product.price.toLocaleString()}</div>
                            ${stockBadge}
                            ${socialProof}
                            ${bulkNote}
                            <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus"></i> ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                `;
            });

            if (resetPage) {
                grid.innerHTML = html;
            } else {
                grid.insertAdjacentHTML('beforeend', html);
            }
            
            updateLoadMoreButton(productsToRender.length, endIndex);
            updateResultsCount(productsToRender.length);
        }

        function updateLoadMoreButton(totalProducts, currentShowing) {
            const container = document.getElementById('loadMoreContainer');
            const remaining = totalProducts - currentShowing;
            
            if (remaining > 0) {
                container.innerHTML = `
                    <button class="load-more-btn" onclick="loadMoreProducts()" id="loadMoreBtn">
                        <span>Load More Products</span>
                        <i class="fas fa-chevron-down"></i>
                        <span style="display: block; font-size: 0.75rem; font-weight: 400; margin-top: 4px; opacity: 0.9;">
                            Showing ${currentShowing} of ${totalProducts} (${remaining} remaining)
                        </span>
                    </button>
                `;
                setupInfiniteScroll();
            } else {
                container.innerHTML = totalProducts > 0 ? `
                    <div style="text-align: center; padding: 20px; color: var(--text-gray);">
                        <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.5rem; margin-bottom: 8px;"></i>
                        <p style="font-size: 0.9rem;">You've seen all ${totalProducts} products</p>
                    </div>
                ` : '';
            }
        }

        function updateResultsCount(count) {
            document.getElementById('resultsCount').textContent = `${count} product${count !== 1 ? 's' : ''} found`;
        }

        function loadMoreProducts() {
            if (isLoading) return;
            isLoading = true;
            
            const btn = document.getElementById('loadMoreBtn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                btn.disabled = true;
            }
            
            setTimeout(() => {
                currentPage++;
                renderProducts(filteredProducts, false);
                isLoading = false;
            }, 300);
        }

        function setupInfiniteScroll() {
            if (!infiniteScrollEnabled) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isLoading) {
                        const totalShown = currentPage * PRODUCTS_PER_PAGE;
                        if (totalShown < filteredProducts.length) {
                            loadMoreProducts();
                        }
                    }
                });
            }, { rootMargin: '100px' });
            
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) observer.observe(loadMoreBtn);
        }

        // ===== SORTING =====
        function sortProducts() {
            const sortValue = document.getElementById('sortSelect').value;
            currentSort = sortValue;
            
            switch(sortValue) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'newest':
                    filteredProducts.sort((a, b) => b.id - a.id);
                    break;
                default:
                    filteredProducts.sort((a, b) => a.id - b.id);
            }
            
            renderProducts(filteredProducts, true);
        }

        // ===== PRODUCT DETAIL MODAL =====
        let currentDetailProductId = null;

        function showProductDetail(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            currentDetailProductId = productId;
            
            document.getElementById('detailImage').src = getImageUrl(product);
            document.getElementById('detailCategory').textContent = product.category;
            document.getElementById('detailName').textContent = product.name;
            document.getElementById('detailPrice').textContent = '₦' + product.price.toLocaleString();
            document.getElementById('detailDescription').textContent = product.description;
            document.getElementById('detailMetaCategory').textContent = product.category;
            document.getElementById('detailMetaStock').textContent = product.stock > 0 ? `${product.stock} available` : 'Out of stock';
            document.getElementById('detailMetaId').textContent = '#' + String(product.id).padStart(3, '0');
            
            const stockHtml = getStockBadge(product.stock);
            document.getElementById('detailStock').innerHTML = stockHtml;
            
            const bulkMeta = document.getElementById('bulkMetaItem');
            if (product.bulkQty) {
                bulkMeta.style.display = 'block';
                document.getElementById('detailMetaBulk').textContent = `${product.bulkQty}+ at ₦${product.bulkPrice.toLocaleString()}`;
            } else {
                bulkMeta.style.display = 'none';
            }
            
            const addToCartBtn = document.getElementById('detailAddToCart');
            addToCartBtn.dataset.productId = productId;
            addToCartBtn.onclick = () => {
                addToCart(productId);
                closeProductDetail();
            };
            addToCartBtn.disabled = product.stock <= 0;
            addToCartBtn.innerHTML = product.stock <= 0 ? 
                '<i class="fas fa-times"></i> Out of Stock' : 
                '<i class="fas fa-cart-plus"></i> Add to Cart';
            
            updateWishlistButton(productId);
            
            // Load related products
            loadRelatedProducts(product);
            
            const overlay = document.getElementById('productDetailOverlay');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function loadRelatedProducts(currentProduct) {
            const related = products
                .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
                .slice(0, 4);
            
            const grid = document.getElementById('relatedGrid');
            
            if (related.length === 0) {
                document.getElementById('relatedSection').style.display = 'none';
                return;
            }
            
            document.getElementById('relatedSection').style.display = 'block';
            
            let html = '';
            related.forEach(product => {
                const imageUrl = getImageUrl(product);
                html += `
                    <div class="related-item" onclick="showProductDetail(${product.id})">
                        <div class="related-image">
                            <img src="${imageUrl}" alt="${product.name}" onerror="this.src='${placeholderImage}${encodeURIComponent(product.name)}'">
                        </div>
                        <div class="related-name">${product.name}</div>
                        <div class="related-price">₦${product.price.toLocaleString()}</div>
                    </div>
                `;
            });
            
            grid.innerHTML = html;
        }

        function closeProductDetail(event) {
            if (event && event.target !== event.currentTarget) return;
            
            const overlay = document.getElementById('productDetailOverlay');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            currentDetailProductId = null;
        }

        // ===== SEARCH & FILTER =====
        function searchProducts() {
            const term = document.getElementById('searchInput').value.toLowerCase();
            filteredProducts = products.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.description.toLowerCase().includes(term)
            );
            sortProducts(); // Apply current sort
        }

        function filterCategory(category, btn) {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (category === 'all') {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(p => p.category === category);
            }
            sortProducts();
        }

        // ===== MOBILE DROPDOWN FUNCTIONS =====
        function toggleCategoryDropdown() {
            const menu = document.getElementById('catDropdownMenu');
            const toggle = document.getElementById('catDropdownToggle');
            const isOpen = menu.classList.contains('open');

            if (isOpen) {
                menu.classList.remove('open');
                toggle.classList.remove('open');
            } else {
                menu.classList.add('open');
                toggle.classList.add('open');
            }
        }

        function filterCategoryDropdown(category, btn) {
            // Update dropdown items
            document.querySelectorAll('.category-dropdown-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update label
            const label = document.getElementById('currentCategoryLabel');
            const categoryNames = {
                'all': '<i class="fas fa-th-large"></i> All Categories',
                'kitchenware': '<i class="fas fa-utensils"></i> Kitchenware',
                'household': '<i class="fas fa-home"></i> Household',
                'back2school': '<i class="fas fa-graduation-cap"></i> Back2School',
                'decor': '<i class="fas fa-couch"></i> Decor & Furniture',
                'gadgets': '<i class="fas fa-mobile-alt"></i> Gadgets',
                'gifts': '<i class="fas fa-gift"></i> Gifts',
                'personal': '<i class="fas fa-spa"></i> Personal Care'
            };
            label.innerHTML = categoryNames[category] || category;

            // Close dropdown
            document.getElementById('catDropdownMenu').classList.remove('open');
            document.getElementById('catDropdownToggle').classList.remove('open');

            // Filter products
            if (category === 'all') {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(p => p.category === category);
            }
            sortProducts();
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('categoryDropdownMobile');
            if (dropdown && !dropdown.contains(e.target)) {
                const menu = document.getElementById('catDropdownMenu');
                const toggle = document.getElementById('catDropdownToggle');
                if (menu) menu.classList.remove('open');
                if (toggle) toggle.classList.remove('open');
            }
        });

        function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('sortSelect').value = 'default';
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.category-btn').classList.add('active');
            filteredProducts = [...products];
            currentSort = 'default';
            renderProducts(filteredProducts, true);
        }

        // ===== BACK TO TOP =====
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function handleScroll() {
            const backToTop = document.getElementById('backToTop');
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // ===== ADMIN FUNCTIONS =====
        function showLogin() {
            document.getElementById('loginOverlay').classList.add('active');
            document.getElementById('adminPassword').value = '';
            document.getElementById('adminPassword').focus();
        }

        function closeLogin() {
            document.getElementById('loginOverlay').classList.remove('active');
            document.getElementById('loginError').style.display = 'none';
        }

        function checkAdminLogin() {
            const password = document.getElementById('adminPassword').value;
            if (password === 'MartieD2026!') {
                isAdmin = true;
                closeLogin();
                document.getElementById('adminPanel').classList.add('active');
                document.body.classList.add('admin-mode');
                showToast('Admin mode activated!');
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        }

        function logoutAdmin() {
            isAdmin = false;
            editMode = false;
            document.getElementById('adminPanel').classList.remove('active');
            document.body.classList.remove('admin-mode');
            document.body.classList.remove('admin-edit');
            document.getElementById('addProductForm').classList.remove('active');
            document.getElementById('editModeBtn').textContent = 'Edit: OFF';
            showToast('Logged out');
        }

        function toggleEditMode() {
            if (!isAdmin) return;
            editMode = !editMode;
            if (editMode) {
                document.body.classList.add('admin-edit');
                document.getElementById('editModeBtn').textContent = 'Edit: ON';
                showToast('Edit mode ON - Click text to edit');
            } else {
                document.body.classList.remove('admin-edit');
                document.getElementById('editModeBtn').textContent = 'Edit: OFF';
                showToast('Edit mode OFF');
            }
        }

        function inlineEdit(productId, field) {
            if (!isAdmin || !editMode) return;
            const product = products.find(p => p.id === productId);
            if (!product) return;

            let newValue;
            if (field === 'price') {
                newValue = prompt(`Edit price for ${product.name}:`, product.price);
                if (newValue !== null && !isNaN(newValue)) {
                    product.price = parseInt(newValue);
                    saveProducts();
                    renderProducts(filteredProducts, true);
                    showToast('Price updated!');
                }
            } else if (field === 'name') {
                newValue = prompt(`Edit product name:`, product.name);
                if (newValue !== null && newValue.trim() !== '') {
                    product.name = newValue.trim();
                    saveProducts();
                    renderProducts(filteredProducts, true);
                    showToast('Name updated!');
                }
            } else if (field === 'description') {
                newValue = prompt(`Edit description:`, product.description);
                if (newValue !== null) {
                    product.description = newValue.trim();
                    saveProducts();
                    renderProducts(filteredProducts, true);
                    showToast('Description updated!');
                }
            } else if (field === 'stock') {
                newValue = prompt(`Edit stock quantity:`, product.stock);
                if (newValue !== null && !isNaN(newValue)) {
                    product.stock = parseInt(newValue);
                    saveProducts();
                    renderProducts(filteredProducts, true);
                    showToast('Stock updated!');
                }
            }
        }

        function editProduct(id) {
            if (!isAdmin) {
                showToast('Please login as admin first!');
                return;
            }
            const productCard = document.querySelector(`[data-id="${id}"]`);
            if (productCard) {
                productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                productCard.style.animation = 'pulse 1s';
                setTimeout(() => {
                    productCard.style.animation = '';
                }, 1000);
                if (!editMode) {
                    showToast('Enable Edit Mode to make changes');
                }
            }
        }

        function addNewProduct() {
            if (!isAdmin) return;
            document.getElementById('addProductForm').classList.add('active');
            document.getElementById('newProductName').focus();
        }

        function cancelAddProduct() {
            document.getElementById('addProductForm').classList.remove('active');
            document.getElementById('newProductName').value = '';
            document.getElementById('newProductPrice').value = '';
            document.getElementById('newProductStock').value = '10';
            document.getElementById('newProductImage').value = '';
            document.getElementById('newProductDescription').value = '';
        }

        function saveNewProduct() {
            const name = document.getElementById('newProductName').value.trim();
            const price = parseInt(document.getElementById('newProductPrice').value);
            const stock = parseInt(document.getElementById('newProductStock').value) || 10;
            const image = document.getElementById('newProductImage').value.trim();
            const category = document.getElementById('newProductCategory').value;
            const description = document.getElementById('newProductDescription').value.trim();

            if (!name || !price) {
                alert('Please enter at least name and price');
                return;
            }

            const newId = Math.max(...products.map(p => p.id), 0) + 1;
            let imagePath = image;
            if (!imagePath) {
                imagePath = `https://via.placeholder.com/300x180/f5f0f7/652e92?text=${encodeURIComponent(name)}`;
            }

            const newProduct = {
                id: newId,
                name: name,
                category: category,
                price: price,
                bulkPrice: Math.floor(price * 0.9),
                bulkQty: 10,
                image: imagePath,
                badge: 'new',
                description: description || 'New product',
                stock: stock,
                soldToday: 0
            };

            products.push(newProduct);
            saveProducts();
            filteredProducts = [...products];
            renderProducts(filteredProducts, true);
            cancelAddProduct();
            showToast('New product added!');
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        // ===== INIT =====
        document.addEventListener('DOMContentLoaded', function() {
            filteredProducts = [...products];
            renderProducts(filteredProducts, true);
            updateCartUI();

            window.addEventListener('scroll', handleScroll);

            document.getElementById('adminPassword').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') checkAdminLogin();
            });
        });