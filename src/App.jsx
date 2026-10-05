import { useState } from "react";
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { products } from "./data/products";
import "./App.css";

const WHATSAPP_NUMBER = "2349017316232";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getProduct = (productId) =>
    products.find((product) => product.id === productId);

  const getQuantity = (productId) => cart[productId] || 0;

  const getMinimumOrder = (productId) => {
    const product = getProduct(productId);
    return product?.minOrder || 1;
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;
      const minimumOrder = getMinimumOrder(productId);

      return {
        ...currentCart,
        [productId]:
          currentQuantity === 0
            ? minimumOrder
            : currentQuantity + 1,
      };
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;
      const minimumOrder = getMinimumOrder(productId);

      if (currentQuantity <= minimumOrder) {
        const updatedCart = { ...currentCart };
        delete updatedCart[productId];
        return updatedCart;
      }

      return {
        ...currentCart,
        [productId]: currentQuantity - 1,
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      const updatedCart = { ...currentCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const addToOrder = (productId) => {
    increaseQuantity(productId);
  };

  const openWhatsApp = () => {
    const message =
      "Hello SIPS AND TALES, I would like to make an enquiry.";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const selectedProducts = products.filter(
    (product) => cart[product.id]
  );

  const totalItems = selectedProducts.reduce(
    (total, product) => total + cart[product.id],
    0
  );

  const totalPrice = selectedProducts.reduce(
    (total, product) =>
      total + product.price * cart[product.id],
    0
  );

  const sendWhatsAppOrder = () => {
    if (selectedProducts.length === 0) return;

    const orderLines = selectedProducts.map((product) => {
      const quantity = cart[product.id];
      const amount = product.price * quantity;

      return `${product.name} x ${quantity} = ${formatPrice(amount)}`;
    });

    const message = `Hello SIPS AND TALES,

I would like to place an order:

${orderLines.join("\n")}

Total Items: ${totalItems}
Total Amount: ${formatPrice(totalPrice)}

Please confirm my order and delivery details.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">
          <a href="#home" className="brand">
            <img
              src="/images/logo/logo.png"
              alt="SIPS AND TALES"
            />
          </a>

          <nav>
            <a href="#home">Home</a>
            <a href="#products">Our Drinks</a>
            <a href="#about">About Us</a>
          </nav>

          <div className="nav-actions">
            <button
              className="nav-order-button"
              onClick={openWhatsApp}
            >
              <MessageCircle size={17} />
              <span>Order Now</span>
            </button>

            <button
              className="nav-cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={21} />

              {totalItems > 0 && (
                <span className="nav-cart-count">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-text">
              <span className="eyebrow">
                Naturally made. Beautifully enjoyed.
              </span>

              <h1>
                Every sip has
                <span> a story.</span>
              </h1>

              <p className="hero-description">
                Creamy tigernut drinks and refreshing blends made
                for everyday moments worth remembering.
              </p>

              <div className="hero-buttons">
                <a
                  href="#products"
                  className="primary-button"
                >
                  Explore Our Drinks
                </a>

                <button
                  className="secondary-button"
                  onClick={openWhatsApp}
                >
                  <MessageCircle size={18} />
                  Chat With Us
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="color-orb orb-blue"></div>
              <div className="color-orb orb-green"></div>
              <div className="color-orb orb-orange"></div>

              <div className="hero-card glass-card">
                <video
                  src="/images/lifestyle/drink-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section" id="products">
          <div className="section-heading">
            <span className="eyebrow">
              Our Collection
            </span>

            <h2>
              Find your
              <span> favourite sip.</span>
            </h2>

            <p>
              From classic creamy tigernut to bold and refreshing
              flavours, there is a SIPS AND TALES drink for every
              mood.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => {
              const quantity = getQuantity(product.id);

              return (
                <article
                  className={`product-card ${product.accent}`}
                  key={product.id}
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div className="product-info">
                    <span className="product-number">
                      {String(product.id).padStart(2, "0")}
                    </span>

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <div className="product-order-row">
                      <div>
                        <strong className="product-price">
                          {formatPrice(product.price)}
                        </strong>

                        {product.minOrder > 1 && (
                          <div className="minimum-order">
                            Minimum order: {product.minOrder}
                          </div>
                        )}
                      </div>

                      {quantity === 0 ? (
                        <button
                          className="add-order-button"
                          onClick={() =>
                            addToOrder(product.id)
                          }
                        >
                          Add to Order
                          <Plus size={17} />
                        </button>
                      ) : (
                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              decreaseQuantity(product.id)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>

                          <span>{quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(product.id)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div className="about-card glass-card">
            <div className="about-text">
              <span className="eyebrow">
                Our Story
              </span>

              <h2>
                More than a drink,
                <span> it is a tale.</span>
              </h2>

              <p>
                SIPS AND TALES was created from a simple love for
                refreshing drinks, good flavours and beautiful
                moments.
              </p>

              <p>
                Every bottle is made to give you that little pause
                in your day.
              </p>
            </div>

            <div className="about-video">
              <video
                src="/images/lifestyle/about-drink-video.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <span className="eyebrow">
            Ready to Sip?
          </span>

          <h2>
            Your next favourite drink
            <span> is waiting.</span>
          </h2>

          <button
            className="cta-order-button"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={18} />
            View Your Order
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <strong>SIPS AND TALES</strong>

        <p>
          Beautiful drinks for beautiful moments.
        </p>

        <div className="social-links">
          <a
            href="https://www.instagram.com/sips_n_tales?stkn=ZmVpZ2JjYnM5N242&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow SIPS AND TALES on Instagram"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://www.tiktok.com/@sips.tales?_r=1&_t=ZS-9AJNwNXo5US"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow SIPS AND TALES on TikTok"
          >
            <FaTiktok size={20} />
          </a>
        </div>
      </footer>

      {/* WHATSAPP */}
      <button
        className="floating-whatsapp"
        onClick={openWhatsApp}
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={23} />

        <span className="whatsapp-tooltip">
          Chat with us
        </span>
      </button>

      {/* CART */}
      {isCartOpen && (
        <div className="cart-overlay">
          <div
            className="cart-backdrop"
            onClick={() => setIsCartOpen(false)}
          />

          <aside className="cart-panel">
            <div className="cart-header">
              <div>
                <span className="cart-eyebrow">
                  Your Order
                </span>

                <h3>Your Cart</h3>
              </div>

              <button
                className="close-cart"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={21} />
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <ShoppingBag size={38} />
                </div>

                <h4>Your cart is empty</h4>

                <p>
                  Add your favourite SIPS AND TALES drinks to get
                  started.
                </p>

                <button
                  className="continue-shopping"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {selectedProducts.map((product) => (
                    <div
                      className="cart-item"
                      key={product.id}
                    >
                      <div className="cart-item-image">
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      </div>

                      <div className="cart-item-details">
                        <h4>{product.name}</h4>

                        <span className="cart-item-price">
                          {formatPrice(product.price)} each
                        </span>

                        {product.minOrder > 1 && (
                          <small className="cart-item-moq">
                            Minimum: {product.minOrder}
                          </small>
                        )}

                        <div className="cart-quantity">
                          <button
                            onClick={() =>
                              decreaseQuantity(product.id)
                            }
                          >
                            <Minus size={14} />
                          </button>

                          <span>
                            {getQuantity(product.id)}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(product.id)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-right">
                        <span className="cart-item-subtotal">
                          {formatPrice(
                            product.price *
                              getQuantity(product.id)
                          )}
                        </span>

                        <button
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(product.id)
                          }
                          aria-label={`Remove ${product.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Total Items</span>
                    <strong>{totalItems}</strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>

                    <strong>
                      {formatPrice(totalPrice)}
                    </strong>
                  </div>
                </div>

                <button
                  className="whatsapp-checkout"
                  onClick={sendWhatsAppOrder}
                >
                  <MessageCircle size={19} />
                  Order on WhatsApp
                </button>

                <p className="checkout-note">
                  Your order will open in WhatsApp for confirmation.
                </p>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
