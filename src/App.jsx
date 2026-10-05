import { useState } from "react";
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { products } from "./data/products";
import "./App.css";

const WHATSAPP_NUMBER = "2349017316232";

const formatPrice = (price) => {
  return `₦${price.toLocaleString("en-NG")}`;
};

function App() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const getQuantity = (productId) => {
    return cart[productId] || 0;
  };

  const getMinimumOrder = (productId) => {
    const product = products.find((item) => item.id === productId);

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
    setCart((currentCart) => {
      const product = products.find(
        (item) => item.id === productId
      );

      const minimumOrder = product?.minOrder || 1;

      return {
        ...currentCart,
        [productId]:
          currentCart[productId] || minimumOrder,
      };
    });

    setCartOpen(true);
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

  const createWhatsAppOrder = () => {
    if (selectedProducts.length === 0) {
      return;
    }

    const orderLines = selectedProducts.map((product) => {
      const quantity = cart[product.id];
      const subtotal = product.price * quantity;

      return `${product.name}
Quantity: ${quantity}
Price: ${formatPrice(product.price)} each
Subtotal: ${formatPrice(subtotal)}`;
    });

    const message = `Hello SIPS AND TALES 👋

I would like to place an order:

${orderLines.join("\n\n")}

Total items: ${totalItems}
Total amount: ${formatPrice(totalPrice)}

Please confirm availability and delivery details.

Thank you.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const openGeneralWhatsApp = () => {
    const message = `Hello SIPS AND TALES 👋

I would like to make an enquiry about your drinks.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="app">
      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">
        <a href="#home" className="brand">
          <img
            src="/images/logo/logo.png"
            alt="SIPS AND TALES"
          />
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#drinks">Our Drinks</a>
          <a href="#about">About</a>
        </nav>

        <button
          type="button"
          className="nav-order-button"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag size={16} />

          Order Now

          {totalItems > 0 && (
            <span className="nav-cart-count">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      <main>
        {/* =========================
            HERO
        ========================= */}

        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">SIPS AND TALES</p>

            <h1>
              <span>Good</span>{" "}
              <span>drinks</span>{" "}
              <span>good</span>{" "}
              <span>stories.</span>
            </h1>

            <p className="hero-text">
              Delicious tigernut drinks made with care,
              creativity and unforgettable flavour.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() =>
                document
                  .getElementById("drinks")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Our Drinks
            </button>
          </div>

          <div className="hero-visual">
            <div className="color-orb orb-blue"></div>
            <div className="color-orb orb-green"></div>
            <div className="color-orb orb-orange"></div>

            <div className="glass-card hero-card">
              <span>
                <video
                  src="/images/lifestyle/drink-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </span>

              <p>
                Sip something delicious.
                <br />
                Tell a better tale.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            PRODUCTS
        ========================= */}

        <section
          className="products-section"
          id="drinks"
        >
          <div className="section-heading">
            <p className="eyebrow">OUR DRINKS</p>

            <h2>
              <span>Pick</span>{" "}
              <span>your</span>{" "}
              <span>favourite.</span>
            </h2>

            <p>
              From classic tigernut goodness to bold
              flavours and refreshing Zobo, there is a
              SIPS AND TALES drink for every mood.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => {
              const quantity = getQuantity(product.id);
              const minOrder = product.minOrder || 1;
              const isSelected = quantity > 0;
              const isMinimumQuantity =
                quantity <= minOrder;

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
                    <h3>{product.name}</h3>

                    <div className="product-price">
                      {formatPrice(product.price)} each
                    </div>

                    {minOrder > 1 && (
                      <p className="minimum-order">
                        Minimum order: {minOrder}
                      </p>
                    )}

                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-order-row">
                      {isSelected && (
                        <div className="quantity-control">
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name} quantity`}
                            onClick={() =>
                              decreaseQuantity(product.id)
                            }
                          >
                            <Minus size={14} />
                          </button>

                          <span>{quantity}</span>

                          <button
                            type="button"
                            aria-label={`Increase ${product.name} quantity`}
                            onClick={() =>
                              increaseQuantity(product.id)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        className={`add-order-button ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() =>
                          isSelected
                            ? increaseQuantity(product.id)
                            : addToOrder(product.id)
                        }
                      >
                        {isSelected
                          ? "Add More"
                          : minOrder > 1
                            ? `Add ${minOrder} to Order`
                            : "Add to Order"}
                      </button>
                    </div>

                    {isSelected &&
                      minOrder > 1 &&
                      isMinimumQuantity && (
                        <p className="minimum-note">
                          Minimum quantity reached
                        </p>
                      )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================= */}

        <section
          className="about-section"
          id="about"
        >
          <div className="glass-card about-card">
            <div className="about-text">
              <p className="eyebrow">OUR STORY</p>

              <h2>
                <span>Made</span>{" "}
                <span>with</span>{" "}
                <span>love.</span>
              </h2>

              <p>
                SIPS AND TALES is all about creating
                delicious drinks that bring people
                together. Our tigernut drinks are made
                to be enjoyed, shared and remembered.
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

        {/* =========================
            CTA
        ========================= */}

        <section className="cta-section">
          <p className="eyebrow">READY TO SIP?</p>

          <h2>
            <span>Choose.</span>{" "}
            <span>Order.</span>{" "}
            <span>Enjoy.</span>
          </h2>

          <button
            type="button"
            className="primary-button cta-order-button"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={17} />
            View Your Order
          </button>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer>
        <div>
          <strong>SIPS AND TALES</strong>

          <p>
            Delicious drinks. Better stories.
          </p>
        </div>

        <p>
          © {new Date().getFullYear()} SIPS AND TALES.
          All rights reserved.
        </p>
      </footer>

      {/* =========================
          FLOATING WHATSAPP
      ========================= */}

      <button
        type="button"
        className="floating-whatsapp"
        onClick={openGeneralWhatsApp}
        aria-label="Chat with SIPS AND TALES on WhatsApp"
      >
        <MessageCircle size={25} />

        <span className="whatsapp-tooltip">
          Chat with us
        </span>
      </button>

      {/* =========================
          CART
      ========================= */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setCartOpen(false);
            }
          }}
        >
          <aside className="cart-panel">
            <div className="cart-header">
              <div>
                <p className="cart-eyebrow">
                  YOUR ORDER
                </p>

                <h3>Your Cart</h3>
              </div>

              <button
                type="button"
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={19} />
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <ShoppingBag size={30} />
                </div>

                <h4>Your cart is empty</h4>

                <p>
                  Add your favourite SIPS AND TALES
                  drinks to start your order.
                </p>

                <button
                  type="button"
                  className="continue-shopping"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {selectedProducts.map((product) => {
                    const quantity = cart[product.id];
                    const minOrder =
                      product.minOrder || 1;

                    return (
                      <div
                        className="cart-item"
                        key={product.id}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div className="cart-item-details">
                          <h4>{product.name}</h4>

                          <span className="cart-item-price">
                            {formatPrice(product.price)} each
                          </span>

                          {minOrder > 1 && (
                            <small className="cart-item-moq">
                              Minimum: {minOrder}
                            </small>
                          )}

                          <div className="cart-quantity">
                            <button
                              type="button"
                              aria-label={`Decrease ${product.name} quantity`}
                              onClick={() =>
                                decreaseQuantity(
                                  product.id
                                )
                              }
                            >
                              <Minus size={12} />
                            </button>

                            <span>{quantity}</span>

                            <button
                              type="button"
                              aria-label={`Increase ${product.name} quantity`}
                              onClick={() =>
                                increaseQuantity(
                                  product.id
                                )
                              }
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        <span className="cart-item-subtotal">
                          {formatPrice(
                            product.price * quantity
                          )}
                        </span>

                        <button
                          type="button"
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(product.id)
                          }
                          aria-label={`Remove ${product.name}`}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Total items</span>
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
                  type="button"
                  className="whatsapp-checkout"
                  onClick={createWhatsAppOrder}
                >
                  <MessageCircle size={18} />
                  Place Order on WhatsApp
                </button>

                <p className="checkout-note">
                  Your order will be sent to SIPS AND
                  TALES on WhatsApp for confirmation.
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