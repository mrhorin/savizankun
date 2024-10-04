# フォーム入力値の値チェックするクラス

class window.Valid

  # 引数：window.Keisanインスタンス
  constructor: (keisan)->
    @keisan = keisan

  # 実労働時間 + 休憩時間が24時間以上でないか
  check24hOver: ->
    if @keisan.rodoTime["zitu"] + @keisan.formValues["kyukei"]/60 < 24
      return true
    else
      return false

  # 所定労働時間が0になっていないか
  check0Syotei: ->
    if @keisan.rodoTime["syotei"] > 0
      return true
    else
      return false
