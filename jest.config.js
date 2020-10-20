module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "https://lilfimokeyrings.web.app"
  },
  testMatch: [
    "**/test/**/*.test.js"
  ],
  verbose: true
}