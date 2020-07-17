module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            exclude: [
                /\.htaccess$/,
            ],
        },
    },
};
