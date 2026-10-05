import "./index.css";
import "./App.css";
import { useState } from "react";
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { products } from "./data/products";

const WHATSAPP_NUMBER = "2349017316232";

const formatPrice = (price) => {
  return `₦${price.toLocaleString("en-NG")}`;
};

function App() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const updateQuantity = (productId, change) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;

      const newQuantity = Math.max(
        0,
        currentQuantity + change
      );

      const updatedCart = { ...currentCart };

      if (newQuantity === 0) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = newQuantity;
      }

      return updatedCart;
    });
  };

  const getQuantity = (productId) => {
    return cart[productId] || 0;
  };

  const selectedProducts = products.filter(
    (product) => cart[product.id]
  );

  const totalItems = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const totalPrice = selectedProducts.reduce(
    (total, product) => {
      return (
        total +
        product.price * cart[product.id]
      );
    },
    0
  );

  const sendOrderToWhatsApp = () => {
    if (selectedProducts.length === 0) {
      setCartOpen(true);
      return;
    }

    const orderLines = selectedProducts
      .map((product) => {
        const quantity = cart[product.id];

        const subtotal =
          product.price * quantity;

        return `• ${product.name} × ${quantity} = ${formatPrice(
          subtotal
        )}`;
      })
      .join("\n");

    const message = `Hello SIPS AND TALES 👋

I would like to place an order:

${orderLines}

Total items: ${totalItems}
Total: ${formatPrice(totalPrice)}

Please confirm my order.

Thank you!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const openWhatsApp = () => {
    const message =
      "Hello SIPS AND TALES 👋 I would like to make an enquiry about your drinks.";

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="app">
      {/* NAVBAR */}
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
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              REFRESHMENT WITH A STORY
            </p>

            <h1>
              Every sip has
              <span> a story.</span>
            </h1>

            <p className="hero-text">
              Discover delicious, refreshing drinks
              crafted to make every moment a little
              more special.
            </p>

            <a
              href="#drinks"
              className="primary-button"
            >
              Explore Our Drinks
            </a>
          </div>

          <div className="hero-visual">
            <div className="color-orb orb-blue"></div>
            <div className="color-orb orb-green"></div>
            <div className="color-orb orb-orange"></div>

            <div className="hero-card glass-card">
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
                Made for
                <br />
                beautiful moments
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          className="products-section"
          id="drinks"
        >
          <div className="section-heading">
            <p className="eyebrow">
              OUR SIGNATURE SIPS
            </p>

            <h2>Find your favourite.</h2>

            <p>
              Choose your favourite drinks, select your
              quantity and send your order directly to
              WhatsApp.
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
                    <h3>{product.name}</h3>

                    <div className="product-price">
                      {formatPrice(product.price)}
                    </div>

                    <p>{product.description}</p>

                    <div className="product-order-row">
                      <div className="quantity-control">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name}`}
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              -1
                            )
                          }
                        >
                          <Minus size={15} />
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase ${product.name}`}
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              1
                            )
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className={`add-order-button ${
                          quantity > 0
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            quantity > 0 ? 0 : 1
                          )
                        }
                      >
                        {quantity > 0
                          ? "Added"
                          : "Add to Order"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="about-section"
          id="about"
        >
          <div className="about-card glass-card">
            <div className="about-text">
              <p className="eyebrow">
                THE SIPS AND TALES EXPERIENCE
              </p>

              <h2>
                Good drinks.
                <br />
                Good moments.
                <br />
                Good stories.
              </h2>

              <p>
                SIPS AND TALES brings refreshing
                flavours together with the simple joy
                of sharing a good drink and creating
                memorable moments.
              </p>
            </div>

            <div className="about-video">
              <video
                src="/images/lifestyle/about-drink-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <p className="eyebrow">
            READY FOR YOUR NEXT SIP?
          </p>

          <h2>
            Pick your flavour.
            <br />
            Start your story.
          </h2>

          <button
            type="button"
            className="primary-button cta-order-button"
            onClick={() => setCartOpen(true)}
          >
            Shop Our Drinks
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div>
          <strong>SIPS & TALES</strong>

          <p>
            Refreshing stories in every sip.
          </p>
        </div>

        <p>
          © {new Date().getFullYear()} SIPS AND TALES
        </p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <button
        type="button"
        className="floating-whatsapp"
        onClick={openWhatsApp}
        aria-label="Chat with SIPS AND TALES on WhatsApp"
      >
        <MessageCircle size={27} />

        <span className="whatsapp-tooltip">
          Chat with us
        </span>
      </button>

      {/* CART */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="cart-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="cart-header">
              <div>
                <p className="cart-eyebrow">
                  YOUR ORDER
                </p>

                <h3>Your Sips</h3>
              </div>

              <button
                type="button"
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close order"
              >
                <X size={22} />
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <ShoppingBag size={30} />
                </div>

                <h4>
                  Your order is empty
                </h4>

                <p>
                  Select your favourite drinks and
                  choose the quantity you want.
                </p>

                <button
                  type="button"
                  className="continue-shopping"
                  onClick={() => {
                    setCartOpen(false);

                    document
                      .getElementById("drinks")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  Choose Drinks
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {selectedProducts.map(
                    (product) => (
                      <div
                        className="cart-item"
                        key={product.id}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div className="cart-item-details">
                          <h4>
                            {product.name}
                          </h4>

                          <span className="cart-item-price">
                            {formatPrice(
                              product.price
                            )}
                          </span>

                          <div className="cart-quantity">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  -1
                                )
                              }
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              <Minus size={13} />
                            </button>

                            <span>
                              {cart[product.id]}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  1
                                )
                              }
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="cart-item-subtotal">
                          {formatPrice(
                            product.price *
                              cart[product.id]
                          )}
                        </div>

                        <button
                          type="button"
                          className="remove-item"
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              -cart[product.id]
                            )
                          }
                          aria-label={`Remove ${product.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Total items</span>

                    <strong>
                      {totalItems}
                    </strong>
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
                  onClick={
                    sendOrderToWhatsApp
                  }
                >
                  <MessageCircle size={20} />

                  Send Order on WhatsApp
                </button>

                <p className="checkout-note">
                  Your selected products, quantities
                  and prices will be sent to SIPS AND
                  TALES on WhatsApp.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;