module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			build: {
				options: {
					screwIE8: true
				},
				files: {
					'dist/hooker.min.js': ['src/hooker.js']
				}
			}
		}
	
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');	
	grunt.registerTask('default', ['uglify:build']);
};