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

const requestTransport = [
    new winston.transports.File({
        filename: 'logs/access.log',
        format: fileFormat
    })
]

export default class Logger {
    private log: winston.Logger;
    private requestLogger: winston.Logger;

    constructor(appName: string) {
        this.log = winston.createLogger({
            level: level(),
            levels,
            format: combine(
                label({ label: appName, message: true }),
                timestamp()
            ),
            transports
        })
        this.requestLogger = winston.createLogger({
            level: "http",
            levels: { http: 0 },
            format: combine(
                label({ label: appName, message: true }),
                timestamp()
            ),
            transports: requestTransport
        })
    }

    error(message: string) {
        this.log.error(message);
    }

    warn(message: string) {
        this.log.warn(message);
    }

    info(message: string) {
        this.log.info(message);
    }

    http(message: string) {
        this.log.http(message);
        this.requestLogger.http(message);
    }

    debug(message: string) {
        this.log.debug(message);
    }
}