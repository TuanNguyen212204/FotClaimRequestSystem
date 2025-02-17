import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // phai add nhung cai nay neu ko build se fail cho tung cai ben trong tsconfig.app.json
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@constant": fileURLToPath(new URL("./src/constant", import.meta.url)),
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
      "@routes": fileURLToPath(new URL("./src/routers", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@redux": fileURLToPath(new URL("./src/redux", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@Hooks": fileURLToPath(new URL("./src/Hooks", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
