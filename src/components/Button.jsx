export default function Button({ children, variant = "primary", className = "", as: Component = "button", ...props }) {
  const styles = variant === "outline" ? "border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black" : "bg-lime-300 text-black hover:bg-white";
  return <Component className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-black uppercase tracking-[0.12em] transition ${styles} ${className}`} {...props}>{children}</Component>;
}
