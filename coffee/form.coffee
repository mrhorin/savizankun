# 計算フォーム関連クラス

class window.Form

  constructor: ->
    _setSelector()
    _setEventListener()

  # セレクタをセット
  _setSelector = ->
    # 計算フォーム
    @form   = document.getElementById("keisan")
    # 月給
    @gekkyu = document.getElementById("gekkyu")
    # 年間休日
    @nenkyu = document.getElementById("nenkyu")
    # 週休
    @syukyu = document.getElementById("syukyu")
    # 休憩時間
    @kyukei = document.getElementById("kyukei")
    # 出勤時刻
    @startWorkHour = document.getElementById("startWorkHour")
    @startWorkMin = document.getElementById("startWorkMin")
    # 定時退勤時刻
    @endWorkHour = document.getElementById("endWorkHour")
    @endWorkMin = document.getElementById("endWorkMin")
    # 平均定時退勤時刻
    @overEndWorkHour = document.getElementById("overEndWorkHour")
    @overEndWorkMin = document.getElementById("overEndWorkMin")
    # 計算するボタン
    @keisanBtn = document.getElementById("keisanBtn")
    # モーダル呼び出しボタン
    @modalBtn = document.getElementById("modalBtn")
    # 年間の残業代
    @zangyouYenYear = document.getElementById("zangyou-yen-year")
    # 年間の残業時間
    @zangyouTimeYear = document.getElementById("zangyou-time-year")
    # 時給
    @zikyu = document.getElementById("zikyu")
    # 結果をツイートボタン
    @btnTweetLink = document.getElementById("btn-tweet-link")
    # 過労死認定基準値超過
    @karoushi = document.getElementById("karoushi")


  # イベントリスナーをセット
  _setEventListener = ->
    # 計算するボタンにイベントリスナーをセット
    @keisanBtn.addEventListener "click", ->
      # 計算フォームの値チェック
      if @form.checkValidity()
        _validSuccess()
      else
        _validFail()

  # 値チェック成功時の処理
  _validSuccess = ->
    formValues = _getFormValuesList()
    keisan = new window.Keisan(formValues)
    # 結果をモーダルに表示
    @zangyouYenYear.innerText = keisan.getZangyouYenYear().toLocaleString() + "円"
    @zangyouTimeYear.innerText = keisan.getZangyouTimeYear().toLocaleString() + "時間"
    @zikyu.innerText = keisan.getZikyu().toLocaleString() + "円/時"
    # 結果をツイートボタンにクリックイベントを追加
    @btnTweetLink.addEventListener "click", ->
      _kekkaTweet keisan.getTweetUrl()
    # 過労死認定基準値超過画像
    _showKaroushi keisan.validKaroushi()
    # モーダルを表示
    @modalBtn.click()

  # 値チェック失敗時の処理
  _validFail = ->

  # フォーム入力値を連想配列で取得
  _getFormValuesList = ->
    formValues =
      "gekkyu": Number(@gekkyu.value)
      "nenkyu": Number(@nenkyu.value)
      "syukyu": Number(@syukyu.value)
      "kyukei": Number(@kyukei.value)
      "startWorkHour": Number(@startWorkHour.value)
      "startWorkMin": Number(@startWorkMin.value)
      "endWorkHour": Number(@endWorkHour.value)
      "endWorkMin": Number(@endWorkMin.value)
      "overEndWorkHour": Number(@overEndWorkHour.value)
      "overEndWorkMin": Number(@overEndWorkMin.value)

  # 結果をツイート
  _kekkaTweet = (url)->
    _url = url
    w_size = 650
    h_size = 450
    l_position = Number (window.screen.width-w_size)/2
    t_position = Number (window.screen.height-h_size)/2
    window.open(_url, null, "width=#{w_size}, height=#{h_size}, left=#{l_position}, top=#{t_position}, menubar=no, toolbar=no, scrollbars=yes")
    return false

  # 過労死基準超過の表示
  _showKaroushi = (flug)->
    if flug
      @karoushi.style.display = "block"
    else
      @karoushi.style.display = "none"
