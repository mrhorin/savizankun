module.exports = (grunt)->
  grunt.initConfig
    # package.jsonのロード(必須ではない)
    pkg: grunt.file.readJSON 'package.json'
    # 監視
    watch:
      coffee_assets:
        files: ['coffee/*.coffee']
        tasks: 'coffee:assets'
      scss_assets:
        files: ['scss/*.scss']
        tasks: 'sass:assets'
      haml_assets:
        files: ['haml/*.haml']
        tasks: 'haml:assets'
      concat_js:
        files: ['public/dest/js/*.js']
        tasks: 'concat'
    # 結合タスク
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
    haml:
      assets:
        files: [
          expand: true
          cwd: 'haml/'
          src: ['./*.haml']
          dest: 'public/'
          ext: '.html'
        ]
    # Bower
    bower:
      install:
        options:
          targetDir: 'public/lib/'
          layout: 'byComponent'
          install: true
          verbose: false
          cleanTargetDir: true
          cleanBowerDir: false

    grunt.loadNpmTasks 'grunt-bower-task'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-sass'
    grunt.loadNpmTasks 'grunt-contrib-haml'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    # タスクを登録
    grunt.registerTask 'default', ['watch']
