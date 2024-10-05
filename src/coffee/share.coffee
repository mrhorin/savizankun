# シェアボタン関連クラス

class window.Share
  URL = 'https://savizankun.mrhori.org'

  constructor: ->
    _setSelector()
    _setEventListener()
    # _setShareCounter()

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
    _url = "https://twitter.com/share?url=https://savizankun.mrhori.org&text=サビ残くん -あなたの残業代計算します！"
    w_size = 650
    h_size = 450
    l_position = Number (window.screen.width-w_size)/2
    t_position = Number (window.screen.height-h_size)/2
    window.open(_url, 'Twitter', "width=#{w_size}, height=#{h_size}, left=#{l_position}, top=#{t_position}, menubar=no, toolbar=no, scrollbars=yes")
    return false

  # FBボタンクリック
  _shareFacebook = ->
    _url = "https://www.facebook.com/sharer.php?u=https://savizankun.mrhori.org&t=サビ残くん -あなたの残業代計算します！-"
    w_size = 550
    h_size = 450
    l_position = Number (window.screen.width-w_size)/2
    t_position = Number (window.screen.height-h_size)/2
    window.open(_url, 'Facebook', "width=#{w_size}, height=#{h_size}, left=#{l_position}, top=#{t_position}, menubar=no, toolbar=no, scrollbars=yes")
    return false

  # はてブボタンクリック
  _shareHatena = ->
    _url = "https://b.hatena.ne.jp/add?mode=confirm&title='サビ残くん -あなたの残業代計算します！-'&url=https://savizankun.mrhori.org"
    w_size = 650
    h_size = 450
    l_position = Number (window.screen.width-w_size)/2
    t_position = Number (window.screen.height-h_size)/2
    window.open(_url, 'Hatena', "width=#{w_size}, height=#{h_size}, left=#{l_position}, top=#{t_position}, menubar=no, toolbar=no, scrollbars=yes")
    return false

  # FBのシェアボタンのカウンターをセット
  _setFbCounter = ->
    $.ajax {
      url: 'https://graph.facebook.com/?id=' + encodeURIComponent(URL),
      dataType: 'jsonp',
      type: 'GET',
      success: (res) =>
        @fb.children[1].innerText = if res["share"]["share_count"] then res["share"]["share_count"] else "-"
      ,
      error: (error) ->
        console.log error
    }

  # はてなのシェアボタンのカウンターをセット
  _setHatenaCounter = ->
    $.ajax {
      url: 'https://api.b.st-hatena.com/entry.count?url=' + encodeURIComponent(URL),
      dataType: 'jsonp',
      type: 'GET',
      success: (count) =>
        @hatena.children[1].innerText = if count then count else "-"
      ,
      error: (error) ->
        console.log error
    }
