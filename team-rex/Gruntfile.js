'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		watch: {
			less : {
				files: "static/less/{,*/}*.less",
				tasks: ['less:dev']
			},
			express: {
				files:  [ 'server/**/*.js', 'server.js' ],
				tasks:  [ 'dev' ],
				options: {
					spawn: false
				}
			}
		},

		less: {
			dev: {
				options: {},
				files: {
					"static/styles/main.css": ["static/less/main.less"]
				}
			},
			build: {
				options: {
					"cleancss": true,
					"compress": true
				},
				files: {
					"static/styles/main.css": ["static/less/main.less"]
				}
			}
		},

		clean: {
			dist: ["www", "dist"],
			tmp: [".tmp"]
		},

		express: {
			dev: {
				options: {
					script: './server.js',
					node_env: 'development',
					port: 2222
				}
			},
			prod: {
				options: {
					script: 'www/server.js',
					node_env: 'production',
					port: 3333
				}
			}
		},

		rev: {
			dist: {
				files: {
					src: [
						"www/static/scripts/{,*/}*.js",
						"www/static/styles/{,*/}*.css"
					]
				}
			}
		},

		uglify: {
			options: {
				preserveComments : 'some'
			}
		},

		useminPrepare: {
			build: {
				src: ['views/*.html'],
				options: {
					root: 'static',
					dest: 'www/static/',
					flow: {
						steps: {
							'js' : ['concat', 'uglifyjs'],
							'css' : ['concat']
						},
						post: []
					}
				}
			}
		},

		usemin: {
			html: ['www/views/{,*/}*.html'],
			options: {
				assetsDirs: ['www/views']
			}
		},

		copy: {
			styles: {
				expand: true,
				cwd: '.tmp/concat/styles',
				dest: 'www/static/styles',
				src: '**'
			},
			views: {
				expand: true,
				cwd: 'views',
				dest: 'www/views',
				src: '**'
			},
			build: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: 'static',
						dest: 'www/static',
						src: [
							"**",
							"!less/**",
							"!libs/**",
							"!scripts/**",
							"!styles/**",
							"!static/**"
						]
					},
					{
						expand: true,
						cwd: 'static/libs/components-font-awesome/fonts/',
						dest: 'www/static/styles/fonts',
						src: '**'
					},
					{
						expand: true,
						dest: 'www',
						src: ['server.js']
					},
					{
						expand: true,
						cwd: 'server',
						dest: 'www/server',
						src: '**'
					},
					{
						expand: true,
						cwd: 'node_modules',
						dest: 'www/node_modules',
						src: ['ejs/**/*', 'body-parser/**/*', 'cookie-parser/**/*', 'express/**/*', 'express-session/**/*', 'request/**/*', 'multiparty/**/*', 'winston/**/*']
					}
				]
			}
		},

		removelogging: {
			dist: {
				src: [".tmp/concat/scripts/app.min.js"],
				options: {
					namespace : ['app']
				}
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		}
	});

	grunt.registerTask('build', [
		'clean:dist',
		'clean:tmp',
		'less:build',
		'useminPrepare:build',
		'concat',
		'removelogging',
		'uglify',
		'copy:styles',
		'copy:build',
		'copy:views',
		'usemin'
	]);

	grunt.registerTask('dev', [
		'express:dev',
		'watch'
	]);

	grunt.registerTask('prod', [
		'express:prod',
		'watch'
	]);

	grunt.registerTask('default', [
		'dev'
	]);

	grunt.registerTask('test', [
		'karma'
	]);
};
