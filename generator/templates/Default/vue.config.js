module.exports = {
    'transpileDependencies': [
        'vuetify',
    ],
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true,
        },
    },
};
