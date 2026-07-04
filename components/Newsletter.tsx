"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");

    // TODO: call to backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setState("success");
      setEmail("");
    } else {
      setState("error");
    }

    // Reset after 4 seconds
    setTimeout(() => setState("idle"), 4000);
  };

  return (
    <section
      id="newsletter"
      className="relative bg-bg-primary"
      style={{ padding: "96px 0" }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), rgba(255,94,58,0.3), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Newsletter
          </span>
          <h2
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Nhận ưu đãi độc quyền
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-text-muted">
            Đăng ký để nhận ưu đãi độc quyền giảm 15% cho đơn hàng đầu tiên và
            cập nhật sớm nhất các tính năng phần mềm mới.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn..."
                disabled={state === "loading"}
                className="w-full border border-border-subtle bg-bg-surface px-5 py-3.5 text-sm text-text-primary placeholder:text-text-muted/60 transition-colors duration-200 focus:border-accent-cyan focus:outline-none disabled:opacity-50 sm:rounded-l-lg sm:rounded-r-none rounded-lg"
                style={{ borderRadius: undefined }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="relative inline-flex items-center justify-center bg-card-cta font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-cyan hover:text-black disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-l-none sm:rounded-r-lg rounded-lg"
              style={{ borderRadius: undefined, padding: "14px 28px" }}
            >
              {state === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Đang gửi...
                </span>
              ) : (
                "Đăng ký ngay"
              )}
            </button>
          </form>

          {/* State Messages */}
          <AnimatePresence mode="wait">
            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-accent-cyan"
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Đăng ký thành công! Kiểm tra email để nhận ưu đãi.
              </motion.div>
            )}
            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-accent-orange"
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Địa chỉ email không hợp lệ. Vui lòng thử lại.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust badges */}
          <p className="mt-8 text-xs text-text-muted/50">
            Bảo mật thông tin • Không spam • Hủy đăng ký bất cứ lúc nào
          </p>
        </motion.div>
      </div>
    </section>
  );
}
