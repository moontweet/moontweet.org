/*global module:false*/
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);


    // Project configuration.
    grunt.initConfig({
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: "dist"
            }
        },

        clean: [".tmp/**", "dist/**"],


        copy: {
            index: {
                src: 'app/index.html', dest: 'dist/index.html'
            },
            views: {
                expand: true,
                cwd: "app/views/",
                src: '**',
                dest: 'dist/views/'
            },
            font1: {
                expand: true,
                cwd: 'app/',
                src: ["bower_components/fontawesome/fonts/*", "bower_components/bootstrap/dist/fonts/*"],
                dest: 'dist/fonts/',
                flatten: true
            },
            font2: {
                expand: true,
                cwd: 'app/',
                src: ["fonts/**/*"],
                dest: 'dist/'
            },
            images: {
                expand: true,
                cwd: "app/images/",
                src: '**',
                dest: 'dist/images/'
            },
            config: {
                dot: true,
                expand: true,
                cwd: ".",
                src: [".env", ".static"],
                dest: "dist/"
            },
            languages: {
                expand: true,
                cwd: "app/languages/",
                src: '**',
                dest: 'dist/languages/'
            },
            public: {
                expand: true,
                cwd: "app/public/",
                src: '**',
                dest: 'dist/public/'
            }
        },


        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5'
            },
            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [
                    {
                        src: [
                            'dist/images/*.{png,gif,jpg,svg}',
                            'dist/js/*.js',
                            'dist/css/*.css'
                        ]
                    }
                ]
            }
        },

        uglify: {
            options: {
                mangle: false
            }
        },

        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/**/*.html', "dist/views/**/*.html"],
            css: ['dist/css/**/*.css'],
            js: ['dist/js/*.js'],
            options: {
                assetsDirs: ['dist', 'dist/images'],
                patterns: {
                    // FIXME While usemin won't have full support for revved files we have to put all references manually here
                    js: [
                        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            production: {
                options: {
                    remote: 'dokku@149.202.8.167:moontweet',
                    branch: 'master'
                }
            }
        }





    });

    // Build task.
    grunt.registerTask('build', [
        'useminPrepare',
        'clean',
        'copy',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('deploy-staging', [
        'buildcontrol:staging'
    ])

};
