/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.1',
      banner: '/*! Chute.MediaChooser - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://getchute.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Chute Corporation; Licensed MIT */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/chute.js>', 'lib/chute.js'],
        dest: 'dist/chute.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/chute.min.js'
      }
    },
    watch: {
      files: ['lib/chute.js', 'src/chute.js'],
      tasks: 'concat min'
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
