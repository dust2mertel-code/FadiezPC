export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/FadiezPC/",
  plugins: [react()],
}));