module.exports = function(grunt) {
    /* Project configuration. */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        expand: true,
        clean: {
              file: ['src/js/plugin.js','src/js/Quanyin-global.js','src/js/snackbar-sw-registration.js','static/sw.min.js'],
              contents: ['static/js/*'],
              css: ['static/css/*.css','src/css/*.css'],
        },
        concat: {           /* js 文件合并 */
 /*           options: {
            separator: ';',
                      },
*/
/*            sw: {
                src: ['src/js/snackbar.js', 'src/js/sw-registration.js'],
                dest: 'src/js/snackbar-sw-registration.js',
                    }, */
            plugin: {
                src: ['src/js/snackbar.js','src/js/sw-registration.js','src/js/busuanzi.pure.js','src/js/cssrelpreload.js','src/js/back2top.js'], /* 移除 analytic.js , loadcss.js ,不再依赖 */
                dest: 'src/js/plugin.js',
                    },
            global: {
                src: ['src/js/Quanyin-Blog.js','src/js/plugin.js'],
                dest: 'src/js/Quanyin-global.js',
                    },
                },

        uglify: {   /* js文件压缩 使用grunt-contrib-uglify-es */
            sw: {
                src: 'src/sw.js',
                dest: 'static/sw.min.js'
                    },
        /*    snackbar: {
                src: 'src/js/snackbar-sw-registration.js',
                dest: 'static/js/snackbar-sw-registration.min.js'
                    }, */
        /*    nav: {
                src: 'src/js/jquery.nav.js',
                dest: 'static/js/jquery.nav.min.js'
                    }, 合并到global.js 
            tagcloud: {
                src: 'src/js/jquery.tagcloud.js',
                dest: 'static/js/jquery.tagcloud.min.js'
                    },*/
            gitment: {
                src: 'src/js/gitment.js',
                dest: 'static/js/gitment.min.js'
                    },
            /* busuanzi: {
                src: 'src/js/busuanzi.pure.js',
                dest: 'static/js/busuanzi.pure.mini.js'
                    }, */
            jsglobal: {
                src: 'src/js/Quanyin-global.js',
                dest: 'static/js/Quanyin-global.min.js'
                    }
                },

        jshint: {
            files: ['Gruntfile.js', 'static/**/*.js','src/**/*.js'],
            options: {
                globals: {
                  jQuery: true,
                  /*console: true,
                  module: true,
                  document: true,
                  */      },
                    esversion: 6,
                    },
                },

        less: { /*less文件生成css */
            expanded: {
                options: {
                    paths: ["static/css"]
                },
                files: {
                    "src/css/Quanyin-global.css": "src/less/Quanyin-global.less"
                        }
                      },
            minified: {
                options: {
                    paths: ["static/css"],
                    cleancss: true
                },
                files: {
                    "static/css/Quanyin-global.min.css": "src/less/Quanyin-global.less",
                    "static/css/gitment.min.css": "src/less/gitment.less",
                        }
                    }
                },
        banner: '/*! <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>) || Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> */',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['src/css/Quanyin-global.css', 'static/css/Quanyin-global.min.css', 'src/js/Quanyin-global.js','static/js/Quanyin-global.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['static/js/Quanyin-global.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['src/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
    });
    /* Load the plugins. */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    /* Default task(s). */
    grunt.registerTask('default', ['clean','concat','uglify','less', 'usebanner']);
};
