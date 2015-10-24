module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

    require('jit-grunt')(grunt, {
        protractor: 'grunt-protractor-runner'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            dev: {
                src: ['.dev/index.html'],
                ignorePath:  /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
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

        injector: {
            options: {
                template: 'app/index.html',
                relative: true
            },
            dev: {
                files: {
                    '.dev/index.html': ['.dev/app.js', '.dev/**/*module.js', '.dev/**/*.js', '.dev/**/*.css']
                }
            }
        },

        watch: {
            dev: {
                files: ['bower_components/*', 'app/**/*.js', 'app/**/*.html',  'app/**/*.css'],
                tasks: ['refresh']
            },
            sass: {
                files: ['app/**/*.scss', 'app/**/*.sass'],
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
            dist: 'dist'
        },

        uglify: {
            option: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['app/app.js', 'app/**/*module.js', 'app/**/*.js']
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
            }
        },

        concurrent: {
            dev: [
                'sass:dev',
                'copy:dev'
            ]
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
    });

    grunt.registerTask('build_dev', [
        'clean:dev',
        'concurrent:dev',
        'injector:dev',
        'wiredep:dev',
        'autoprefixer:dev',
        'focus:dev'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'uglify:dist',
        'sass:dist'
    ]);

    grunt.registerTask('refresh', [
        'copy:dev',
        'injector:dev',
        'wiredep:dev',
        'autoprefixer:dev'
    ]);

    grunt.registerTask('test', [
        'clean:dev',
        'copy:dev',
        'injector:dev',
        'wiredep',
        'autoprefixer:dev',
        'karma'
    ]);

    grunt.registerTask('e2e', [
        'clean:dev',
        'copy:dev',
        'injector:dev',
        'wiredep:dev',
        'autoprefixer:dev',
        'express:test',
        'protractor'
    ]);
};