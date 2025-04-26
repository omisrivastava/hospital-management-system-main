// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["jsonwebtoken", "mongoose", "validator", "bcrypt"],
  },
  // ssr: {
  //   noExternal: ['bcrypt'] // or the ones you use in SSR
  // }
});
