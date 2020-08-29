module.exports = {
  apps: [
    {
      name: 'nully-backend',
      script: './build/index.js',
      instances: 0,
      exec_mode: 'cluster',
    },
  ],
};
