(function() {
  window.KeisanForm = (function() {
    function KeisanForm() {
      this.setEventListener();
    }

    KeisanForm.prototype.setEventListener = function() {
      var form, gekkyu, keisanBtn, modalBtn;
      form = document.getElementById("keisan");
      gekkyu = document.getElementById("gekkyu");
      keisanBtn = document.getElementById("keisanBtn");
      modalBtn = document.getElementById("modalBtn");
      return keisanBtn.addEventListener("click", function() {
        if (form.checkValidity()) {
          return console.log("OK！");
        } else {
          return console.log("NG...");
        }
      });
    };

    return KeisanForm;

  })();

}).call(this);
