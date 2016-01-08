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
      this.modalBtn = document.getElementById("modalBtn");
      this.zangyouYenYear = document.getElementById("zangyou-yen-year");
      this.zangyouTimeYear = document.getElementById("zangyou-time-year");
      this.zikyu = document.getElementById("zikyu");
      return this.btnTweetLink = document.getElementById("btn-tweet-link");
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
      this.zangyouYenYear.innerText = keisan.getZangyouYenYear().toLocaleString() + "円";
      this.zangyouTimeYear.innerText = keisan.getZangyouTimeYear().toLocaleString() + "時間";
      this.zikyu.innerText = keisan.getZikyu().toLocaleString() + "円/時";
      this.btnTweetLink.setAttribute("href", keisan.getTweetUrl());
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

    Keisan.prototype.getTweetUrl = function() {
      var _text, _url;
      _text = "【サビ残くん】あなたの年間のサービス残業代は" + this.getZangyouYenYear().toLocaleString() + "円、時間に換算すると" + this.getZangyouTimeYear() + "時間です！";
      return _url = "https://twitter.com/intent/tweet?text=" + _text + "&url=http%3A%2F%2Fsavizankun.com";
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
    var URL, _setEventListener, _setFbCounter, _setHatenaCounter, _setSelector, _setShareCounter, _shareFacebook, _shareHatena, _shareTwitter;

    URL = 'http://savizankun.com';

    function Share() {
      _setSelector();
      _setEventListener();
      _setShareCounter();
    }

    _setSelector = function() {
      this.twitter = document.getElementById("twitter");
      this.fb = document.getElementById("fb");
      return this.hatena = document.getElementById("hatena");
    };

    _setEventListener = function() {
      this.twitter.addEventListener("click", function() {
        return _shareTwitter();
      });
      this.fb.addEventListener("click", function() {
        return _shareFacebook();
      });
      return this.hatena.addEventListener("click", function() {
        return _shareHatena();
      });
    };

    _setShareCounter = function() {
      _setFbCounter();
      return _setHatenaCounter();
    };

    _shareTwitter = function() {
      var _url;
      _url = "http://twitter.com/share?url=http://savizankun.com&text=サビ残くん -あなたの残業代計算します！";
      window.open(_url, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    _shareFacebook = function() {
      var _url;
      _url = "http://www.facebook.com/sharer.php?u=http://savizankun.com&t=サビ残くん -あなたの残業代計算します！-";
      window.open(_url, 'Facebook', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
      return false;
    };

    _shareHatena = function() {
      var _url;
      _url = "http://b.hatena.ne.jp/add?mode=confirm&title='サビ残くん -あなたの残業代計算します！-'&url=http://savizankun.com";
      window.open(_url, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    _setFbCounter = function() {
      return $.ajax({
        url: 'http://graph.facebook.com/?id=' + encodeURIComponent(URL),
        dataType: 'jsonp',
        type: 'GET',
        success: (function(_this) {
          return function(res) {
            return _this.fb.children[1].innerText = res.shares;
          };
        })(this),
        error: function(error) {
          return console.log(error);
        }
      });
    };

    _setHatenaCounter = function() {
      return $.ajax({
        url: 'http://api.b.st-hatena.com/entry.count?url=' + encodeURIComponent(URL),
        dataType: 'jsonp',
        type: 'GET',
        success: (function(_this) {
          return function(count) {
            return _this.hatena.children[1].innerText = count;
          };
        })(this),
        error: function(error) {
          return console.log(error);
        }
      });
    };

    return Share;

  })();

}).call(this);
