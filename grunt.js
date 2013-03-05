/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-coffee');

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.4',
      banner: '/*! Chute.MediaChooser - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://getchute.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Chute Corporation; Licensed MIT */'
    },
    coffee: {
      app: {
        src: 'src/media-chooser.coffee',
        dest: 'src',
        options: {
          bare: true
        }
      }
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/media-chooser.js>', 'lib/chute.js'],
        dest: 'dist/media-chooser.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/media-chooser.min.js'
      }
    },
    watch: {
      files: ['lib/chute.js', 'src/media-chooser.coffee'],
      tasks: 'coffee concat min'
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min');

};
