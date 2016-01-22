module.exports = (grunt)->
  grunt.initConfig
    # package.jsonのロード(必須ではない)
    pkg: grunt.file.readJSON 'package.json'
    # grunt-contrib-watch 監視
    watch:
      coffee_assets:
        files: ['coffee/*.coffee']
        tasks: 'coffee:assets'
      scss_assets:
        files: ['scss/*.scss']
        tasks: 'sass:assets'
      slim_assets:
        files: ['slim/**/*.slim']
        tasks: 'slim:assets'
      concat_js:
        files: ['public/dest/js/*.js']
        tasks: 'concat'
    # grunt-contrib-concat 結合
    concat:
      files:
        src: 'public/dest/js/*.js'
        dest: 'public/scripts.js'
    # コンパイル
    coffee:
      assets:
        files: [
          expand: true,
          cwd: 'coffee'
          src: ['./*.coffee']
          dest: 'public/dest/js'
          ext: '.js'
        ]
    sass:
      assets:
        files: [
          expand: true
          cwd: 'scss/'
          src: ['./*.scss']
          dest: 'public/dest/css/'
          ext: '.css'
        ]
    slim:
      assets:
        files: [
          expand: true
          cwd: 'slim/'
          src: ['./*.slim']
          dest: 'public/'
          ext: '.html'
        ]
    # grunt-bower-task
    bower:
      install:
        options:
          targetDir: 'public/lib/'
          layout: 'byComponent'
          install: true
          verbose: false
          cleanTargetDir: true
          cleanBowerDir: false
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
    # タスクを登録
    grunt.registerTask 'default', ['watch']
