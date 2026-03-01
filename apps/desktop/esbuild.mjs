import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const common = {
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "es2022",
  sourcemap: true,
  outdir: "dist",
  logLevel: "info",
  external: ["electron"],
  outExtension: { ".js": ".cjs" }, // 👈 ключевой фикс
};

const builds = [
  { ...common, entryPoints: ["src/main.ts"] },
  { ...common, entryPoints: ["src/preload.ts"] },
];

if (watch) {
  const ctx1 = await esbuild.context(builds[0]);
  const ctx2 = await esbuild.context(builds[1]);
  await ctx1.watch();
  await ctx2.watch();
  console.log("[esbuild] watching...");
} else {
  await Promise.all(builds.map((b) => esbuild.build(b)));
  console.log("[esbuild] build complete");
}
