module.exports = function override(config, env) {
    if (config.devServer) {
      config.devServer.allowedHosts = ['localhost']; // Adjust the allowed hosts as needed
    }
    return config;
  };
  