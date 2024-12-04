import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            provider: "istanbul",
            include: ["src/**"],
            exclude: ["src/components/**"],
        },
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
        reporters: ["basic", "html"],
        include: ["src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        exclude: ["**/node_modules/**", "**/dist/**"],
    },
    server: {
        host: true,
        port: 3000,
    },
});
