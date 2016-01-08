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
      window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    _shareFacebook = function() {
      window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
      return false;
    };

    _shareHatena = function() {
      window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
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
