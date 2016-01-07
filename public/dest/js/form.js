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
      return this.zikyu = document.getElementById("zikyu");
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
