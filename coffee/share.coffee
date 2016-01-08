# シェアボタン関連クラス

class window.Share

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
    _shareCountTwitter()

  # Twitterボタンクリック
  _shareTwitter = ->
    window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
    return false

  _shareCountTwitter = ->
    $.ajax {
      url:'http://urls.api.twitter.com/1/urls/count.json',
      dataType: 'jsonp',
      type: 'GET',
      data: {
        url: 'http://savizankun.com'
      }
      success: (res) ->
        console.log(res.count)
        @twitter.children[1].innerText = res.count
      ,
      error: () ->
        console.log("NGGGGGGG");
    }

  # FBボタンクリック
  _shareFacebook = ->
    window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1')
    return false

  # はてブボタンクリック
  _shareHatena = ->
    window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
    return false
