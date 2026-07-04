"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg-primary"
      style={{ paddingTop: "80px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 65% 35%, rgba(0, 240, 255, 0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 25%, rgba(255, 94, 58, 0.03) 0%, transparent 60%)",
        }}
      />

      <div
        className="absolute"
        style={{
          zIndex: 10,
          top: "-15%",
          right: "-5%",
          width: "60vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(0, 240, 255, 0.12) 0%, rgba(0, 240, 255, 0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* ============================================
          Main content wrapper
          ============================================ */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1280px] flex-col px-6 md:px-10">
        {/* ============================================
            Top row
            ============================================ */}
        <div className="flex flex-1 flex-col justify-center pb-40 pt-12 md:pb-48 md:pt-16">
          <div className="flex w-full flex-col-reverse items-center gap-6 md:flex-row md:items-start md:gap-0">
            {/* ---- Left column: Text (z-20) ---- */}
            <motion.div
              className="relative flex-1 md:max-w-[55%]"
              style={{ zIndex: 20 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              {/* Fix #2: Slide counter "01 / 04" thay pill badge */}
              <div className="mb-6 flex items-baseline gap-1 font-mono text-sm tracking-wider">
                <span className="text-2xl font-bold text-accent-cyan">01</span>
                <span className="text-text-muted">/04</span>
              </div>

              <h1
                className="font-heading font-extrabold leading-[1.08] tracking-tight text-text-primary"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Thế giới tĩnh lặng. <br className="hidden md:block" />
                <span className="text-accent-cyan">Âm thanh nguyên bản.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-text-muted md:text-lg md:leading-8">
                Công nghệ chống ồn chủ động ANC thế hệ mới giúp bạn cô lập mọi
                tạp âm, mang lại sự tập trung tuyệt đối cho công việc và trải
                nghiệm âm nhạc ở bất kỳ đâu.
              </p>
            </motion.div>
            <motion.div
              className="relative flex-1 md:absolute md:right-[-4%] md:top-[5%]"
              style={{ zIndex: 20 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: "easeOut" as const,
              }}
            >
              {/* Studio lighting accent — glow bất đối xứng từ góc trên-phải */}
              <div
                className="glow-breathe absolute"
                style={{
                  top: "-10%",
                  right: "5%",
                  width: "50%",
                  height: "45%",
                  background:
                    "radial-gradient(ellipse at 80% 20%, rgba(0, 240, 255, 0.35) 0%, rgba(0, 240, 255, 0.08) 50%, transparent 80%)",
                  filter: "blur(30px)",
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />

              <div
                className="relative mx-auto h-[300px] w-[320px] md:h-[520px] md:w-[540px]"
                style={{
                  /* Crop nhẹ — ảnh tràn ra bên phải */
                  clipPath: "inset(0 -8% 0 0)",
                }}
              >
                <Image
                  src="/images/hero2.jpg"
                  alt="HeliCorp ANC Headphone — tai nghe chống ồn chủ động"
                  fill
                  sizes="(max-width: 768px) 320px, 540px"
                  className="object-cover object-center"
                  style={{ borderRadius: "16px 4px 4px 16px" }}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-10"
          style={{ zIndex: 30 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" as const }}
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between md:pb-10">
            <div
              className="flex items-center gap-5 bg-card-cta px-6 py-5 shadow-2xl md:px-8 md:py-6"
              style={{ borderRadius: "12px" }}
            >
              <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:block">
                <Image
                  src="/images/hero1.jpg"
                  alt="HeliCorp headphone"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-bg-primary md:text-base">
                  Trải nghiệm ngay
                </p>
                <p className="mt-0.5 text-xs text-bg-primary/60">
                  Ưu đãi giảm 15% cho đơn hàng đầu tiên
                </p>
              </div>
              <a
                href="#newsletter"
                className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-primary text-card-cta transition-colors duration-200 hover:bg-accent-cyan hover:text-black"
                aria-label="Trải nghiệm ngay"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
            <div
              className="border border-border-subtle px-6 py-5 md:px-8 md:py-6"
              style={{
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-6 md:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-accent-cyan font-heading md:text-2xl">
                    98%
                  </span>
                  <span className="text-[11px] leading-tight text-text-muted">
                    Khử tiếng
                    <br />
                    ồn
                  </span>
                </div>
                <div className="h-8 w-px bg-border-subtle" />
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-accent-orange font-heading md:text-2xl">
                    40h
                  </span>
                  <span className="text-[11px] leading-tight text-text-muted">
                    Pin liên
                    <br />
                    tục
                  </span>
                </div>
                <div className="h-8 w-px bg-border-subtle" />
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-text-primary font-heading md:text-2xl">
                    250g
                  </span>
                  <span className="text-[11px] leading-tight text-text-muted">
                    Siêu
                    <br />
                    nhẹ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
