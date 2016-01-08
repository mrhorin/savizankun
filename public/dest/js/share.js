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
      var _url, h_size, l_position, t_position, w_size;
      _url = "http://twitter.com/share?url=http://savizankun.com&text=サビ残くん -あなたの残業代計算します！";
      w_size = 650;
      h_size = 450;
      l_position = Number((window.screen.width - w_size) / 2);
      t_position = Number((window.screen.height - h_size) / 2);
      window.open(_url, 'Twitter', "width=" + w_size + ", height=" + h_size + ", left=" + l_position + ", top=" + t_position + ", menubar=no, toolbar=no, scrollbars=yes");
      return false;
    };

    _shareFacebook = function() {
      var _url, h_size, l_position, t_position, w_size;
      _url = "http://www.facebook.com/sharer.php?u=http://savizankun.com&t=サビ残くん -あなたの残業代計算します！-";
      w_size = 550;
      h_size = 450;
      l_position = Number((window.screen.width - w_size) / 2);
      t_position = Number((window.screen.height - h_size) / 2);
      window.open(_url, 'Facebook', "width=" + w_size + ", height=" + h_size + ", left=" + l_position + ", top=" + t_position + ", menubar=no, toolbar=no, scrollbars=yes");
      return false;
    };

    _shareHatena = function() {
      var _url, h_size, l_position, t_position, w_size;
      _url = "http://b.hatena.ne.jp/add?mode=confirm&title='サビ残くん -あなたの残業代計算します！-'&url=http://savizankun.com";
      w_size = 650;
      h_size = 450;
      l_position = Number((window.screen.width - w_size) / 2);
      t_position = Number((window.screen.height - h_size) / 2);
      window.open(_url, 'Hatena', "width=" + w_size + ", height=" + h_size + ", left=" + l_position + ", top=" + t_position + ", menubar=no, toolbar=no, scrollbars=yes");
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
