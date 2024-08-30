module.exports = {
    apps: [
        {
            name: 'ProductionClient',
            exec_mode: 'cluster',
            port: 3000,
            instances: 'max', // Or a number of instances
            script: './.output/server/index.mjs',
            args: 'start',
        },
    ],
};
