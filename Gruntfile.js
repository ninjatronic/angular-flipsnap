'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        bowerJson: grunt.file.readJSON('bower.json'),

        clean: {
            bower: ['./bower_components'],
            lib: ['./lib']
        },

        bower: {
            install: { }
        },

        jshint: {
            all: ['<%= bowerJson.name %>.js'],
            options: {
                globals: {
                    // Angular
                    angular: false
                }
            }
        },


        strip: {
            all: {
                src: '<%= bowerJson.name %>.min.js',
                    options: {
                    inline: true
                }
            }
        },
        uglify: {
            src: {
                files: {
                    '<%= bowerJson.name %>.min.js': ['<%= bowerJson.name %>.js']
                }
            }
        }
    });

    grunt.registerTask('setup', ['clean:bower', 'clean:lib', 'bower:install', 'clean:bower']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['uglify', 'strip']);
};