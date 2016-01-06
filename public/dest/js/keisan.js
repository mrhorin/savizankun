(function() {
  window.Keisan = (function() {
    var END_SHINYA, HOUTEI_ROUDOU_ZIKAN, START_SHINYA, WARIMASHI, WEEKS, _getRodoTime, _timeParseFloat;

    WEEKS = 4.4;

    WARIMASHI = 0.25;

    HOUTEI_ROUDOU_ZIKAN = 8;

    START_SHINYA = 22;

    END_SHINYA = 5;

    function Keisan(formValuesList) {
      this.formValues = formValuesList;
      this.formValues["startWork"] = _timeParseFloat(this.formValues["startWorkHour"], this.formValues["startWorkMin"]);
      this.formValues["endWork"] = _timeParseFloat(this.formValues["endWorkHour"], this.formValues["endWorkMin"]);
      this.formValues["overEndWork"] = _timeParseFloat(this.formValues["overEndWorkHour"], this.formValues["overEndWorkMin"]);
      this.rodoTime = {
        "syotei": _getRodoTime(this.formValues["startWork"], this.formValues["endWork"], this.formValues["kyukei"]),
        "zitu": _getRodoTime(this.formValues["startWork"], this.formValues["overEndWork"], this.formValues["kyukei"])
      };
      console.log(this.formValues);
      console.log(this.rodoTime);
    }

    _timeParseFloat = function(hour, min) {
      return min / 60 + hour;
    };

    _getRodoTime = function(startTime, endTime, kyukei) {
      kyukei = kyukei / 60;
      if (endTime - startTime > 0) {
        return endTime - startTime - kyukei;
      } else {
        return 24 - startTime + endTime - kyukei;
      }
    };

    return Keisan;

  })();

}).call(this);
