// Archivo: /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/vite.config.ts

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
			// Configuración de proxy para los diferentes servicios
			proxy: {
				// Configuración del proxy para sistema de reservas
				"/reservation-proxy": {
					target:
						envVars.VITE_APP_RESERVATION_URL || "https://10.101.5.111:4433",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/reservation-proxy/, ""),
					configure: (proxy) => {
						// Ignorar errores de SSL
						proxy.on("error", (err, _, res) => {
							console.warn("Proxy error:", err)
							// Proporcionar una respuesta personalizada en caso de error de proxy
							if (res.writeHead && !res.headersSent) {
								res.writeHead(500, {
									"Content-Type": "text/plain",
								})
								res.end(
									"Error de conexión con el servidor de reservas. Por favor intente más tarde."
								)
							}
						})
					},
					// MUY IMPORTANTE: Deshabilitar verificación SSL para desarrollo
					secure: false,
					// Intentar preservar fuentes originales
					ws: true,
				},
				// Proxy para API de búsqueda y top consultados
				"/api/master": {
					target: "http://10.101.5.61:8082",
					changeOrigin: true,
					secure: false,
					configure: (proxy) => {
						proxy.on("error", (err, _, res) => {
							console.warn("API Master proxy error:", err)
							if (res.writeHead && !res.headersSent) {
								res.writeHead(500, {
									"Content-Type": "application/json",
								})
								res.end(
									JSON.stringify({
										success: false,
										message:
											"Error de conexión con el servicio. Por favor intente más tarde.",
									})
								)
							}
						})
					},
				},
				// Proxy para cualquier otra API
				"/api": {
					target: envVars.VITE_APP_API_URL || "http://localhost:4000",
					changeOrigin: true,
					secure: false,
					configure: (proxy) => {
						proxy.on("error", (err, _, res) => {
							console.warn("API proxy error:", err)
							if (res.writeHead && !res.headersSent) {
								res.writeHead(500, {
									"Content-Type": "application/json",
								})
								res.end(
									JSON.stringify({
										success: false,
										message:
											"Error de conexión con la API. Por favor intente más tarde.",
									})
								)
							}
						})
					},
				},
				// Proxy para API de grupos
				"/api/master/group": {
					target: "http://10.101.5.61:8082",
					changeOrigin: true,
					secure: false,
					configure: (proxy) => {
						proxy.on("error", (err, _, res) => {
							console.warn("Group API proxy error:", err)
							if (res.writeHead && !res.headersSent) {
								res.writeHead(500, {
									"Content-Type": "application/json",
								})
								res.end(
									JSON.stringify({
										success: false,
										message:
											"Error de conexión con el servicio de grupos. Por favor intente más tarde.",
									})
								)
							}
						})
					},
				},
			},
		},

		// Optimizaciones adicionales para cualquier problema de resolución de módulos
		resolve: {
			// Alias para resolver rutas de importación
			alias: {
				"@": "/src",
				assets: "/src/assets",
			},
		},

		// Optimizaciones de construcción
		optimizeDeps: {
			// Forzar incluir dependencias problemáticas en el proceso de optimización
			include: ["react", "react-dom", "react-router-dom", "lucide-react"],
			// Excluir dependencias que causan problemas
			exclude: [],
		},

		// Configuración de CSS
		css: {
			// Habilitar módulos CSS para archivos .module.css/.module.scss
			modules: {
				scopeBehaviour: "local",
				localsConvention: "camelCase",
			},
		},
	}
})
