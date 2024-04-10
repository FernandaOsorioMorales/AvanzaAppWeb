import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
	build:{
		assetsInlineLimit: 0,
	},
	base: "/",
	plugins: [react()],
	preview: {
		port: 8080,
		strictPort: true,
	},
	server: {
		port: 8080,
		strictPort: true,
		cors: true,
		host: true,
		origin: "http://0.0.0.0:8080",
	},
	resolve: {
		// Añadir una extensión de archivo adicional para que Vite pueda resolver imágenes
		// Esto asegura que Vite pueda manejar importaciones de imágenes sin necesidad de especificar la extensión del archivo
		// Por ejemplo, puedes importar imágenes sin necesidad de agregar la extensión del archivo: import pesas2 from "../../assets/pesas2"
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
	  },
});
