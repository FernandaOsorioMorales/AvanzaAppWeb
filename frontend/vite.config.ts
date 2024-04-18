import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: "/",
	plugins: [react()],
	preview: {
		port: 8080,
		strictPort: true,
	},
	server: {
		port: 8080,
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:8080",
		cors: false,
		proxy: {
			"/api": {
				target: "http://back:9090",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			"/ws": {
				target: "ws://back:9090/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/ws/, ''),
			}
		}
	},
});
