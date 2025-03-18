#!/bin/bash
# Script para automatizar el despliegue de la aplicación
# Uso: ./deploy.sh [environment]
# Donde environment puede ser: staging o prod (producción)

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar errores y salir
error_exit() {
  echo -e "${RED}Error: $1${NC}" >&2
  exit 1
}

# Validar el ambiente
ENVIRONMENT=$1
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "prod" ]; then
  error_exit "El ambiente debe ser 'staging' o 'prod'"
fi

# Determinar el comando de build según el ambiente
if [ "$ENVIRONMENT" = "staging" ]; then
  BUILD_CMD="npm run build:staging"
  ENV_NAME="pre-producción"
else
  BUILD_CMD="npm run build:prod"
  ENV_NAME="producción"
fi

echo -e "${YELLOW}Iniciando despliegue para el ambiente de ${ENV_NAME}...${NC}"

# Verificar que no haya cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
  error_exit "Hay cambios sin commitear. Haz commit o stash antes de desplegar."
fi

# Actualizar dependencias
echo -e "${YELLOW}Instalando/actualizando dependencias...${NC}"
npm install || error_exit "Error al instalar dependencias"

# Ejecutar linting
echo -e "${YELLOW}Ejecutando linting...${NC}"
npm run lint || error_exit "Hay errores de linting que deben corregirse"

# Limpiar directorio de build previo
echo -e "${YELLOW}Limpiando build previo...${NC}"
npm run clean || error_exit "Error al limpiar el directorio de build"

# Generar build
echo -e "${YELLOW}Generando build para ${ENV_NAME}...${NC}"
eval $BUILD_CMD || error_exit "Error al generar el build"

echo -e "${GREEN}Build completado exitosamente para ${ENV_NAME}!${NC}"
echo -e "${YELLOW}Los archivos están listos en el directorio 'dist/'${NC}"

# Instrucciones de despliegue
echo -e "${YELLOW}Para desplegar manualmente, ejecuta:${NC}"
echo -e "  - Copia el contenido de la carpeta 'dist/' a tu servidor web"
echo -e "  - Asegúrate de que las redirecciones estén configuradas para SPA (todas las rutas a index.html)"

exit 0