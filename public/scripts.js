(function() {
  window.Form = (function() {
    var _getFormValuesList, _setEventListener, _setSelector, _validFail, _validSuccess;

    function Form() {
      _setSelector();
      _setEventListener();
    }

    _setSelector = function() {
      this.form = document.getElementById("keisan");
      this.gekkyu = document.getElementById("gekkyu");
      this.nenkyu = document.getElementById("nenkyu");
      this.syukyu = document.getElementById("syukyu");
      this.kyukei = document.getElementById("kyukei");
      this.startWorkHour = document.getElementById("startWorkHour");
      this.startWorkMin = document.getElementById("startWorkMin");
      this.endWorkHour = document.getElementById("endWorkHour");
      this.endWorkMin = document.getElementById("endWorkMin");
      this.overEndWorkHour = document.getElementById("overEndWorkHour");
      this.overEndWorkMin = document.getElementById("overEndWorkMin");
      this.keisanBtn = document.getElementById("keisanBtn");
      return this.modalBtn = document.getElementById("modalBtn");
    };

    _setEventListener = function() {
      return this.keisanBtn.addEventListener("click", function() {
        if (this.form.checkValidity()) {
          return _validSuccess();
        } else {
          return _validFail();
        }
      });
    };

    _validSuccess = function() {
      var formValues, keisan;
      formValues = _getFormValuesList();
      keisan = new window.Keisan(formValues);
      return this.modalBtn.click();
    };

    _validFail = function() {};

    _getFormValuesList = function() {
      var formValues;
      return formValues = {
        "gekkyu": Number(this.gekkyu.value),
        "nenkyu": Number(this.nenkyu.value),
        "syukyu": Number(this.syukyu.value),
        "kyukei": Number(this.kyukei.value),
        "startWorkHour": Number(this.startWorkHour.value),
        "startWorkMin": Number(this.startWorkMin.value),
        "endWorkHour": Number(this.endWorkHour.value),
        "endWorkMin": Number(this.endWorkMin.value),
        "overEndWorkHour": Number(this.overEndWorkHour.value),
        "overEndWorkMin": Number(this.overEndWorkMin.value)
      };
    };

    return Form;

  })();

}).call(this);

(function() {
  window.KeisanForm = (function() {
    var setEventListener, validFail, validSuccess;

    function KeisanForm() {
      setEventListener();
    }

    setEventListener = function() {
      this.form = document.getElementById("keisan");
      this.gekkyu = document.getElementById("gekkyu");
      this.keisanBtn = document.getElementById("keisanBtn");
      this.modalBtn = document.getElementById("modalBtn");
      return this.keisanBtn.addEventListener("click", function() {
        if (this.form.checkValidity()) {
          return validSuccess();
        } else {
          return validFail();
        }
      });
    };

    validSuccess = function() {
      return this.modalBtn.click();
    };

    validFail = function() {};

    return KeisanForm;

  })();

}).call(this);

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

(function() {
  window.Main = (function() {
    function Main() {
      this.shareObj = new window.Share();
      this.FormObj = new window.Form();
    }

    return Main;

  })();

}).call(this);

(function() {
  window.Share = (function() {
    function Share() {
      this.setEventListener();
    }

    Share.prototype.setEventListener = function() {
      this.twitter = document.getElementById("twitter");
      this.fb = document.getElementById("fb");
      this.hatena = document.getElementById("hatena");
      this.twitter.addEventListener("click", function() {
        return this.shareTwitter();
      });
      this.fb.addEventListener("click", function() {
        return this.shareFacebook();
      });
      return this.hatena.addEventListener("click", function() {
        return this.shareHatena();
      });
    };

    Share.prototype.shareTwitter = function() {
      window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    Share.prototype.shareFacebook = function() {
      window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
      return false;
    };

    Share.prototype.shareHatena = function() {
      window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    return Share;

  })();

}).call(this);
