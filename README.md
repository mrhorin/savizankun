サビ残くん
==========
サービス残業代が計算できるサービス！
## サビ残くんについて
## 開発環境
npm  
bower  
Grunt  

## コンパイル
Grunt,npm,bowerについては各自で調べて下さい。
下記コマンドでhaml,scss,coffeeの変更を検知して自動コンパイル、coffeeはconcatで./js/scripts.jsに結合。
詳細はGruntfile参照。  
```
grunt watch
```
## bower_componentsをpublic/lib/配下へ
grunt-bower-taskを使用。
下記コマンドでbower_componentsをpublic/lib/配下へインストール。
詳細はGruntfileとbower.json参照。  
```
grunt bower:install
```
