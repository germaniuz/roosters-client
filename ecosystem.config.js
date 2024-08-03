module.exports = {
    apps: [
        {
            name: 'RoostersClient',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: './.output/server/index.mjs',
            args: 'start',
        },
    ],
};
