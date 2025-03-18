# Portal Frontend

## Entornos de Despliegue

Este proyecto está configurado para tres entornos distintos:

- **Desarrollo**: Entorno local para desarrollo
- **Preproducción**: Entorno de pruebas/QA antes de producción
- **Producción**: Entorno público para usuarios finales

## Requisitos Previos

- Node.js (versión 18.x o superior)
- npm (versión 9.x o superior)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

## Comandos Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ejecutar linting
npm run lint

# Corregir errores de linting automáticamente
npm run lint:fix
```

### Construcción (Build)

```bash
# Build para desarrollo (por defecto)
npm run build

# Build para preproducción
npm run build:staging

# Build para producción
npm run build:prod

# Limpiar directorio dist
npm run clean
```

### Previsualización

```bash
# Previsualizar build de desarrollo
npm run preview

# Previsualizar build de preproducción
npm run preview:staging

# Previsualizar build de producción
npm run preview:prod
```

## Despliegue Automático

Se proporciona un script de despliegue para facilitar el proceso:

```bash
# Dar permisos de ejecución (solo la primera vez)
chmod +x deploy.sh

# Desplegar en preproducción
./deploy.sh staging

# Desplegar en producción
./deploy.sh prod
```

## Despliegue Manual

Para desplegar manualmente la aplicación:

1. Generar el build para el entorno deseado:

   ```bash
   npm run build:staging  # o build:prod para producción
   ```

2. Copiar el contenido de la carpeta `dist/` al servidor web.

3. Configurar el servidor web:
   - Configurar todas las rutas para que redirijan a `index.html` (necesario para SPA con React Router)
   - Configurar caché apropiada para archivos estáticos:
     - Archivos JS/CSS con hash: caché de larga duración (1 año)
     - index.html: no cachear

### Ejemplo de configuración Nginx

```nginx
server {
    listen 80;
    server_name tudominio.com;

    root /ruta/a/tu/dist;
    index index.html;

    # Caché para archivos estáticos con hash en el nombre
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # No cachear index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        expires 0;
    }

    # Redirigir todas las rutas a index.html para SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Variables de Entorno

Las variables de entorno se definen en los archivos:

- `.env`: Variables compartidas
- `.env.development`: Variables para desarrollo
- `.env.staging`: Variables para preproducción
- `.env.production`: Variables para producción

Para añadir nuevas variables de entorno:

1. Agregar la variable al archivo `.env.XXX` correspondiente
2. Comenzar el nombre con `VITE_APP_` para que sea accesible en el código frontend
3. Acceder a ellas a través del objeto `env` definido en `src/utils/env.ts`

## Notas Importantes

- Verificar que todos los cambios estén commiteados antes de generar un build para despliegue
- Ejecutar el linting antes de desplegar para evitar errores
- Revisar que las APIs configuradas en las variables de entorno estén disponibles
