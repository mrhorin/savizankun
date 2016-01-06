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
