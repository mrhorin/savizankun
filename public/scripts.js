(function() {
  window.KeisanForm = (function() {
    function KeisanForm() {}

    return KeisanForm;

  })();

}).call(this);

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

(function() {
  window.Main = (function() {
    function Main() {
      this.shareObj = new window.Share();
      this.keisanFormObj = new window.KeisanForm();
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
