(function() {
  window.Valid = (function() {
    function Valid(keisan) {
      this.keisan = keisan;
    }

    Valid.prototype.check24hOver = function() {
      if (this.keisan.rodoTime["zitu"] + this.keisan.formValues["kyukei"] / 60 < 24) {
        return true;
      } else {
        return false;
      }
    };

    Valid.prototype.check0Syotei = function() {
      if (this.keisan.rodoTime["syotei"] > 0) {
        return true;
      } else {
        return false;
      }
    };

    return Valid;

  })();

}).call(this);
