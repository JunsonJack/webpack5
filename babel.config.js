module.exports = {
presets: [
        ['@babel/preset-env',
        {
            useBuiltIns: 'usage',
            corejs: {
                version: 3
            },
            // 指定兼容性做到哪个版本浏览器
            targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17'
            }
        }]
    ]
    }