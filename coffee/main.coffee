# このクラスはindex.hamlの読み込み完了時にインスタンス化される

class window.Main

  constructor: ->
    @shareObj = new window.Share()
    @keisanFormObj = new window.KeisanForm()
