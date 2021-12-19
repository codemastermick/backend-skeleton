module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@lib/(.*)": "<rootDir>/src/lib/$1",
        "@middleware/(.*)": "<rootDir>/src/middleware/$1"
    },
};