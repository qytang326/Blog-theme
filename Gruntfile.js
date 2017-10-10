module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        expand: true,
        uglify: {
            main1: {
                src: 'js/jquery.nav.js',
                dest: 'js/jquery.nav.min.js'
                    },
            main2: {
                src: 'js/jquery.tagcloud.js',
                dest: 'js/jquery.tagcloud.min.js'
                    },
            /* 会报错,注释掉,只能单独处理
            main3: {
                src: 'js/snackbar-sw-registration.js',
                dest: 'js/snackbar-sw-registration.min.js'
                    },  
                         
            main4: {
                src: 'js/lazy-load-img.js',
                dest: 'js/lazy-load-img.min.js'
                    },
            */
            jsglobal: {
                src: 'js/Quanyin-global.js',
                dest: 'js/Quanyin-global.min.js'
                    }
               
                },                
        concat: {
 /*           options: {
            separator: ';',
                      },
*/                    
            dist1: {
                src: ['js/snackbar.js', 'js/sw-registration.js'],
                dest: 'js/snackbar-sw-registration.js',
                    },
            dist2: {
                src: ['js/loadCSS.js', 'js/cssrelpreload.js','js/analytics.js'],
                dest: 'js/plugin.js',
                    },                    
            dist3: {
                src: ['js/Quanyin-Blog.js','js/plugin.js'],
                dest: 'js/Quanyin-global.js',
                    },        
                },
        jshint: {
          all: ['js/Quanyin-global.js']
        },                
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/Quanyin-global.css": "less/Quanyin-global.less"
                        }
                      },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "css/Quanyin-global.min.css": "less/Quanyin-global.less"
                        }
                    }
                },  
        imagemin:{  
            /* 压缩图片大小 */  
            dist:{  
                options: {  
                    optimizationLevel: 3 /* 定义 PNG 图片优化水平  */
                         },  
                files: [  
                       {  
                    expand: true,  
                    cwd: 'Source',  
                    src: ['**/*.{png,jpg,jpeg,ico}'], /* 优化 img 目录下所有 png/jpg/jpeg 图片   */
                    dest: 'Source/' /* 优化后的图片保存位置，覆盖旧图片，并且不作提示  */ 
                    }  
                    ]  
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
                    src: ['css/Quanyin-global.css', 'css/Quanyin-global.min.css', 'js/Quanyin-global.min.js','js/Quanyin-global.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/Quanyin-global.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    /* Default task(s). */
    grunt.registerTask('default', ['concat','uglify','less', 'usebanner']); /* 默认不进行图片压缩,原因有点慢 */
    grunt.registerTask('img', ['imagemin']);

};
