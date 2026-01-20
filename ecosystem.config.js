module.exports = {
    apps: [
        {
            name: 'nami-web',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
