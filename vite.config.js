import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ProyectoFinal_WEB/", // Solo el nombre del repositorio, con barras al inicio y final
});
