const { Client } = require('pg');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
    e2e: {
        experimentalWebKitSupport: true,
      },
})
