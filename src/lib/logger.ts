/* eslint-disable @typescript-eslint/restrict-template-expressions */
import winston from 'winston'
const { combine, timestamp, label } = winston.format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true, colors }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console({ format }),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: fileFormat
    }),
    new winston.transports.File({
        filename: 'logs/all.log',
        format: fileFormat
    }),
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format: combine(
        label({ label: "BACKEND-SKELETON", message: true }),
        timestamp()
    ),
    transports
})

export default Logger