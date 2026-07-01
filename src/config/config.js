export const config = {
  project: {
    name: "Market Intelligence AI",
    version: "2.0"
  },

  browser: {
    headless: true,
    timeout: 60000
  },

  storage: {
    databasePath: "database"
  },

  reports: {
    maxOpportunities: 3
  },

  telegram: {
    enabled: false
  }
};
