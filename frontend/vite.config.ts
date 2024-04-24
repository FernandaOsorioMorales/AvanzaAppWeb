import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
	build:{
		assetsInlineLimit: 0,
	},
	base: "/",
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	},
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
	resolve: {
		// Añadir una extensión de archivo adicional para que Vite pueda resolver imágenes
		// Esto asegura que Vite pueda manejar importaciones de imágenes sin necesidad de especificar la extensión del archivo
		// Por ejemplo, puedes importar imágenes sin necesidad de agregar la extensión del archivo: import pesas2 from "../../assets/pesas2"
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
	  },
});
