const { override } = require("react-app-rewired");

module.exports = function override(config, env) {
  // Find ForkTsCheckerWebpackPlugin and enable skipLibCheck
  const tsCheckerPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "ForkTsCheckerWebpackPlugin"
  );
  if (tsCheckerPlugin) {
    if (tsCheckerPlugin.options && tsCheckerPlugin.options.typescript) {
      tsCheckerPlugin.options.typescript.configOverwrite = {
        ...tsCheckerPlugin.options.typescript.configOverwrite,
        compilerOptions: {
          ...(tsCheckerPlugin.options.typescript.configOverwrite || {}).compilerOptions,
          skipLibCheck: true,
        },
      };
    }
  }
  return config;
};
