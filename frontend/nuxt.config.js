export default {
    head: {
        title: 'qblog',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: '/css/font.css' },
            { rel: 'stylesheet', href: '/css/style.css' },
        ],
    },

    css: [],

    plugins: [
        '~/api/axios',
        '~/api/index',
        '~/plugins/route',
        '~/plugins/common',
        '~/plugins/toast'
    ],

    components: true,

    buildModules: [],

    modules: [
        '@nuxtjs/axios',
    ],

    build: {
        babel: {
            plugins: [
                [
                    'prismjs',
                    {
                        languages: [
                            'html',
                            'css',
                            'javascript',
                            'php',
                            'dart',
                            'bash',
                            'nginx',
                            'sql',
                            'c',
                            'cpp',
                            'python',
                            'go',
                            'java',
                            'json'
                        ],
                        plugins: [
                            'line-numbers',
                            'show-language',
                            'copy-to-clipboard'
                        ],
                        theme: 'tomorrow',
                        css: true
                    }
                ],
                ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
        },
    },
    router: {

    },
    loading: false,
    generate: {
        dir: './dist'
    }
}