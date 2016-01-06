# 計算処理をするクラス
class window.Keisan
  # 一ヶ月の週の数
  WEEKS = 4.4
  # 割増賃金の割増率
  WARIMASHI = 0.25
  # 法定労働時間
  HOUTEI_ROUDOU_ZIKAN = 8
  # 割増賃金が発生する深夜時間帯
  START_SHINYA = 22
  END_SHINYA = 5

  # 引数：フォーム入力値の連想配列
  constructor: (formValuesList)->
    @formValues =  formValuesList
    # 時刻を小数値に変換して格納
    @formValues["startWork"] = _timeParseFloat(@formValues["startWorkHour"], @formValues["startWorkMin"])
    @formValues["endWork"] = _timeParseFloat(@formValues["endWorkHour"], @formValues["endWorkMin"])
    @formValues["overEndWork"] = _timeParseFloat(@formValues["overEndWorkHour"], @formValues["overEndWorkMin"])

    @rodoTime =
      # 所定労働時間
      "syotei": _getRodoTime(@formValues["startWork"], @formValues["endWork"], @formValues["kyukei"])
      # 実労働時間
      "zitu": _getRodoTime(@formValues["startWork"], @formValues["overEndWork"], @formValues["kyukei"])

    console.log @formValues
    console.log @rodoTime

  # 時刻を小数値に変換して取得
  _timeParseFloat = (hour, min)->
    return min / 60 + hour

  # startTimeからendTimeまでの労働時間を取得
  _getRodoTime = (startTime, endTime, kyukei)->
    kyukei = kyukei / 60
    if(endTime - startTime > 0)
      return endTime - startTime - kyukei
    else
      return 24 - startTime + endTime - kyukei
