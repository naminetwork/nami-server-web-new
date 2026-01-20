module.exports = {
    apps: [{
        name: "nami-website",
        script: "npx",
        args: "mintlify dev --port 3000",
        interpreter: "none", // npx is an executable, not a node script
        env: {
            NODE_ENV: "production",
        }
    }]
};
