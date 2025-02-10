const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
    e2e: {
        env: {
            requestMode: true,
        },
        async setupNodeEvents(on, config) {
            // Add the Cucumber preprocessor plugin first
            await addCucumberPreprocessorPlugin(on, config);

            // Create the bundler with the esbuild plugin
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });
            
            // Use the bundler for file pre-processing
            on("file:preprocessor", bundler);

            // Ensure screenshot on failure
            config.screenshotOnRunFailure = true;

            return config;
        },

        baseUrl: 'https://akoni.hub.seguat.com/', // Update with your SignUp URL
        specPattern: "cypress/e2e/**/*.feature", // Specify where your feature files are
        viewportWidth: 1920,
        viewportHeight: 1080,
        experimentalModifyObstructiveThirdPartyCode: true, // Experiment feature for modifying third-party code
        experimentalRunAllSpecs: true, // Run all specs in parallel, if required
        chromeWebSecurity: false, // Disable Chrome's web security to run in local environment
        defaultCommandTimeout: 10000, // Set default command timeout to 10 seconds

        // ✅ Add Mochawesome Reporter
        reporter: "mochawesome",
        reporterOptions: {
            reportDir: "cypress/reports",
            overwrite: false,
            html: true,
            json: true,
            timestamp: "mmddyyyy_HHMMss",
        },
    },

    // Project-specific ID for Cypress Dashboard
    projectId: "w6mgs8",
});
