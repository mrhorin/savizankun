# 計算処理をするクラス

class window.Keisan
  # 一ヶ月の週の数
  WEEKS = 4.4
  # 割増賃金の割増率
  WARIMASHI = 0.25
  # 法定労働時間
  HOUTEI_ROUDOU_ZIKAN = 8
  # 一週間の法定労働時間
  WEEK_HOUTEI_ROUDOU_ZIKAN = 40
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
      "syotei": _getBetweenTime(@formValues["startWork"], @formValues["endWork"], @formValues["kyukei"])
      # 実労働時間
      "zitu": _getBetweenTime(@formValues["startWork"], @formValues["overEndWork"], @formValues["kyukei"])
    # 所定労働時間の超過時間
    @rodoTime["overSyotei"] = @rodoTime["zitu"] - @rodoTime["syotei"]
    # 法定労働時間の超過時間
    @rodoTime["overHoutei"] = _getOverHouteiRodoTime(@rodoTime["zitu"])
    # 法定労働時間の超過時間（週単位）
    @rodoTime["overWeekHoutei"] = _getWeekOverHouteiRodoTime(@rodoTime["zitu"], @formValues["syukyu"])
    # 深夜労働時間
    @rodoTime["shinya"] = _getShinyaRodoTime(@formValues["startWork"], @formValues["kyukei"], @rodoTime["zitu"], @rodoTime["syotei"])

  # 時給を取得
  getZikyu: ->
    _zikyu = @formValues["gekkyu"] / ((365 - @formValues["nenkyu"]) * @rodoTime["syotei"] / 12)
    return Math.round _zikyu

  # 年間の残業代を取得
  getZangyouYenYear: ->
    _zikyu = @getZikyu()
    _weekSyukkinDays = 7 - @formValues["syukyu"]
    _yearSyukkinDays = 365 - @formValues["nenkyu"]

    # 所定労働時間超過の残業代
    _overSyotei = @rodoTime["overSyotei"] * _zikyu * _yearSyukkinDays
    # 深夜労働時間の割増賃金
    _shinyaWarimashi = @rodoTime["shinya"] * _zikyu * WARIMASHI * _yearSyukkinDays
    # 法定労働時間の割増賃金
    _overHouteiWarimashi = @rodoTime["overHoutei"] + @rodoTime["overWeekHoutei"] * WEEKS * _zikyu * WARIMASHI
    # 合算
    return Math.round _overSyotei+_shinyaWarimashi+_overHouteiWarimashi

  # 年間の残業時間を取得
  getZangyouTimeYear: ->
    _yearSyukkinDays = 365 - @formValues["nenkyu"]
    return Math.round @rodoTime["overSyotei"] * _yearSyukkinDays

  # ツイート用URLを取得
  getTweetUrl: ->
    _text = "【サビ残くん】あなたの年間のサービス残業代は" + @getZangyouYenYear().toLocaleString() + "円、時間に換算すると" + @getZangyouTimeYear() + "時間です！"
    return _url = "https://twitter.com/intent/tweet?text=" + _text + "&url=http%3A%2F%2Fsavizankun.com"

  # 深夜労働時間を取得
  _getShinyaRodoTime = (startWork, kyukei, zituRodoTime, syoteiRodoTime)->
    _kyukei = kyukei / 60 # 休憩時間を時間単位に変換
    _shinyaRodoTime = 0
    _startShinyaCount = startWork + _kyukei + syoteiRodoTime
    _endShinyaCount = startWork + _kyukei + zituRodoTime

    _i = _startShinyaCount + 0.25 # 初期値
    while _i <= _endShinyaCount
      if( (0<_i && _i<=5) || (22<_i && _i<=29) || (46<_i && _i<=48) )
        _shinyaRodoTime += 0.25
      _i += 0.25 # 増分

    return _shinyaRodoTime

  # 時刻を小数値に変換して取得
  _timeParseFloat = (hour, min)->
    return min / 60 + hour

  # startTimeからendTimeまでの労働時間を取得
  _getBetweenTime = (startTime, endTime, kyukei)->
    # 休憩時間を時間単位に変換
    _kyukei = kyukei / 60
    if(endTime - startTime > 0)
      return endTime - startTime - _kyukei
    else
      return 24 - startTime + endTime - _kyukei

  # 法定労働時間の超過時間を取得
  _getOverHouteiRodoTime = (zituRodoTime)->
    if zituRodoTime >= HOUTEI_ROUDOU_ZIKAN
      return zituRodoTime - HOUTEI_ROUDOU_ZIKAN
    else
      return 0

  # 法定労働時間の超過時間を取得（週単位）
  _getWeekOverHouteiRodoTime = (zituRodoTime, syukyu)->
    # 一週間の労働日数
    _rodoDays = 7 - syukyu
    # 一週間の実労働時間
    _weekZituRodoTime = zituRodoTime * _rodoDays

    if _weekZituRodoTime > WEEK_HOUTEI_ROUDOU_ZIKAN
      return _weekZituRodoTime - WEEK_HOUTEI_ROUDOU_ZIKAN
    else
      return 0
