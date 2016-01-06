(function() {
  window.Keisan = (function() {
    var END_SHINYA, HOUTEI_ROUDOU_ZIKAN, START_SHINYA, WARIMASHI, WEEKS, WEEK_HOUTEI_ROUDOU_ZIKAN, _getBetweenTime, _getOverHouteiRodoTime, _getShinyaRodoTime, _getWeekOverHouteiRodoTime, _timeParseFloat;

    WEEKS = 4.4;

    WARIMASHI = 0.25;

    HOUTEI_ROUDOU_ZIKAN = 8;

    WEEK_HOUTEI_ROUDOU_ZIKAN = 40;

    START_SHINYA = 22;

    END_SHINYA = 5;

    function Keisan(formValuesList) {
      this.formValues = formValuesList;
      this.formValues["startWork"] = _timeParseFloat(this.formValues["startWorkHour"], this.formValues["startWorkMin"]);
      this.formValues["endWork"] = _timeParseFloat(this.formValues["endWorkHour"], this.formValues["endWorkMin"]);
      this.formValues["overEndWork"] = _timeParseFloat(this.formValues["overEndWorkHour"], this.formValues["overEndWorkMin"]);
      this.rodoTime = {
        "syotei": _getBetweenTime(this.formValues["startWork"], this.formValues["endWork"], this.formValues["kyukei"]),
        "zitu": _getBetweenTime(this.formValues["startWork"], this.formValues["overEndWork"], this.formValues["kyukei"])
      };
      this.rodoTime["overSyotei"] = this.rodoTime["zitu"] - this.rodoTime["syotei"];
      this.rodoTime["overHoutei"] = _getOverHouteiRodoTime(this.rodoTime["zitu"]);
      this.rodoTime["overWeekHoutei"] = _getWeekOverHouteiRodoTime(this.rodoTime["zitu"], this.formValues["syukyu"]);
      this.rodoTime["shinya"] = _getShinyaRodoTime(this.formValues["startWork"], this.formValues["kyukei"], this.rodoTime["zitu"], this.rodoTime["syotei"]);
    }

    Keisan.prototype.getZikyu = function() {
      var _zikyu;
      _zikyu = this.formValues["gekkyu"] / ((365 - this.formValues["nenkyu"]) * this.rodoTime["syotei"] / 12);
      return Math.round(_zikyu);
    };

    Keisan.prototype.getZangyouYenYear = function() {
      var _overHouteiWarimashi, _overSyotei, _shinyaWarimashi, _weekSyukkinDays, _yearSyukkinDays, _zikyu;
      _zikyu = this.getZikyu();
      _weekSyukkinDays = 7 - this.formValues["syukyu"];
      _yearSyukkinDays = 365 - this.formValues["nenkyu"];
      _overSyotei = this.rodoTime["overSyotei"] * _zikyu * _yearSyukkinDays;
      _shinyaWarimashi = this.rodoTime["shinya"] * _zikyu * WARIMASHI * _yearSyukkinDays;
      _overHouteiWarimashi = this.rodoTime["overHoutei"] + this.rodoTime["overWeekHoutei"] * WEEKS * _zikyu * WARIMASHI;
      return Math.round(_overSyotei + _shinyaWarimashi + _overHouteiWarimashi);
    };

    Keisan.prototype.getZangyouTimeYear = function() {
      var _yearSyukkinDays;
      _yearSyukkinDays = 365 - this.formValues["nenkyu"];
      return Math.round(this.rodoTime["overSyotei"] * _yearSyukkinDays);
    };

    _getShinyaRodoTime = function(startWork, kyukei, zituRodoTime, syoteiRodoTime) {
      var _endShinyaCount, _i, _kyukei, _shinyaRodoTime, _startShinyaCount;
      _kyukei = kyukei / 60;
      _shinyaRodoTime = 0;
      _startShinyaCount = startWork + _kyukei + syoteiRodoTime;
      _endShinyaCount = startWork + _kyukei + zituRodoTime;
      _i = _startShinyaCount + 0.25;
      while (_i <= _endShinyaCount) {
        if ((0 < _i && _i <= 5) || (22 < _i && _i <= 29) || (46 < _i && _i <= 48)) {
          _shinyaRodoTime += 0.25;
        }
        _i += 0.25;
      }
      return _shinyaRodoTime;
    };

    _timeParseFloat = function(hour, min) {
      return min / 60 + hour;
    };

    _getBetweenTime = function(startTime, endTime, kyukei) {
      var _kyukei;
      _kyukei = kyukei / 60;
      if (endTime - startTime > 0) {
        return endTime - startTime - _kyukei;
      } else {
        return 24 - startTime + endTime - _kyukei;
      }
    };

    _getOverHouteiRodoTime = function(zituRodoTime) {
      if (zituRodoTime >= HOUTEI_ROUDOU_ZIKAN) {
        return zituRodoTime - HOUTEI_ROUDOU_ZIKAN;
      } else {
        return 0;
      }
    };

    _getWeekOverHouteiRodoTime = function(zituRodoTime, syukyu) {
      var _rodoDays, _weekZituRodoTime;
      _rodoDays = 7 - syukyu;
      _weekZituRodoTime = zituRodoTime * _rodoDays;
      if (_weekZituRodoTime > WEEK_HOUTEI_ROUDOU_ZIKAN) {
        return _weekZituRodoTime - WEEK_HOUTEI_ROUDOU_ZIKAN;
      } else {
        return 0;
      }
    };

    return Keisan;

  })();

}).call(this);
