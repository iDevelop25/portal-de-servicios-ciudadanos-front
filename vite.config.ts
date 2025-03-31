import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

/**
 * Configuración de Vite para distintos entornos
 * @param {string} mode - Modo de construcción (development, production, staging)
 */
export default defineConfig(({ mode }) => {
	// Carga las variables de entorno según el modo y las procesa
	const envVars = loadEnv(mode, process.cwd(), "VITE_APP_")

	// Configuración base de Vite
	return {
		plugins: [react(), tailwindcss()],

		// Configuración específica según el entorno
		define: {
			// Expone las variables de entorno al código cliente
			__APP_ENV__: JSON.stringify(mode),
			__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
			// Expone variables de entorno seleccionadas al cliente
			__APP_API_URL__: JSON.stringify(envVars.VITE_APP_API_URL),
			__APP_DEBUG__: envVars.VITE_APP_DEBUG === "true",
		},

		// Configuración para manejo de assets
		build: {
			// Limpia el directorio de salida antes de construir
			emptyOutDir: true,

			// Optimización según el entorno
			minify: mode !== "development",

			// Configuración de división de código (chunks)
			rollupOptions: {
				output: {
					manualChunks: {
						// Separa las librerías de React en un chunk propio
						"react-vendor": ["react", "react-dom", "react-router-dom"],
						// Separa otras dependencias grandes
						"form-vendor": ["formik", "yup"],
						// Incluye Zustand y otras utilidades
						"utils-vendor": ["zustand"],
					},
				},
			},

			// Genera archivos sourcemap solo en desarrollo y staging
			sourcemap: mode !== "production",
		},

		// Configuración del servidor de desarrollo
		server: {
			port: 3000,
			// Abre el navegador automáticamente en desarrollo
			open: mode === "development",
			// Configura CORS para desarrollo
			cors: true,
			// Configuración para permitir contenido mixto (HTTP en HTTPS) en desarrollo
			https:
				mode !== "development"
					? {
							// Aquí podrías agregar tus certificados para HTTPS local si fuera necesario
					  }
					: false,
			// Configuración de proxy para el sistema de reservas en desarrollo
			proxy: {
				// Configuración de proxy para el sistema de reserva
				"/reservation-proxy": {
					target: envVars.VITE_APP_RESERVATION_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/reservation-proxy/, ""),
					secure: envVars.VITE_APP_SECURE_IFRAME === "true",
				},
			},
		},
	}
})
