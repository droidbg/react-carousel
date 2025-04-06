import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Blobs, { ShapeOption } from "./Blobs";
import { useMemo } from "react";

const Card = (props: {
  title: string;
  category: string;
  gradient: any;
  description: string;
  shape: string;
}) => {
  const { title, category, gradient, description, shape } = props;
  const randomSeed = useMemo(() => Math.random(), []);
  return (
    <motion.div
      whileTap={{ scale: 0.9, rotate: 10 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "10px 8px 10px rgba(0, 0, 0, 0.6)",
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative h-[180px] w-[350px] cursor-pointer overflow-hidden rounded-2xl p-5 shadow-lg`}
      style={{
        background: gradient,
      }}
    >
      {/* Background Blobs */}

      <Blobs seed={randomSeed} shape={shape as ShapeOption} />
      {/* Category Tag */}
      <span className="rounded-lg bg-black/20 px-3 py-1 text-xs font-semibold text-white">
        {category}
      </span>

      {/* Title */}
      <h2 className="mt-3 text-xl font-bold text-white">{title}</h2>

      {/* Progress Bar */}
      <div className="mt-4 h-1 w-full rounded-full bg-white/30">
        <div className="h-full w-9/10 rounded-full bg-white"></div>
      </div>
      <h2 className="mt-3 text-black font-bold text-sm">{description}</h2>
      {/* Arrow Button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        className="absolute top-4 right-4 cursor-pointer rounded-full bg-white/30 p-2"
      >
        <ArrowUpRight size={18} className="text-white" />
      </motion.button>
    </motion.div>
  );
};

export default Card;
