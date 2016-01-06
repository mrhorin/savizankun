# シェアボタン関連クラス
class window.Share

  constructor: ->
    @setEventListener()

  # シェアボタンにイベントを設定
  setEventListener: ->
    # IDから各ボタンを取得
    @twitter = document.getElementById("twitter")
    @fb = document.getElementById("fb")
    @hatena = document.getElementById("hatena")
    # クリックイベント追加
    @twitter.addEventListener "click", ->
      @shareTwitter()
    @fb.addEventListener "click", ->
      @shareFacebook()
    @hatena.addEventListener "click", ->
      @shareHatena()

  # Twitterボタンクリック
  shareTwitter: ->
    window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
    return false

  # FBボタンクリック
  shareFacebook: ->
    window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1')
    return false

  # はてブボタンクリック
  shareHatena: ->
    window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
    return false
