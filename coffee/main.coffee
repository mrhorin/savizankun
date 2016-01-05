# Twitterボタンクリック時
shareTwitter = ->
  window.open(this.href, 'Twitter', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
  return false
# FBボタンクリック時
shareFacebook = ->
  window.open(this.href, 'Faceboo', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1')
  return false
# はてブボタンクリック時
shareHatena = ->
  window.open(this.href, 'Hatena', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes')
  return false
