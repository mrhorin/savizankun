# 計算フォーム関連クラス
class window.KeisanForm

  constructor: ->
    setEventListener()

  # イベントリスナーをセット
  setEventListener = ->
    # 計算フォーム
    @form   = document.getElementById("keisan")
    # 月給
    @gekkyu = document.getElementById("gekkyu")
    # 計算するボタン
    @keisanBtn = document.getElementById("keisanBtn")
    # モーダル呼び出しボタン
    @modalBtn = document.getElementById("modalBtn")

    # 計算するボタンにイベントリスナーをセット
    @keisanBtn.addEventListener "click", ->
      # 計算フォームの値チェック
      if @form.checkValidity()
        validSuccess()
      else
        validFail()

  # 値チェック成功時の処理
  validSuccess = ->
    # モーダルを表示
    @modalBtn.click()

  # 値チェック失敗時の処理
  validFail = ->
