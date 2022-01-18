module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@config/(.*)": "<rootDir>/src/configs/$1",
        "@lib/(.*)": "<rootDir>/src/lib/$1",
        "@middleware/(.*)": "<rootDir>/src/middleware/$1",
        "@routes/(.*)": "<rootDir>/src/routes/$1",
    },
};