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
        }
    });

    grunt.registerTask('setup', ['clean:bower', 'clean:lib', 'bower:install', 'clean:bower']);
};