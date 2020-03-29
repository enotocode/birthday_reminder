# birthday_reminder
Single Page Application that helps you remember important dates like birthdays.

Requirements
------------
* Apach server (v 2.4.17) or PHP built-in web server
* PHP (v 5.6.16)
* Internet Browser with support ECMAScript 5/6 (production/dev bundle)
* Composer v 1.4.x
* Node.js v 6.x
* Npm v 3.x
* Webpack v 2.x

Installing
---------
1. Clone the project to "YOUR_DIR".
2. Open CMD or Bash in "YOUR_DIR/birthday_reminder".
3. Run the command "php composer.phar install" (or "composer install") to install back-end dependencies.
4. Run the command "npm install" to install front-end dependencies.
5. To build production bundle with ES5 use the command: "npm run build" or "webpack --config webpack.prod.js".
6. To build development bundle with ES6 use the command: "npm run watch" or "webpack --config webpack.config.js".
7. To start the php web-server open CMD or Bash in "YOUR_DIR/birthday_reminder/src/server/public" and run the command: php -S yourhost:port (ex. localhost:666).
8. If you want to use the Apache web-server, you should setup VirtualHost. If you run Apache on VPS you should change folder permission for user www-data to r-w-x at the log's folder: "YOUR_DIR/birthday_reminder/src/server/Logs". 




