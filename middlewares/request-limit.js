export const helmetConfiguration = {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'blob:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            frameAncestors: ["'none'"],
        },
    },
    // HSTS desactivado por simplicidad (evita depender de entornos). Activar solo si se requiere.
    hsts: false,
    // Cabeceras básicas y útiles para API
    frameguard: { action: 'deny' },
    noSniff: true,
    hidePoweredBy: true,
    // Compatibilidad con Swagger UI y recursos embebidos
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
};
 
import rateLimit from 'express-rate-limit';
 
export const requestLimit = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 minutos

    max: 100, // Límite de 100 requests por ventana de tiempo por IP

    message: {

        success: false,

        message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',

        error: 'RATE_LIMIT_EXCEEDED',

    },

    standardHeaders: true, // Retorna rate limit info en los headers `RateLimit-*`

    legacyHeaders: false, // Desactiva los headers `X-RateLimit-*`

    handler: (req, res) => {

        console.log(`Rate limit exceeded for IP: ${req.ip}, Path: ${req.path}`);

        res.status(429).json({

            success: false,

            message:

                'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',

            error: 'RATE_LIMIT_EXCEEDED',

            retryAfter: Math.round((req.rateLimit.resetTime - Date.now()) / 1000),

        });

    },

});
 