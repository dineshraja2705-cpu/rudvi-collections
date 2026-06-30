import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import Scene3D from "@/components/Scene3D";
import IntroOverlay from "@/components/IntroOverlay";
import Reveal from "@/components/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { collections } from "@/data/collections";
import { supabase } from "@/integrations/supabase/client";
import { type CartItem, useCart } from "@/lib/cart";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/WhatsApp Image 2026-06-27 at 1.36.07 PM.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rudvi Collection - Ethnic & Designer Wear" },
      {
        name: "description",
        content:
          "Rudvi Collection dress shop in Trichy for sarees, kurtis, coord sets, kids wear, ready made blouses, and easy WhatsApp ordering.",
      },
      { property: "og:title", content: "Rudvi Collection - Designer Wear" },
      {
        property: "og:description",
        content:
          "Browse styles, share your choice on WhatsApp, and place your order with Rudvi Collection.",
      },
    ],
  }),
  component: Home,
});

const inr = (n: number) => "\u20B9" + n.toLocaleString("en-IN");
const whatsappPhone = "919047813230";
const whatsappHref = (text: string) =>
  `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;

const generalWhatsAppHref = whatsappHref(
  "Hi Rudvi Collection, I want to place an order. Please share availability, sizes, and delivery details.",
);

const cartSummary = (items: CartItem[]) =>
  items.length
    ? items
        .map(
          (item, index) =>
            `${index + 1}. ${item.name}${item.size ? ` - Size ${item.size}` : ""} x ${item.qty} - ${inr(
              item.price * item.qty,
            )}`,
        )
        .join("\n")
    : "No cart items selected yet.";

function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const cart = useCart();

  const handleAddToCart = (item: CartItem) => {
    cart.addItem(item);
    toast.success(`${item.name} added to cart.`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <IntroOverlay />
      <Scene3D />
      <Toaster position="top-center" />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Rudvi Collection"
              className="h-11 w-11 rounded-full border border-primary/30 object-cover shadow-card"
              width={1280}
              height={1280}
            />
            <span className="hidden font-display text-xl tracking-wide-2 text-gradient-gold sm:inline">
              Rudvi
            </span>
          </a>
          <div className="hidden items-center gap-9 text-xs uppercase tracking-wide-2 text-muted-foreground md:flex">
            <a href="#collections" className="transition-colors hover:text-gold">
              Collections
            </a>
            <a href="#offers" className="transition-colors hover:text-gold">
              Offers
            </a>
            <a href="#order" className="transition-colors hover:text-gold">
              Order
            </a>
            <a href="#cart" className="transition-colors hover:text-gold">
              Cart
            </a>
            <a href="#contact" className="transition-colors hover:text-gold">
              Contact
            </a>
          </div>
          <a
            href={generalWhatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-4 py-2 text-xs uppercase tracking-wide-2 text-gold transition-colors hover:bg-primary hover:text-primary-foreground sm:px-5"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            {cart.count > 0 && <span className="text-gold sm:text-current">({cart.count})</span>}
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen items-center justify-center">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover opacity-40"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-background/55" />
        </motion.div>

        <motion.div
          style={{ y: heroY, scale: titleScale }}
          className="relative z-10 px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 1 }}
            className="mb-6 text-xs uppercase tracking-luxe text-gold"
          >
            Sarees &middot; Kurtis &middot; Designer Wear
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 1.2 }}
            className="font-display text-6xl leading-[1.05] sm:text-8xl lg:text-9xl"
          >
            <span className="text-gradient-gold">Rudvi</span>
            <br />
            Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7, duration: 1 }}
            className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            A Trichy dress shop for sarees, kurtis, coord sets, kids wear and ready made blouses.
            Browse your favorite look, message us on WhatsApp, and order with personal guidance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.9, duration: 1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#collections"
              className="rounded-sm bg-gold px-8 py-3.5 text-xs uppercase tracking-wide-2 text-primary-foreground shadow-luxe transition-transform hover:scale-105"
            >
              Explore Collection
            </a>
            <a
              href={generalWhatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-8 py-3.5 text-xs uppercase tracking-wide-2 text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-muted-foreground"
        >
          Scroll
        </motion.div>
      </section>

      {/* Marquee strip */}
      <div className="relative z-10 border-y border-border/50 bg-card/40 py-4 backdrop-blur">
        <div className="flex animate-[marquee_22s_linear_infinite] gap-12 whitespace-nowrap font-display text-lg text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-12">
              {[
                "Kurtis",
                "Coord Sets",
                "Korean Dresses",
                "Nighties",
                "Sarees",
                "Ready Made Blouse",
                "Kids Wear",
              ].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <Sparkles className="h-4 w-4 text-gold" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Collections */}
      <section id="collections" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-gold">The Collection</p>
          <h2 className="font-display text-4xl sm:text-5xl">Signature Pieces</h2>
          <div className="mx-auto mt-6 h-px w-24 gold-line" />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="overflow-hidden rounded-md border border-border/60 bg-card shadow-card"
              >
                <Link to="/product/$id" params={{ id: d.id }} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      width={768}
                      height={1024}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {d.offer && (
                      <span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-wide-2 text-primary-foreground">
                        {d.offer}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide-2 text-muted-foreground">
                        {d.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gold">
                        <Star className="h-3.5 w-3.5 fill-current" /> {d.rating.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-gold">{inr(d.price)}</span>
                        {d.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {inr(d.oldPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] uppercase tracking-wide-2 text-foreground transition-colors group-hover:text-gold">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="border-t border-border/60 px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart({
                        id: d.id,
                        name: d.name,
                        category: d.category,
                        price: d.price,
                        qty: 1,
                      })
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary/40 py-3 text-xs uppercase tracking-wide-2 text-gold transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add Cart
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="relative z-10 px-6 py-20">
        <Reveal className="mx-auto max-w-5xl">
          <div className="glass rounded-lg px-8 py-16 text-center shadow-luxe sm:px-16">
            <p className="mb-3 text-xs uppercase tracking-luxe text-gold">Festive Edit</p>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">
              Up to <span className="text-gradient-gold">30% Off</span> on Occasion Wear
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground">
              Celebrate with curated styles from Rudvi Collection. Message us to check available
              designs, sizes, colors and custom fitting support before you order.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { t: "Quick Selection", d: "Share screenshots" },
                { t: "Size Guidance", d: "Fit help on WhatsApp" },
                { t: "Pickup or Delivery", d: "Order updates shared" },
              ].map((o) => (
                <div key={o.t} className="rounded-md border border-border/60 p-6">
                  <p className="font-display text-xl text-gold">{o.t}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide-2 text-muted-foreground">
                    {o.d}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={generalWhatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-sm bg-gold px-9 py-3.5 text-xs uppercase tracking-wide-2 text-primary-foreground transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Claim on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* Order flow */}
      <section id="order" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-luxe text-gold">Order Flow</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Place Your Order Through WhatsApp
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Rudvi Collection keeps shopping simple and personal. Send us the design you like, and we
            will help with size, fabric details, price confirmation, payment and delivery.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-4">
          {[
            {
              Icon: ShoppingBag,
              title: "Choose Style",
              text: "Browse collections and share the product name or screenshot.",
            },
            {
              Icon: Ruler,
              title: "Confirm Fit",
              text: "Tell us your size, color preference and occasion needs.",
            },
            {
              Icon: CheckCircle2,
              title: "Place Order",
              text: "We confirm availability, final price and payment details.",
            },
            {
              Icon: Truck,
              title: "Pickup or Delivery",
              text: "Collect from Trichy or request delivery with order updates.",
            },
          ].map(({ Icon, title, text }) => (
            <Reveal key={title}>
              <div className="h-full rounded-md border border-border/60 bg-card/70 p-6 shadow-card">
                <Icon className="h-7 w-7 text-gold" />
                <h3 className="mt-5 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={generalWhatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-3.5 text-xs uppercase tracking-wide-2 text-primary-foreground shadow-luxe transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            Start WhatsApp Order
          </a>
          <p className="text-sm text-muted-foreground">
            Available for sarees, kurtis, coord sets, nighties, ready made blouses and kids wear.
          </p>
        </Reveal>
      </section>

      {/* Cart */}
      <section id="cart" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs uppercase tracking-luxe text-gold">Your Cart</p>
            <h2 className="font-display text-4xl sm:text-5xl">Order Summary</h2>
          </div>
          {cart.items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                cart.clearCart();
                toast.success("Cart cleared.");
              }}
              className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-4 py-2 text-xs uppercase tracking-wide-2 text-muted-foreground transition-colors hover:text-gold"
            >
              <Trash2 className="h-4 w-4" />
              Clear Cart
            </button>
          )}
        </Reveal>

        <Reveal>
          <div className="rounded-md border border-border/60 bg-card/70 p-6 shadow-card">
            {cart.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty. Add styles from the collection, then send the full summary to
                WhatsApp from the enquiry form.
              </p>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={`${item.id}-${item.size ?? "any"}`}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-display text-xl">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide-2 text-muted-foreground">
                        {item.category}
                        {item.size ? ` / Size ${item.size}` : " / Size to confirm"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          onClick={() => cart.updateQty(item.id, item.size, item.qty - 1)}
                          className="flex h-9 w-9 items-center justify-center transition-colors hover:text-gold"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => cart.updateQty(item.id, item.size, item.qty + 1)}
                          className="flex h-9 w-9 items-center justify-center transition-colors hover:text-gold"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <p className="min-w-20 text-right text-sm text-gold">
                        {inr(item.price * item.qty)}
                      </p>
                      <button
                        type="button"
                        onClick={() => cart.removeItem(item.id, item.size)}
                        className="text-muted-foreground transition-colors hover:text-gold"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs uppercase tracking-wide-2 text-muted-foreground">
                    Approx Total
                  </span>
                  <span className="font-display text-2xl text-gold">{inr(cart.total)}</span>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-luxe text-gold">Get In Touch</p>
            <h2 className="font-display text-4xl sm:text-5xl">Visit Our Dress Shop</h2>
            <div className="mt-4 h-px w-24 gold-line" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Visit Rudvi Collection in Trichy or message us for quick WhatsApp ordering. Our team
              helps you choose occasion-ready pieces with clear sizing and availability.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm">Rudvi Collection</p>
                  <p className="text-sm text-muted-foreground">Police Colony, Anna Nagar, Trichy</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-gold" />
                <a href="tel:+919047813230" className="text-sm transition-colors hover:text-gold">
                  +91 90478 13230
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle className="h-5 w-5 text-gold" />
                <a
                  href={generalWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition-colors hover:text-gold"
                >
                  Order on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-gold" />
                <a
                  href="mailto:ranjanr9417@gmail.com"
                  className="text-sm transition-colors hover:text-gold"
                >
                  ranjanr9417@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Instagram className="h-5 w-5 text-gold" />
                <a href="#" className="text-sm transition-colors hover:text-gold">
                  @rudvicollections
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <EnquiryForm
              cartItems={cart.items}
              cartTotal={cart.total}
              onClearCart={cart.clearCart}
            />
          </Reveal>
        </div>
      </section>

      {/* More collections */}
      <section className="relative z-10 px-6 py-20">
        <Reveal className="mx-auto max-w-5xl">
          <div className="rounded-lg border border-primary/20 bg-card/70 px-6 py-12 text-center shadow-luxe backdrop-blur sm:px-12 sm:py-14">
            <p className="mx-auto max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
              Looking for more collections? 💖 Contact us on WhatsApp to explore our latest designs
              and exclusive collections!
            </p>
            <a
              href="https://wa.me/919047813230?text=Hi%20Rudvi%20Collection%21%20Please%20show%20your%20latest%20collections."
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-[#25D366] px-7 py-3.5 text-xs font-medium uppercase tracking-wide-2 text-[#071b10] shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-[#32e678] hover:shadow-luxe"
            >
              Contact on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-10 text-center">
        <p className="font-display text-2xl text-gradient-gold">Rudvi Collection</p>
        <p className="mt-2 text-xs uppercase tracking-wide-2 text-muted-foreground">
          &copy; {new Date().getFullYear()} Rudvi Collection. Crafted with love.
        </p>
      </footer>
    </div>
  );
}

function EnquiryForm({
  cartItems,
  cartTotal,
  onClearCart,
}: {
  cartItems: CartItem[];
  cartTotal: number;
  onClearCart: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const summaryText = cartSummary(cartItems);
  const whatsappMessage = [
    "Hi Rudvi Collection, I want to place an order/enquiry.",
    "",
    `Name: ${name.trim() || "Not provided"}`,
    `Phone: ${phone.trim() || "Not provided"}`,
    "",
    "Cart Summary:",
    summaryText,
    cartItems.length ? `Approx Total: ${inr(cartTotal)}` : "",
    "",
    `Customer Note: ${message.trim() || "No extra note"}`,
  ]
    .filter(Boolean)
    .join("\n");
  const cartWhatsAppHref = whatsappHref(whatsappMessage);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      next.phone = "Please enter a valid phone number.";
    }
    if (cartItems.length === 0 && (!message.trim() || message.trim().length < 10)) {
      next.message = "Please add cart items or tell us a bit more about your request.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      phone: phone.trim(),
      message: whatsappMessage,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    toast.success("Enquiry sent! We'll get back to you soon.");
    setName("");
    setPhone("");
    setMessage("");
    setErrors({});
  };

  return (
    <form className="glass rounded-lg p-8 shadow-card" onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">
        <div className="rounded-md border border-border/60 bg-background/30 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-wide-2 text-muted-foreground">
              Cart Summary
            </p>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-[10px] uppercase tracking-wide-2 text-gold transition-colors hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          {cartItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No cart items added yet.</p>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size ?? "any"}`}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span>
                    {item.name}
                    {item.size ? ` / ${item.size}` : ""} x {item.qty}
                  </span>
                  <span className="shrink-0 text-gold">{inr(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-border/60 pt-3 text-sm">
                <span className="text-muted-foreground">Approx Total</span>
                <span className="text-gold">{inr(cartTotal)}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide-2 text-muted-foreground">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full rounded-sm border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide-2 text-muted-foreground">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={20}
            className="w-full rounded-sm border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
            placeholder="+91"
          />
          {errors.phone && <p className="mt-2 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-wide-2 text-muted-foreground">
            Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            className="w-full resize-none rounded-sm border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
            placeholder="Tell us about your order or occasion..."
          />
          {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-sm bg-gold py-3.5 text-xs uppercase tracking-wide-2 text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send Enquiry"}
        </button>
        <a
          href={cartWhatsAppHref}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-sm border border-primary/40 py-3 text-xs uppercase tracking-wide-2 text-gold transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          Continue on WhatsApp
        </a>
        <p className="text-center text-[11px] text-muted-foreground">
          For faster ordering, share a screenshot or product name on WhatsApp.
        </p>
      </div>
    </form>
  );
}
