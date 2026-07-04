"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Chống ồn chủ động ANC",
    description:
      "Loại bỏ đến 98% tiếng ồn từ văn phòng hay phố thị ồn ào. Trả lại cho bạn không gian yên tĩnh tuyệt đối để suy nghĩ sâu và làm việc hiệu quả hơn.",
    image: "/images/feature1.jpg",
    imageAlt: "Người dùng đeo tai nghe HeliCorp trong quán café",
    accent: "accent-cyan" as const,
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.143 17.082a24.248 24.248 0 005.714 0M12 3c-4.97 0-9 4.03-9 9a8.96 8.96 0 002.636 6.364M12 3c4.97 0 9 4.03 9 9a8.96 8.96 0 01-2.636 6.364M12 3v0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Âm thanh chuẩn Studio",
    description:
      "Màng loa 40mm tinh chỉnh chuyên sâu tái tạo chuẩn xác từng dải âm. Bạn sẽ nghe rõ từng nhịp thở của ca sĩ và chi tiết nhạc cụ trong bài hát yêu thích.",
    accent: "accent-orange" as const,
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
  },
  {
    title: "40 giờ nghe liên tục",
    description:
      "Đủ năng lượng cho cả tuần làm việc và những chuyến bay dài mà không bị gián đoạn. Công nghệ sạc siêu tốc giúp bạn có ngay 4 giờ nghe chỉ sau 10 phút cắm sạc.",
    image: "/images/feature2.jpg",
    imageAlt: "Người dùng đeo tai nghe HeliCorp trên tàu điện",
    accent: "accent-cyan" as const,
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "Thiết kế tối giản, êm ái",
    description:
      "Trọng lượng siêu nhẹ kết hợp cùng đệm tai bọc da protein cao cấp tựa như không đeo. Cho phép bạn tận hưởng âm nhạc suốt cả ngày dài mà không hề đau hay bí tai.",
    accent: "accent-orange" as const,
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-bg-primary"
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
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Features
          </span>
          <h2
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Tính năng nổi bật
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-muted">
            Được thiết kế với công nghệ tiên tiến nhất, mang đến trải nghiệm âm
            thanh hoàn hảo trong mọi hoàn cảnh.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`group relative overflow-hidden bg-bg-surface transition-transform duration-200 ease-out border-b border-border-subtle pb-4 ${
                idx === 0
                  ? "md:col-span-7"
                  : idx === 1
                    ? "md:col-span-5"
                    : idx === 2
                      ? "md:col-span-5"
                      : "md:col-span-7"
              }`}
              style={{ zIndex: 30 }}
            >
              {feature.image && (
                <div
                  className="relative h-56 w-full overflow-hidden md:h-72"
                  style={{ borderRadius: "12px" }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt || feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/10 to-transparent border-0" />
                </div>
              )}

              <div
                className={`p-4 md:p-6 ${feature.image ? "" : "pt-6 md:pt-8"}`}
              >
                <div
                  className={`mb-5 inline-flex items-center justify-center ${
                    feature.accent === "accent-cyan"
                      ? "text-accent-cyan"
                      : "text-accent-orange"
                  }`}
                  style={{
                    filter: `drop-shadow(0 0 10px var(--color-${feature.accent}))`,
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-3 font-heading text-xl font-bold text-text-primary md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
