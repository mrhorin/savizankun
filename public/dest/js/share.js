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
