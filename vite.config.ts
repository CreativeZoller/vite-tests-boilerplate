import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const currentEnv = loadEnv(mode, process.cwd())
  console.log('mode - ', command)
  console.log('environment - ', currentEnv)
  return defineConfig({
    plugins: [
      react(),
      AutoImport({
        imports: ['react', 'react-router-dom'],
        dts: './src/auto-imports.d.ts',
        dirs: ['src/store'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
      }),
    ],
    base: currentEnv.VITE_PUBLIC_PATH,
    mode: mode,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@store': resolve(__dirname, './src/store'),
        '@views': resolve(__dirname, './src/views'),
        '@assets': resolve(__dirname, './src/assets'),
        '@hooks': resolve(__dirname, './src/hooks'),
      },
    },
    css: {
      preprocessorOptions: {
        sass: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      outDir: mode === 'docker' ? 'dist' : 'docs',
      sourcemap: mode != 'production',
    },
  })
}
