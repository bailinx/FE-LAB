module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                protocol: 'http',
                port: 9000, // 静态服务器端口
                hostname: '*',
                livereload: 35729 // watch监听的端口
            },
            server: {
                options: {
                    open: true,
                    base: [
                        ''
                    ]
                }
            }
        },
        watch: {
            scripts: {
                options: {
                    livereload: '<%=connect.options.livereload%>'
                },
                files: [
                    "*.html",
                    "js/**/*.js"
                ],
                tasks: ['uglify:build']
            }
            /*scripts: {
                files: "js/*.js",
                tasks: ['uglify']
            },
            css: {
                files: "css/*.css",
                tasks: ['cssmin']
            }*/
        },
        uglify: {
            options: {
                footer:'\n/*! build time: <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                expand: true,
                cwd: 'js/',
                src: '*.js',
                dest: 'dist/js/',
                ext: '.min.js',
                extDot: 'last'
            }
        },
    });

    // grunt.loadNpmTasks('grunt-contrib-livereload');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('server', [
        'connect:server',
        'watch'
    ]);
    grunt.registerTask('default', ['uglify']);
};
