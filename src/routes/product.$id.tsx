import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Minus,
  Plus,
  Scissors,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import Scene3D from "@/components/Scene3D";
import { Toaster } from "@/components/ui/sonner";
import { collections, getDress } from "@/data/collections";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const dress = getDress(params.id);
    return {
      meta: [
        { title: dress ? `${dress.name} - Rudvi Collection` : "Rudvi Collection" },
        {
          name: "description",
          content: dress?.description ?? "Discover designer wear at Rudvi Collection.",
        },
        { property: "og:title", content: dress?.name ?? "Rudvi Collection" },
        { property: "og:description", content: dress?.description ?? "" },
        ...(dress ? [{ property: "og:image", content: dress.image }] : []),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Piece not found</h1>
        <Link to="/" className="mt-4 inline-block text-gold hover:underline">
          Back to collections
        </Link>
      </div>
    </div>
  ),
});

const inr = (n: number) => "\u20B9" + n.toLocaleString("en-IN");

function ProductPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const dress = getDress(id);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const cart = useCart();

  if (!dress) return null;

  const related = collections.filter((d) => d.id !== dress.id).slice(0, 3);
  const whatsappHref =
    "https://wa.me/919047813230?text=" +
    encodeURIComponent(
      `Hi Rudvi Collection, I want to order ${dress.name}. Size: ${
        size ?? "please guide me"
      }, Qty: ${qty}. Please confirm availability and delivery details.`,
    );

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size first.");
      return;
    }
    cart.addItem({
      id: dress.id,
      name: dress.name,
      category: dress.category,
      price: dress.price,
      qty,
      size,
    });
    toast.success(`${dress.name} (Size ${size}, Qty ${qty}) added to cart.`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Scene3D />
      <Toaster position="top-center" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="font-display text-xl tracking-wide-2 text-gradient-gold">
          Rudvi
        </Link>
        <button
          onClick={() => router.history.back()}
          className="flex items-center gap-2 text-xs uppercase tracking-wide-2 text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-4">
        <nav className="mb-8 text-xs uppercase tracking-wide-2 text-muted-foreground">
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/" hash="collections" className="hover:text-gold">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{dress.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-4 sm:flex-col">
              {dress.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-[3/4] w-20 overflow-hidden rounded-sm border transition-colors ${
                    activeImg === i ? "border-gold" : "border-border/60 hover:border-gold/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${dress.name} view ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-md border border-border/60 bg-card shadow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={dress.images[activeImg]}
                  alt={dress.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="aspect-[3/4] w-full object-cover"
                  width={768}
                  height={1024}
                />
              </AnimatePresence>
              {dress.offer && (
                <span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-wide-2 text-primary-foreground">
                  {dress.offer}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            <p className="text-xs uppercase tracking-luxe text-gold">{dress.category}</p>
            <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{dress.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(dress.rating) ? "fill-current" : "opacity-30"
                    }`}
                  />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">
                {dress.rating.toFixed(1)} &middot; {dress.reviews} reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl text-gold">{inr(dress.price)}</span>
              {dress.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {inr(dress.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {dress.description}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide-2 text-muted-foreground">
              Fabric: <span className="text-foreground">{dress.fabric}</span>
            </p>

            {/* Size */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide-2 text-foreground">
                  Select Size
                </span>
                <span className="text-[11px] uppercase tracking-wide-2 text-muted-foreground">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {dress.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex h-11 w-11 items-center justify-center rounded-sm border text-sm transition-colors ${
                      size === s
                        ? "border-gold bg-gold text-primary-foreground"
                        : "border-border text-foreground hover:border-gold"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <span className="mb-3 block text-xs uppercase tracking-wide-2 text-foreground">
                Quantity
              </span>
              <div className="inline-flex items-center rounded-sm border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-gold disabled:opacity-30"
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-gold disabled:opacity-30"
                  disabled={qty >= 10}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 text-xs uppercase tracking-wide-2 text-primary-foreground shadow-luxe transition-transform hover:scale-[1.02]"
              >
                <ShoppingCart className="h-4 w-4" />
                Add Cart
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-primary/40 px-8 py-4 text-center text-xs uppercase tracking-wide-2 text-gold transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Order
              </a>
              <Link
                to="/"
                hash="order"
                className="rounded-sm border border-primary/40 px-8 py-4 text-center text-xs uppercase tracking-wide-2 text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Order Flow
              </Link>
            </div>

            {/* Perks */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
              {[
                { icon: Scissors, t: "Custom Fitting" },
                { icon: Truck, t: "Pickup or Delivery" },
                { icon: ShieldCheck, t: "Quality Checked" },
              ].map((p) => (
                <div key={p.t} className="text-center">
                  <p.icon className="mx-auto h-5 w-5 text-gold" />
                  <p className="mt-2 text-[10px] uppercase tracking-wide-2 text-muted-foreground">
                    {p.t}
                  </p>
                </div>
              ))}
            </div>

            {/* Details */}
            <ul className="mt-8 space-y-3">
              {dress.details.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related */}
        <section className="mt-28">
          <h2 className="mb-10 text-center font-display text-3xl sm:text-4xl">You May Also Love</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {related.map((d) => (
              <Link
                key={d.id}
                to="/product/$id"
                params={{ id: d.id }}
                className="group overflow-hidden rounded-md border border-border/60 bg-card shadow-card"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{d.name}</h3>
                  <p className="mt-2 text-gold">{inr(d.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
