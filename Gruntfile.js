module.exports = function(grunt) {

    require('time-grunt')(grunt);

    require('jit-grunt')(grunt);

    require('jit-grunt')(grunt, {
        protractor: 'grunt-protractor-runner',
        ngconstant: 'grunt-ng-constant',
        cdnify: 'grunt-google-cdn',
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        env: grunt.file.readJSON('env.json'),
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            dev: {
                src: ['.dev/index.html'],
                ignorePath: '../'
            },
            temp: {
                src: ['.tmp/index.html']
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath: '../',
                fileTypes:{
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },

        cdnify: {
            options: {
                cdn: require('google-cdn-data')
            },
            dist: {
                html: ['dist/index.html']
            }
        },

        ngconstant: {
            options: {
                wrap: '(function() {\n"use strict";\n{%= __ngModule %}\n})();',
                name: 'angularjsTutorial.constants'
            },
            dev: {
                options: {
                    dest: '.dev/components/constants/constants-module.js'
                },
                constants: {
                    environment: {
                        ENV: 'dev',
                        SERVER_URL: '<%= env.dev_api_server_url %>'
                    }
                }
            },
            dist: {
                options: {
                    dest: '.tmp/app/components/constants/constants-module.js'
                },
                constants: {
                    environment: {
                        ENV: 'production',
                        SERVER_URL: '<%= env.api_server_url %>'
                    }
                }
            }
        },

        injector: {
            options: {
                template: 'app/index.html',
                relative: true,
                addRootSlash: false
            },
            dev: {
                files: {
                    '.dev/index.html': [
                        '.dev/app.js',
                        '.dev/**/*module.js',
                        '.dev/**/*.js',
                        '.dev/**/*.css'
                    ]
                }
            },
            dist: {
                files: {
                    'dist/index.html': [
                        'dist/vendor.js',
                        'dist/<%= pkg.name %>-<%= pkg.version %>.min.js',
                        'dist/styles.css'
                    ]
                }
            }
        },

        watch: {
            dev: {
                files: ['bower_components/*', 'app/**/*.js', 'app/**/*.html'],
                tasks: ['refresh']
            },
            sass: {
                files: ['app/**/*.scss'],
                tasks: ['sass:dev']
            },
            e2e: {
                files: ['bower_components/*', 'app/**/*.js', 'app/**/*.html'],
                tasks: ['refresh', 'protractor']
            }
        },

        focus: {
            dev: {
                include: ['dev', 'sass']
            }
        },

        clean: {
            dev: '.dev',
            dist: 'dist',
            temp: '.tmp'
        },

        uglify: {
            option: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': [
                        'app/app.js',
                        '.tmp/app/components/constants/constants-module.js',
                        'app/**/*module.js',
                        'app/**/*.js'
                    ]
                }
            }
        },

        sass: {
            options: {
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/']
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true,
                    sourceMapContents: true
                },
                files: {
                    '.dev/styles.css': 'app/styles/main.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: {
                    'dist/styles.css': 'app/styles/main.scss'
                }
            }
        },

        copy: {
            dev: {
                expand: true,
                cwd: 'app/',
                dest: '.dev/',
                src: ['**/*.html', '**/*.js']
            },
            dist: {
                expand: true,
                cwd: 'app/',
                dest: 'dist',
                src: ['**/*.html']
            },
            temp: {
                expand: true,
                cwd: 'app/',
                dest: '.tmp',
                src: ['index.html']
            }
        },

        concurrent: {
            dev: [
                'sass:dev',
                'copy:dev',
                'ngconstant:dev'
            ]
        },

        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: 'dist',
                flow: {
                    steps: {
                        js: ['concat', 'uglify']
                    }
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dev: {
                options: {
                    map: true
                }
            }
        },

        open: {
            dev: {
                path: '<%= env.dev_api_server_url %>'
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            } 
        },

        protractor: {
            options: {
                configFile: "test/protractor.conf.js",
                noColor: false,
                keepAlive: true,
                args: {}
            },
            all: {}
        }

        // npm version prerelease --no-git-tag-version version
    });

    grunt.registerTask('dev', [
        'clean:dev',
        'concurrent:dev',
        'injector:dev',
        'wiredep:dev',
        'autoprefixer:dev',
        'open:dev',
        'focus:dev'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'clean:temp',
        'ngconstant:dist',
        'uglify:dist',
        'sass:dist',
        'copy:dist',
        'copy:temp',
        'wiredep:temp',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'injector:dist'
    ]);

    grunt.registerTask('refresh', [
        'copy:dev',
        'injector:dev',
        'wiredep:dev',
        'autoprefixer:dev'
    ]);

    grunt.registerTask('test', [
        'clean:dev',
        'concurrent:dev',
        'injector:dev',
        'wiredep:test',
        'autoprefixer:dev',
        'karma'
    ]);

    grunt.registerTask('e2e', [
        'clean:dev',
        'concurrent:dev',
        'injector:dev',
        'wiredep:dev',
        'autoprefixer:dev',
        'protractor'
    ]);
};
