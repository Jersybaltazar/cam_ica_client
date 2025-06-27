export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleApiError = (error: any): string => {
  console.error('API Error:', error);

  // Error de red
  if (error.code === 'ECONNABORTED') {
    return 'La solicitud ha tardado demasiado. Intente nuevamente.';
  }

  if (error.code === 'NETWORK_ERROR' || !error.response) {
    return 'Error de conexión. Verifique su conexión a internet.';
  }

  // Errores HTTP específicos
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message;

  switch (status) {
    case 400:
      return `Datos incorrectos: ${message}`;
    case 401:
      return 'No autorizado. Verifique sus credenciales.';
    case 403:
      return 'No tiene permisos para realizar esta acción.';
    case 404:
      return 'No se encontró la información solicitada.';
    case 422:
      return `Error de validación: ${message}`;
    case 500:
      return 'Error interno del servidor. Intente nuevamente más tarde.';
    case 502:
      return 'Servidor no disponible. Intente más tarde.';
    case 503:
      return 'Servicio temporalmente no disponible.';
    default:
      return message || 'Ha ocurrido un error inesperado.';
  }
};