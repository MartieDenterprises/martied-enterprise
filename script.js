// ===== CONFIGURATION =====
        const GITHUB_USERNAME = 'YOURUSERNAME';
        const GITHUB_REPO = 'YOURREPO';
        const GITHUB_BRANCH = 'main';

        const BASE_IMAGE_URL = (() => {
            if (window.location.hostname.includes('github.io')) {
                return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/images/`;
            }
            return 'images/';
        })();

        // ===== PAGINATION CONFIG =====
        const PRODUCTS_PER_PAGE = 8;
        let currentPage = 1;
        let filteredProducts = [];
        let isLoading = false;
        let infiniteScrollEnabled = false;
        let currentSort = 'default';

        // ===== PRODUCT DATA WITH STOCK =====
        let products = JSON.parse(localStorage.getItem('martied_products')) || [
            { id: 1, name: "Air Fryer", category: "kitchenware", price: 25000, bulkPrice: 22500, bulkQty: 5, image: "airfryer.jpg", badge: "hot", description: "Healthy frying with no oil. Perfect for modern kitchens.", stock: 15, soldToday: 3 },
            { id: 2, name: "Rice Cooker", category: "kitchenware", price: 18500, bulkPrice: 16650, bulkQty: 10, image: "ricecooker.jpg", badge: "", description: "Automatic cooking function with keep-warm feature.", stock: 8, soldToday: 1 },
            { id: 3, name: "Pressure Cooker", category: "kitchenware", price: 15000, bulkPrice: 13500, bulkQty: 8, image: "pressurecooker.jpg", badge: "", description: "Fast cooking, saves energy and time.", stock: 12, soldToday: 0 },
            { id: 4, name: "Yam Pounder", category: "kitchenware", price: 12000, bulkPrice: 10800, bulkQty: 6, image: "yampounder.jpg", badge: "bestseller", description: "Make pounded yam in minutes. No more stress!", stock: 5, soldToday: 7 },
            { id: 5, name: "Food Processor", category: "kitchenware", price: 8500, bulkPrice: 7650, bulkQty: 12, image: "foodprocessor.jpg", badge: "", description: "Chop, blend, grind easily. Multi-functional.", stock: 20, soldToday: 2 },
            { id: 6, name: "Electric Kettle", category: "kitchenware", price: 6500, bulkPrice: 5850, bulkQty: 15, image: "kettle.jpg", badge: "", description: "Fast boiling, durable stainless steel.", stock: 25, soldToday: 0 },
            { id: 7, name: "Non-Stick Pans", category: "kitchenware", price: 14000, bulkPrice: 12600, bulkQty: 8, image: "pans.jpg", badge: "", description: "3-piece frying pan set. Easy to clean.", stock: 10, soldToday: 1 },
            { id: 8, name: "Silicone Utensils", category: "kitchenware", price: 4500, bulkPrice: 4050, bulkQty: 20, image: "utensils.jpg", badge: "", description: "Heat-resistant tools. 5-piece set.", stock: 30, soldToday: 0 },

            { id: 9, name: "Power Bank 20KmAh", category: "household", price: 12000, bulkPrice: 10800, bulkQty: 10, image: "powerbank.jpg", badge: "bestseller", description: "High capacity charging for all devices.", stock: 6, soldToday: 5 },
            { id: 10, name: "LED Lantern", category: "household", price: 8000, bulkPrice: 7200, bulkQty: 12, image: "lantern.jpg", badge: "", description: "Bright emergency light. Rechargeable.", stock: 18, soldToday: 0 },
            { id: 11, name: "Solar Fan", category: "household", price: 15000, bulkPrice: 13500, bulkQty: 6, image: "solarfan.jpg", badge: "hot", description: "Rechargeable cooling. Perfect for power outages.", stock: 4, soldToday: 2 },
            { id: 12, name: "Mosquito Net", category: "household", price: 4500, bulkPrice: 4050, bulkQty: 15, image: "mosquitonet.jpg", badge: "", description: "Malaria protection for the whole family.", stock: 22, soldToday: 0 },
            { id: 13, name: "Drying Rack", category: "household", price: 7500, bulkPrice: 6750, bulkQty: 8, image: "dryingrack.jpg", badge: "", description: "Foldable clothes rack. Space-saving.", stock: 14, soldToday: 1 },
            { id: 14, name: "Shoe Rack", category: "household", price: 5000, bulkPrice: 4500, bulkQty: 12, image: "shoerack.jpg", badge: "", description: "Stackable organizer for 12 pairs.", stock: 16, soldToday: 0 },
            { id: 15, name: "Bedding Set", category: "household", price: 12000, bulkPrice: 10800, bulkQty: 10, image: "bedding.jpg", badge: "", description: "Soft 4-piece set. King size.", stock: 9, soldToday: 3 },

            { id: 16, name: "Ankara Notebook", category: "gifts", price: 3500, bulkPrice: 2800, bulkQty: 50, image: "notebook.jpg", badge: "new", description: "African fabric cover. Perfect for corporate gifts.", stock: 100, soldToday: 0 },
            { id: 17, name: "Thermal Flask", category: "gifts", price: 4500, bulkPrice: 3825, bulkQty: 30, image: "flask.jpg", badge: "bestseller", description: "Customizable corporate gift. 500ml.", stock: 7, soldToday: 4 },
            { id: 18, name: "Tote Bag", category: "gifts", price: 2800, bulkPrice: 2240, bulkQty: 100, image: "totebag.jpg", badge: "", description: "Eco-friendly jute bag. Custom printing available.", stock: 50, soldToday: 0 },
            { id: 19, name: "Wine Opener", category: "gifts", price: 3000, bulkPrice: 2550, bulkQty: 40, image: "wineopener.jpg", badge: "", description: "Elegant bar tool set. Gift boxed.", stock: 35, soldToday: 0 },
            { id: 20, name: "Custom Umbrella", category: "gifts", price: 5500, bulkPrice: 4675, bulkQty: 25, image: "umbrella.jpg", badge: "", description: "Branded rain protection. Auto-open.", stock: 20, soldToday: 1 },

            { id: 21, name: "Electric Toothbrush", category: "personal", price: 5000, bulkPrice: 4500, bulkQty: 20, image: "toothbrush.jpg", badge: "", description: "Advanced oral care. 3 modes.", stock: 28, soldToday: 0 },
            { id: 22, name: "Facial Steamer", category: "personal", price: 8500, bulkPrice: 7650, bulkQty: 12, image: "steamer.jpg", badge: "", description: "Spa-quality skincare at home.", stock: 11, soldToday: 2 },
            { id: 23, name: "Hair Clipper", category: "personal", price: 7000, bulkPrice: 6300, bulkQty: 12, image: "clipper.jpg", badge: "", description: "Professional grooming kit. 4 guards.", stock: 13, soldToday: 0 },
            { id: 24, name: "Garment Steamer", category: "personal", price: 9500, bulkPrice: 8550, bulkQty: 10, image: "garmentsteamer.jpg", badge: "", description: "Wrinkle-free clothes in minutes.", stock: 6, soldToday: 1 },

            // ===== BACK2SCHOOL PRODUCTS =====
            { id: 25, name: "Student Backpack", category: "back2school", price: 8500, bulkPrice: 7200, bulkQty: 20, image: "backpack.jpg", badge: "new", description: "Durable waterproof backpack with laptop compartment.", stock: 45, soldToday: 5 },
            { id: 26, name: "Lunch Box Set", category: "back2school", price: 4500, bulkPrice: 3825, bulkQty: 30, image: "lunchbox.jpg", badge: "", description: "3-piece leak-proof container set with cutlery.", stock: 60, soldToday: 2 },
            { id: 27, name: "Stationery Kit", category: "back2school", price: 3500, bulkPrice: 2975, bulkQty: 50, image: "stationery.jpg", badge: "bestseller", description: "Complete writing set: pens, pencils, erasers & ruler.", stock: 80, soldToday: 12 },
            { id: 28, name: "Water Bottle 1L", category: "back2school", price: 2500, bulkPrice: 2125, bulkQty: 40, image: "waterbottle.jpg", badge: "", description: "Insulated stainless steel bottle. Keeps drinks cold 12hrs.", stock: 55, soldToday: 3 },
            { id: 29, name: "School Shoes", category: "back2school", price: 12000, bulkPrice: 10200, bulkQty: 15, image: "schoolshoes.jpg", badge: "", description: "Black leather school shoes. Comfortable all-day wear.", stock: 25, soldToday: 1 },
            { id: 30, name: "Scientific Calculator", category: "back2school", price: 5500, bulkPrice: 4675, bulkQty: 25, image: "calculator.jpg", badge: "hot", description: "Advanced 417-function calculator for students.", stock: 35, soldToday: 8 },

            // ===== DECOR & FURNITURE PRODUCTS =====
            { id: 31, name: "Wall Art Canvas", category: "decor", price: 15000, bulkPrice: 12750, bulkQty: 8, image: "wallart.jpg", badge: "new", description: "Modern abstract canvas print. Ready to hang.", stock: 12, soldToday: 1 },
            { id: 32, name: "LED Strip Lights", category: "decor", price: 6500, bulkPrice: 5525, bulkQty: 15, image: "ledstrip.jpg", badge: "hot", description: "RGB color-changing strip with remote. 5 meters.", stock: 40, soldToday: 6 },
            { id: 33, name: "Throw Pillows (2pcs)", category: "decor", price: 8000, bulkPrice: 6800, bulkQty: 12, image: "pillows.jpg", badge: "", description: "Soft decorative cushions with removable covers.", stock: 22, soldToday: 2 },
            { id: 34, name: "Foldable Storage Ottoman", category: "decor", price: 18000, bulkPrice: 15300, bulkQty: 6, image: "ottoman.jpg", badge: "bestseller", description: "Multi-functional seat with hidden storage compartment.", stock: 8, soldToday: 3 },
            { id: 35, name: "Table Lamp Modern", category: "decor", price: 9500, bulkPrice: 8075, bulkQty: 10, image: "tablelamp.jpg", badge: "", description: "Minimalist bedside lamp with touch dimmer.", stock: 15, soldToday: 1 },
            { id: 36, name: "Floating Shelves (3pcs)", category: "decor", price: 11000, bulkPrice: 9350, bulkQty: 8, image: "shelves.jpg", badge: "", description: "Rustic wood wall shelves. Easy installation included.", stock: 18, soldToday: 0 },

            // ===== GADGETS PRODUCTS =====
            { id: 37, name: "Bluetooth Earbuds", category: "gadgets", price: 15000, bulkPrice: 12750, bulkQty: 10, image: "earbuds.jpg", badge: "hot", description: "True wireless with noise cancellation. 30hr battery.", stock: 20, soldToday: 7 },
            { id: 38, name: "Smart Watch", category: "gadgets", price: 25000, bulkPrice: 21250, bulkQty: 8, image: "smartwatch.jpg", badge: "bestseller", description: "Fitness tracker with heart rate & sleep monitor.", stock: 10, soldToday: 4 },
            { id: 39, name: "Phone Stand Holder", category: "gadgets", price: 3500, bulkPrice: 2975, bulkQty: 50, image: "phonestand.jpg", badge: "", description: "Adjustable aluminum stand for desk or bed.", stock: 70, soldToday: 3 },
            { id: 40, name: "USB-C Hub 7-in-1", category: "gadgets", price: 12000, bulkPrice: 10200, bulkQty: 15, image: "usbhub.jpg", badge: "new", description: "Multi-port adapter: HDMI, USB, SD card & charging.", stock: 25, soldToday: 2 },
            { id: 41, name: "Portable Projector", category: "gadgets", price: 45000, bulkPrice: 38250, bulkQty: 4, image: "projector.jpg", badge: "", description: "Mini HD projector. Connects to phone & laptop.", stock: 5, soldToday: 1 },
            { id: 42, name: "Wireless Charger Pad", category: "gadgets", price: 6500, bulkPrice: 5525, bulkQty: 25, image: "wirelesscharger.jpg", badge: "", description: "Fast charging for all Qi-enabled smartphones.", stock: 30, soldToday: 5 }
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