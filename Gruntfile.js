module.exports = function(grunt) {
    /* Project configuration. */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        expand: true,
                
        concat: {           /* js 文件合并 */
 /*           options: {
            separator: ';',
                      },
*/                    
            dist: {
                src: ['static/js/snackbar.js', 'static/js/sw-registration.js'],
                dest: 'static/js/snackbar-sw-registration.js',
                    },
            plugin: {
                src: ['static/js/loadCSS.js', 'static/js/cssrelpreload.js'], /* 移除 analytic.js*/
                dest: 'static/js/plugin.js',
                    },                    
            global: {
                src: ['static/js/Quanyin-Blog.js','static/js/plugin.js'],
                dest: 'static/js/Quanyin-global.js',
                    },        
                },
                
        uglify: {   /* js文件压缩 */
            main1: {
                src: 'static/js/jquery.nav.js',
                dest: 'static/js/jquery.nav.min.js'
                    },
            main2: {
                src: 'static/js/jquery.tagcloud.js',
                dest: 'static/js/jquery.tagcloud.min.js'
                    },
            main3: {
                src: 'static/js/gitment.js',
                dest: 'static/js/gitment.min.js'
                    },
            /* snackbar-sw-registration.js只能单独处理 */
            jsglobal: {
                src: 'static/js/Quanyin-global.js',
                dest: 'static/js/Quanyin-global.min.js'
                    }
                }, 
                
        jshint: {
            files: ['Gruntfile.js', 'static/**/*.js'],
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
                    "static/css/Quanyin-global.css": "static/less/Quanyin-global.less"
                        }
                      },
            minified: {
                options: {
                    paths: ["static/css"],
                    cleancss: true
                },
                files: {
                    "static/css/Quanyin-global.min.css": "static/less/Quanyin-global.less",
                    "static/css/gitment.min.css": "static/less/gitment.less",
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
                    src: ['static/css/Quanyin-global.css', 'static/css/Quanyin-global.min.css', 'static/js/Quanyin-global.js','static/js/Quanyin-global.min.js']
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
                files: ['static/less/*.less'],
                tasks: ['static/less'],
                options: {
                    spawn: false,
                }
            },
        },
    });
    /* Load the plugins. */
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    /* Default task(s). */
    grunt.registerTask('default', ['concat','uglify','less', 'usebanner']); 
};
