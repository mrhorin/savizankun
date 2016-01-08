(function() {
  window.Share = (function() {
    var _setEventListener, _setSelector, _setShareCounter, _shareCountTwitter, _shareFacebook, _shareHatena, _shareTwitter;

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
      return _shareCountTwitter();
    };

    _shareTwitter = function() {
      window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    _shareCountTwitter = function() {
      return $.ajax({
        url: 'http://urls.api.twitter.com/1/urls/count.json',
        dataType: 'jsonp',
        type: 'GET',
        data: {
          url: 'http://savizankun.com'
        },
        success: function(res) {
          console.log(res.count);
          return this.twitter.children[1].innerText = res.count;
        },
        error: function() {
          return console.log("NGGGGGGG");
        }
      });
    };

    _shareFacebook = function() {
      window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
      return false;
    };

    _shareHatena = function() {
      window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    };

    return Share;

  })();

}).call(this);
