"use client";

export default function ShaderBackgroundFallback() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #071B3A 0%, #050912 50%, #050509 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(108,77,255,0.3) 1px, transparent 1px), " +
            "radial-gradient(circle at 70% 20%, rgba(116,247,255,0.2) 1px, transparent 1px), " +
            "radial-gradient(circle at 40% 70%, rgba(108,77,255,0.2) 1px, transparent 1px), " +
            "radial-gradient(circle at 80% 60%, rgba(116,247,255,0.15) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 180px 180px, 140px 140px, 200px 200px",
        }}
      />
    </div>
  );
}
