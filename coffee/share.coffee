# シェアボタン関連クラス

class window.Share
  URL = 'http://savizankun.com'

  constructor: ->
    _setSelector()
    _setEventListener()
    _setShareCounter()

  # セレクタをセット
  _setSelector = ->
    # IDから各ボタンを取得
    @twitter = document.getElementById("twitter")
    @fb = document.getElementById("fb")
    @hatena = document.getElementById("hatena")

  # シェアボタンにイベントを設定
  _setEventListener = ->
    # クリックイベント追加
    @twitter.addEventListener "click", ->
      _shareTwitter()
    @fb.addEventListener "click", ->
      _shareFacebook()
    @hatena.addEventListener "click", ->
      _shareHatena()

  # シェアボタンのカウンターをセット
  _setShareCounter = ->
    _setFbCounter()
    _setHatenaCounter()

  # Twitterボタンクリック
  _shareTwitter = ->
    window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
    return false

  # FBボタンクリック
  _shareFacebook = ->
    window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1')
    return false

  # はてブボタンクリック
  _shareHatena = ->
    window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
    return false

  # FBのシェアボタンのカウンターをセット
  _setFbCounter = ->
    $.ajax {
      url: 'http://graph.facebook.com/?id=' + encodeURIComponent(URL),
      dataType: 'jsonp',
      type: 'GET',
      success: (res) =>
        @fb.children[1].innerText = res.shares
      ,
      error: (error) ->
        console.log error
    }

  # はてなのシェアボタンのカウンターをセット
  _setHatenaCounter = ->
    $.ajax {
      url: 'http://api.b.st-hatena.com/entry.count?url=' + encodeURIComponent(URL),
      dataType: 'jsonp',
      type: 'GET',
      success: (count) =>
        @hatena.children[1].innerText = count
      ,
      error: (error) ->
        console.log error
    }
