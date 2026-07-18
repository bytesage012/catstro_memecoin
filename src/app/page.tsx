// app/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Copy,
  Check,
  Menu,
  X,
  TrendingUp,
  Twitter,
  BarChart2,
  Instagram,
} from "lucide-react";

const CONTRACT_ADDRESS = "0x31C0445253C74236FE34eC73d78B122DeAEB9A7b";
const TRUNCATED_ADDRESS = "0x31C0445253C7...9A7b";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navCopied, setNavCopied] = useState(false);
  const [communityCopied, setCommunityCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const revealObserverRef = useRef<IntersectionObserver | null>(null);
  const counterObserverRef = useRef<IntersectionObserver | null>(null);
  const animatedCounters = useRef<Set<Element>>(new Set());
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nav scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToastMessage(null), 2000);
    }
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, [toastMessage]);

  // Copy reset timers
  useEffect(() => {
    if (navCopied) {
      const t = setTimeout(() => setNavCopied(false), 2200);
      return () => clearTimeout(t);
    }
  }, [navCopied]);

  useEffect(() => {
    if (communityCopied) {
      const t = setTimeout(() => setCommunityCopied(false), 2200);
      return () => clearTimeout(t);
    }
  }, [communityCopied]);

  // Copy helper
  const copyToClipboard = async (which: "nav" | "community") => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = CONTRACT_ADDRESS;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    if (which === "nav") setNavCopied(true);
    else setCommunityCopied(true);
    setToastMessage("Contract address copied");
  };

  // Intersection Observer for scroll reveal
  useEffect(() => {
    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserverRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => revealObserverRef.current?.observe(el));
    return () => revealObserverRef.current?.disconnect();
  }, []);

  // Intersection Observer for animated counters
  const animateCounter = useCallback((el: Element) => {
    const target = parseFloat(el.getAttribute("data-count") || "0");
    const prefix = el.getAttribute("data-prefix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = 1400;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      if (decimals === 0) {
        el.textContent = prefix + Math.round(current).toLocaleString("en-US");
      } else if (decimals >= 6) {
        el.textContent = prefix + current.toFixed(decimals);
      } else {
        el.textContent =
          prefix +
          current.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });
      }
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (decimals === 0) {
          el.textContent =
            prefix + Math.round(target).toLocaleString("en-US");
        } else if (decimals >= 6) {
          el.textContent = prefix + target.toFixed(decimals);
        } else {
          el.textContent =
            prefix +
            target.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
        }
      }
    }
    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    counterObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !animatedCounters.current.has(entry.target)
          ) {
            animatedCounters.current.add(entry.target);
            animateCounter(entry.target);
            counterObserverRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -30px 0px", threshold: 0.15 }
    );
    const statElements = document.querySelectorAll(".stat-value[data-count]");
    statElements.forEach((el) => counterObserverRef.current?.observe(el));
    return () => counterObserverRef.current?.disconnect();
  }, [animateCounter]);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Nav */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="Fidel Catstro Home">
            <img
              src="https://cdn.dexscreener.com/cms/images/zV0ivl_H5GY7Xgna?width=64&height=64&quality=95&format=auto"
              alt="CATSTRO logo"
              width={32}
              height={32}
            />
            <span>CATSTRO</span>
          </a>
          <div className="nav-links">
            <a href="#lore" onClick={closeMobileMenu}>Lore</a>
            <a href="#tokenomics" onClick={closeMobileMenu}>Tokenomics</a>
            <a href="#how-to-buy" onClick={closeMobileMenu}>How to Buy</a>
            <a href="#roadmap" onClick={closeMobileMenu}>Roadmap</a>
            <a href="#community" onClick={closeMobileMenu}>Community</a>
          </div>
          <div className="nav-actions">
            <button
              className={`contract-pill ${navCopied ? "copied" : ""}`}
              title="Copy contract address"
              onClick={() => copyToClipboard("nav")}
            >
              <span className="address-truncated">{TRUNCATED_ADDRESS}</span>
              {navCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <a
              href="https://dexscreener.com/robinhood/0x3d596000ee1fa72c40a85b85978235e20b20bc1b"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Buy $CATSTRO
            </a>
            <button
              className="nav-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#lore" onClick={closeMobileMenu}>Lore</a>
          <a href="#tokenomics" onClick={closeMobileMenu}>Tokenomics</a>
          <a href="#how-to-buy" onClick={closeMobileMenu}>How to Buy</a>
          <a href="#roadmap" onClick={closeMobileMenu}>Roadmap</a>
          <a href="#community" onClick={closeMobileMenu}>Community</a>
        </div>
      </nav>

      {/* Toast */}
      {toastMessage && <div className="toast show">{toastMessage}</div>}

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content reveal">
              <div className="hero-badge reveal reveal-delay-1">
                <span className="dot" /> Strongly Bullish — +681% 24h
              </div>
              <h1 className="hero-title reveal reveal-delay-2">
                Fidel <span className="accent-word">Catstro</span>
              </h1>
              <p className="hero-subtitle reveal reveal-delay-3">
                Baiju Bhatt&apos;s legendary feline. Chief Cat on Robinhood
                since 2011. The most based cat in crypto just got its own token.
              </p>
              <div className="hero-ctas reveal reveal-delay-4">
                <a
                  href="https://dexscreener.com/robinhood/0x3d596000ee1fa72c40a85b85978235e20b20bc1b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <TrendingUp size={18} /> Buy on Uniswap
                </a>
                <a
                  href="https://x.com/sonikcrypto/status/2078520640248615000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Twitter size={18} /> Follow on X
                </a>
              </div>
            </div>
            <div className="hero-visual reveal reveal-delay-3">
              <div className="hero-image-wrap">
                <img
                  src="https://cdn.dexscreener.com/cms/images/zV0ivl_H5GY7Xgna?width=800&height=800&quality=95&format=auto"
                  alt="Fidel Catstro"
                  width={340}
                  height={340}
                />
                <div className="hero-image-glow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item"><span className="ticker-label">Price</span> <span className="ticker-value">$0.00002126</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">24h Change</span> <span className="ticker-positive">+681%</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">24h Volume</span> <span className="ticker-value">$282,670</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Market Cap</span> <span className="ticker-value">$21,269</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Liquidity</span> <span className="ticker-value">$12,240</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Buys 24h</span> <span className="ticker-value">2,440</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Sells 24h</span> <span className="ticker-value">1,903</span></span>
          <span className="ticker-separator" />
          {/* Duplicate for seamless loop */}
          <span className="ticker-item"><span className="ticker-label">Price</span> <span className="ticker-value">$0.00002126</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">24h Change</span> <span className="ticker-positive">+681%</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">24h Volume</span> <span className="ticker-value">$282,670</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Market Cap</span> <span className="ticker-value">$21,269</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Liquidity</span> <span className="ticker-value">$12,240</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Buys 24h</span> <span className="ticker-value">2,440</span></span>
          <span className="ticker-separator" />
          <span className="ticker-item"><span className="ticker-label">Sells 24h</span> <span className="ticker-value">1,903</span></span>
          <span className="ticker-separator" />
        </div>
      </div>

      {/* Lore */}
      <section className="section-padding" id="lore">
        <div className="container">
          <span className="section-label reveal">The Origin Story</span>
          <h2 className="section-heading reveal reveal-delay-1">
            Chief Cat on Robinhood
          </h2>
          <div className="lore-grid">
            <div className="lore-text reveal reveal-delay-2">
              <p className="lore-paragraph">
                Meet <strong>Fidel Catstro</strong>, the cat of Baiju Bhatt —
                co-founder of Robinhood. This isn&apos;t just any cat. Since
                2011, Fidel Catstro has held the official title of
                <strong>&quot;Chief Cat&quot; on Robinhood</strong>, a position
                listed on the cat&apos;s own Facebook profile for over 15 years.
                The ultimate insider.
              </p>
              <blockquote className="lore-pullquote">
                &quot;Baiju Bhatt&apos;s cat is literally the Chief Cat on
                Robinhood. The evidence is undeniable.&quot;
              </blockquote>
              <p className="lore-paragraph">
                While the world debated memecoins, one truth sat quietly in
                plain sight: the most powerful cat in fintech never had a token.
                Until now. $CATSTRO is the people&apos;s recognition of the one
                true Chief Cat.
              </p>
            </div>
            <div className="lore-proofs reveal reveal-delay-3">
              <div className="proof-card">
                <span className="proof-number">01</span>
                <div className="proof-content">
                  <strong>Baiju follows Fidel Catstro on Instagram</strong> —{" "}
                  <a
                    href="https://instagram.com/msfidelcatstro/"
                    target="_blank"
                    rel="noopener"
                  >
                    @msfidelcatstro
                  </a>{" "}
                  is the cat&apos;s verified Instagram presence, followed
                  personally by the Robinhood co-founder.
                </div>
              </div>
              <div className="proof-card">
                <span className="proof-number">02</span>
                <div className="proof-content">
                  <strong>Facebook profile since 2012</strong> — In February
                  2014, Baiju posted a photo with the cat on{" "}
                  <a
                    href="https://facebook.com/share/1BgwgwM1QZ/"
                    target="_blank"
                    rel="noopener"
                  >
                    Facebook
                  </a>
                  , confirming the connection.
                </div>
              </div>
              <div className="proof-card">
                <span className="proof-number">03</span>
                <div className="proof-content">
                  <strong>Same day, Robinhood HQ</strong> — Wayback Machine
                  archives from{" "}
                  <a
                    href="https://web.archive.org/web/20150907175043/https://www.robinhood.com/company/"
                    target="_blank"
                    rel="noopener"
                  >
                    robinhood.com/company
                  </a>{" "}
                  show Baiju in the same outfit from the cat photo — same day,
                  same place.
                </div>
              </div>
              <div className="proof-card">
                <span className="proof-number">04</span>
                <div className="proof-content">
                  <strong>&quot;Chief Cat&quot; since 2011</strong> — On the
                  cat&apos;s Facebook profile, under &quot;Work,&quot; it lists{" "}
                  <strong>Chief Cat at Robinhood</strong> with a start date of
                  2011. Fifteen years of feline executive leadership.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section
        className="section-padding"
        id="tokenomics"
        style={{ background: "var(--surface)" }}
      >
        <div className="container">
          <span className="section-label reveal">Tokenomics</span>
          <h2 className="section-heading reveal reveal-delay-1">
            Real Numbers, Real Cat
          </h2>
          <div className="tokenomics-grid">
            <div className="stat-card reveal reveal-delay-1">
              <span className="stat-label">Price</span>
              <span
                className="stat-value accent"
                data-count="0.00002126"
                data-prefix="$"
                data-decimals="8"
              >
                $0.00002126
              </span>
              <span className="stat-change positive">+681% 24h</span>
            </div>
            <div className="stat-card reveal reveal-delay-2">
              <span className="stat-label">Market Cap</span>
              <span
                className="stat-value"
                data-count="21269"
                data-prefix="$"
                data-decimals="0"
              >
                $21,269
              </span>
              <span className="stat-sub">Fully diluted</span>
            </div>
            <div className="stat-card reveal reveal-delay-3">
              <span className="stat-label">24h Volume</span>
              <span
                className="stat-value"
                data-count="282670"
                data-prefix="$"
                data-decimals="0"
              >
                $282,670
              </span>
              <span className="stat-sub">Vol/Liq ratio: 23.1x</span>
            </div>
            <div className="stat-card reveal reveal-delay-4">
              <span className="stat-label">Liquidity</span>
              <span
                className="stat-value"
                data-count="12240"
                data-prefix="$"
                data-decimals="0"
              >
                $12,240
              </span>
              <span className="stat-sub">Uniswap · 1 pair</span>
            </div>
            <div className="stat-card reveal reveal-delay-1">
              <span className="stat-label">24h Transactions</span>
              <span
                className="stat-value"
                data-count="4343"
                data-prefix=""
                data-decimals="0"
              >
                4,343
              </span>
              <span className="stat-sub">2,440 buys · 1,903 sells</span>
            </div>
            <div className="stat-card reveal reveal-delay-2">
              <span className="stat-label">Buy / Sell Ratio</span>
              <span className="stat-value">1.28</span>
              <span className="stat-sub">Bullish sentiment</span>
              <div className="stat-bar-wrap">
                <div className="stat-bar-label-row">
                  <span>Buys 56%</span>
                  <span>Sells 44%</span>
                </div>
                <div className="stat-bar">
                  <span className="stat-bar-fill buys" style={{ width: "56%" }} />
                  <span className="stat-bar-fill sells" style={{ width: "44%" }} />
                </div>
              </div>
            </div>
            <div className="stat-card reveal reveal-delay-3">
              <span className="stat-label">Market Activity</span>
              <span className="stat-value accent">Very High</span>
              <span className="stat-sub">Strongly bullish trend</span>
            </div>
            <div className="stat-card reveal reveal-delay-4">
              <span className="stat-label">Age</span>
              <span className="stat-value">Brand New</span>
              <span className="stat-sub">Fresh launch · high momentum</span>
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section className="section-padding" id="how-to-buy">
        <div className="container">
          <span className="section-label reveal">Get Started</span>
          <h2 className="section-heading reveal reveal-delay-1">
            How to Buy $CATSTRO
          </h2>
          <div className="steps-container reveal reveal-delay-2">
            {[
              {
                step: 1,
                title: "Create a Wallet",
                desc: "Download MetaMask, Rabby, or any Ethereum-compatible wallet. Set it up and secure your seed phrase.",
              },
              {
                step: 2,
                title: "Fund with ETH",
                desc: "Add ETH to your wallet on the Robinhood chain. Bridge from Ethereum mainnet if needed, or buy directly.",
              },
              {
                step: 3,
                title: "Swap on Uniswap",
                desc: "Go to Uniswap, connect your wallet, and swap ETH for $CATSTRO using the official contract address below.",
              },
              {
                step: 4,
                title: "Hold & Join the Community",
                desc: "You're now part of the Chief Cat's inner circle. Hold strong, spread the word, and join the community.",
              },
            ].map(({ step, title, desc }, i, arr) => (
              <div className="step-item" key={step}>
                {i < arr.length - 1 && <div className="step-connector" />}
                <div className="step-number">{step}</div>
                <div className="step-info">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section
        className="section-padding"
        id="roadmap"
        style={{ background: "var(--surface)" }}
      >
        <div className="container">
          <span className="section-label reveal">Roadmap</span>
          <h2 className="section-heading reveal reveal-delay-1">
            The Path Ahead
          </h2>
          <div className="roadmap-timeline reveal reveal-delay-2">
            <div className="roadmap-rail" />
            <div className="roadmap-item completed">
              <div className="roadmap-dot" />
              <div className="roadmap-content">
                <span className="roadmap-phase">Phase 1 — Completed</span>
                <h4>Stealth Launch</h4>
                <p>Token deployed on Robinhood chain. Uniswap liquidity pool created with $12,240 initial liquidity. The Chief Cat awakens.</p>
              </div>
            </div>
            <div className="roadmap-item active">
              <div className="roadmap-dot" />
              <div className="roadmap-content">
                <span className="roadmap-phase">Phase 2 — In Progress</span>
                <h4>Community Takeover</h4>
                <p>Organic growth through social proof. The undeniable lore of Baiju Bhatt's cat spreads across X and beyond. Meme magic activates.</p>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-dot" />
              <div className="roadmap-content">
                <span className="roadmap-phase">Phase 3 — Upcoming</span>
                <h4>DEX Expansion & Listings</h4>
                <p>Additional DEX integrations, DexScreener profile verification, and community-driven marketing campaigns to expand reach.</p>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-dot" />
              <div className="roadmap-content">
                <span className="roadmap-phase">Phase 4 — On the Horizon</span>
                <h4>CEX Recognition</h4>
                <p>As volume and community grow, pursue centralized exchange listings. The Chief Cat belongs on the global stage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="section-padding" id="community">
        <div className="container">
          <div className="community-inner">
            <span className="section-label reveal">Join the Clowder</span>
            <h2
              className="section-heading reveal reveal-delay-1"
              style={{ textAlign: "center" }}
            >
              Community
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                color: "var(--text-secondary)",
                maxWidth: 480,
                textAlign: "center",
                fontSize: 16,
                letterSpacing: "-0.005em",
                lineHeight: 1.6,
              }}
            >
              The Chief Cat&apos;s inner circle is growing. Connect, share, and
              help spread the most based cat narrative in crypto.
            </p>
            <div className="community-links reveal reveal-delay-3">
              <a
                href="https://x.com/sonikcrypto/status/2078520640248615000"
                target="_blank"
                rel="noopener noreferrer"
                className="community-link"
              >
                <Twitter size={18} /> X / Twitter
              </a>
              <a
                href="https://dexscreener.com/robinhood/0x3d596000ee1fa72c40a85b85978235e20b20bc1b"
                target="_blank"
                rel="noopener noreferrer"
                className="community-link"
              >
                <BarChart2 size={18} /> DexScreener
              </a>
              <a
                href="https://instagram.com/msfidelcatstro/"
                target="_blank"
                rel="noopener noreferrer"
                className="community-link"
              >
                <Instagram size={18} /> @msfidelcatstro
              </a>
            </div>
            <div className="community-contract reveal reveal-delay-4">
              <span className="community-contract-label">
                Contract Address
              </span>
              <button
                className={`community-contract-pill ${communityCopied ? "copied" : ""}`}
                onClick={() => copyToClipboard("community")}
              >
                {CONTRACT_ADDRESS}
                {communityCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <img
              src="https://cdn.dexscreener.com/cms/images/zV0ivl_H5GY7Xgna?width=64&height=64&quality=95&format=auto"
              alt="CATSTRO"
              width={28}
              height={28}
            />
            Fidel Catstro
          </div>
          <div className="footer-center">
            $CATSTRO is a memecoin created for entertainment purposes only.
            <br />
            This is not financial advice. Always do your own research.
          </div>
          <div className="footer-right">
            &copy; 2026 Chief Cat Industries
            <br />
            Robinhood is a trademark of Robinhood Markets, Inc.
          </div>
        </div>
      </footer>
    </>
  );
}
