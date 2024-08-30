module.exports = {
    apps: [
        {
            name: 'StageClient',
            exec_mode: 'cluster',
            port: 3001,
            instances: 'max', // Or a number of instances
            script: './.output/server/index.mjs',
            args: 'start',
        },
    ],
};
