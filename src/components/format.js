// "$700-$1,500+" -> "$700–$1,500+", "3-6 weeks" -> "3–6 weeks".
export const formatRange = (value) => value.replace(/(\d)-(\$?\d)/g, "$1–$2");

// "Typical timeline: 3-6 weeks, depending on…" -> "3–6 weeks".
export const shortTimeline = (timeline) => formatRange(timeline.replace(/^Typical timeline:\s*/, "").split(",")[0]);
