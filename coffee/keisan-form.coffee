# 計算フォーム関連クラス
class window.KeisanForm

  constructor: ->
    @setEventListener()

  setEventListener: ->
    # 計算フォーム
    form   = document.getElementById("keisan")
    # 月給
    gekkyu = document.getElementById("gekkyu")
    # 計算するボタン
    keisanBtn = document.getElementById("keisanBtn")
    # モダル呼び出しボタン
    modalBtn = document.getElementById("modalBtn")

    # 計算するボタンにイベントリスナーをセット
    keisanBtn.addEventListener "click", ->
      # 計算フォームの値チェック
      if form.checkValidity()
        console.log "OK！"
      else
        console.log "NG..."
