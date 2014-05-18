module.exports = function(grunt) {
  // Load all grunt tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Load the config file and set theme path.
  var tfb_config = grunt.file.readJSON('tfb_config.json');

  grunt.initConfig({
    tfb: tfb_config,



    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= tfb.local %>/css/tfb.css',
            '<%= tfb.local %>/{,*/}*.{js,html}'
          ]
        },

        options: {
          browser:   '<%= tfb.browser %>',
          server:    { baseDir: '<%= tfb.local %>' },
          watchTask: true
        }
      }
    },



    compass: {
      options: {
        config: '<%= tfb.local %>/config.rb',
        force:  true,

        sassDir:        '<%= tfb.local %>/scss',
        cssDir:         '<%= tfb.local %>/css',
        javascriptsDir: '<%= tfb.local %>/js',
        relativeAssets: true
      },

      dev: {}
    },



    copy: {
      build: {
        files: [{
          expand: true,
          dot:    true,
          cwd:    '<%= tfb.local %>',
          dest:   '<%= tfb.dist %>',
          src: [
            '.htaccess',
            '**/*.{jpg,png,ico}',
            'css/**/*.css',
            '*.txt',
            '*.html'
          ]
        }]
      }
    },



    cssmin: {
      minify: {
        expand: true,
        cwd:    '<%= tfb.dist %>/css',
        src:    '*.css',
        dest:   '<%= tfb.dist %>/css'
      }
    },



    htmlmin: {
      build: {
        options: {
          collapseWhitespace:        true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes:     true,
          removeRedundantAttributes: true,
          removeEmptyAttributes:     true,
          removeOptionalTags:        true,
          // removeEmptyElements removes script tags
          // removeEmptyElements:       true,
          caseSensitive:             true
        },
        files: [{
          expand: true,
          cwd:    '<%= tfb.dist %>',
          dest:   '<%= tfb.dist %>',
          src:    ['*.html']
        }]
      }
    },



    imageoptim: {
      build: {
        options: {
          jpegMini:   true,
          imageAlpha: true,
          quitAfter:  true
        },
        files: [{
          expand: true,
          cwd:    '<%= tfb.local %>',
          dest:   '<%= tfb.dist %>',
          src: [
            'apple-touch-icon-precomposed.png',
            'assets/img'
          ]
        }]
      }
    },



    inline: {
      build: {
        options: {
          tag: ['tfb']
        },
        src: ['<%= tfb.dist %>/index.html']
      }
    },



    svgmin: {
      build: {
        files: {
          '<%= tfb.dist  %>/assets/img/the-friendly-beasts.svg':
          '<%= tfb.local %>/assets/img/the-friendly-beasts.svg'
        }
      }
    },



    uglify: {
      build: {
        files: [{
          expand: true,
          cwd:    '<%= tfb.local %>/js',
          dest:   '<%= tfb.dist %>/js',
          src:    '**/*.js'
        }]
      }
    },



    uncss: {
      build: {
        files: {
          '<%= tfb.dist %>/css/tfb.css': '<%= tfb.dist %>/index.html'
        }
      }
    },



    watch: {
      configFiles: {
        files: ['Gruntfile.js']
      },

      compass: {
        files: ['<%= tfb.local %>/scss/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

// ------------------------------------

  grunt.registerTask('dev', [
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'newer:imageoptim',
    'newer:copy',
    'uncss',
    'cssmin',
    'newer:uglify',
    'newer:svgmin:build',
    'inline:build',
    'htmlmin'
  ]);
};
