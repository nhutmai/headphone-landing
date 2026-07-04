"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const specs = [
  { label: "Loại tai nghe", value: "Over-ear (Chụp tai không dây)" },
  {
    label: "Công nghệ chống ồn",
    value: "Hybrid ANC (Khả năng chống ồn lên đến -40dB)",
  },
  {
    label: "Thời lượng pin",
    value: "40 giờ (bật ANC) / 55 giờ (tắt ANC)",
  },
  {
    label: "Sạc nhanh",
    value: "Sạc 10 phút, nghe 4 giờ (Cổng USB-C)",
  },
  {
    label: "Kết nối",
    value: "Bluetooth 5.3 (Hỗ trợ kết nối kép 2 thiết bị cùng lúc)",
  },
  { label: "Trọng lượng", value: "250 gram" },
  {
    label: "Chất liệu",
    value: "Khung hợp kim nhôm nguyên khối & Da PU cao cấp",
  },
  { label: "Kháng nước và mồ hôi", value: "Chuẩn IPX4" },
];

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const },
  }),
};

export default function Specs() {
  return (
    <section
      id="specs"
      className="relative bg-bg-surface"
      style={{ padding: "96px 0" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-accent-orange">
            Specifications
          </span>
          <h2
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Thông số kỹ thuật
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Specs Table */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-border-subtle">
              {specs.map((spec, idx) => (
                <motion.div
                  key={spec.label}
                  custom={idx}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                    idx < specs.length - 1 ? "border-b border-border-subtle" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-text-muted">
                    {spec.label}
                  </span>
                  <span className="text-sm font-semibold text-text-primary sm:text-right">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detail Images */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <motion.div
              className="relative h-64 w-full overflow-hidden rounded-xl border border-border-subtle md:h-72"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/detail1.jpg"
                alt="Chi tiết ear cup tai nghe HeliCorp"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="relative h-64 w-full overflow-hidden rounded-xl border border-border-subtle md:h-72"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Image
                src="/images/detail2.jpg"
                alt="Thiết kế tai nghe HeliCorp"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
