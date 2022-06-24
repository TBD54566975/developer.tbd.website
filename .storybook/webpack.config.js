module.exports = ({ config }) => {
  config.resolve.alias = {
    '@docusaurus/router': require.resolve('./__mocks__/UseLocationMock.js'),
    'react-router-dom': require.resolve('./__mocks__/LinkMock.js'),
  };
  return config;
};
