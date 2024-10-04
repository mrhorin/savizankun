module.exports = (grunt)->
  grunt.initConfig
    # package.jsonのロード(必須ではない)
    pkg: grunt.file.readJSON 'package.json'
    # grunt-contrib-watch 監視
    watch:
      coffee_assets:
        files: ['src/coffee/*.coffee']
        tasks: 'coffee:assets'
      scss_assets:
        files: ['src/scss/*.scss']
        tasks: 'sass:assets'
      slim_assets:
        files: ['src/slim/**/*.slim']
        tasks: 'slim:assets'
      concat_js:
        files: ['dest/js/*.js']
        tasks: 'concat'
    # grunt-contrib-concat 結合
    concat:
      files:
        src: 'dest/js/*.js'
        dest: 'public/scripts.js'
    # コンパイル
    coffee:
      assets:
        files: [
          expand: true,
          cwd: 'src/coffee'
          src: ['./*.coffee']
          dest: 'dest/js'
          ext: '.js'
        ]
    sass:
      assets:
        files: [
          expand: true
          cwd: 'src/scss'
          src: ['./*.scss']
          dest: 'public/'
          ext: '.css'
        ]
    slim:
      assets:
        files: [
          expand: true
          cwd: 'src/slim'
          src: ['./*.slim']
          dest: 'public/'
          ext: '.html'
        ]
    copy:
      main:
        expand: true
        cwd: './src/img'
        src: ['**']
        dest: './public/img'
    # grunt-bower-task
    bower:
      install:
        options:
          targetDir: './public/lib'
          cleanTargetDir: 'true'
          copy: true
          layout: 'byType'
          verbose: true
    # grunt-sitemap
    sitemap:
      dist:
        pattern: ['public/*.html']
        siteRoot: 'public/'
        homepage: 'index.html'

    grunt.loadNpmTasks 'grunt-bower-task'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-sass'
    grunt.loadNpmTasks 'grunt-slim'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-sitemap'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    # タスクを登録
    grunt.registerTask 'default', ['watch']
    grunt.registerTask('build', ['coffee', 'concat', 'sass', 'slim', 'copy', 'sitemap', 'bower:install'])
