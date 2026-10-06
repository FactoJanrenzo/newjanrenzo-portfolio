const connectorVariants = {
  process: { viewBox: "0 0 1 100", preserveAspectRatio: "none" },
};

export default function ConnectorLinework({ variant, className = "" }) {
  const config = connectorVariants[variant];
  if (!config) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`connector-linework connector-linework--${variant} ${className}`.trim()}
      viewBox={config.viewBox}
      preserveAspectRatio={config.preserveAspectRatio}
    >
      <line pathLength="1" x1="0.5" y1="0" x2="0.5" y2="100" />
    </svg>
  );
}
