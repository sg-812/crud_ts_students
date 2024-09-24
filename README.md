1. npm init 
2. npm install typescript --save-dev /    npm i typescript -D
3. npx tsc --init ( it will generate config file ) 

As in package.json   "type": "module", in added, so import will be done using import of js, not the require

[Notes:  in config file strict will add the data type strictness. 
outDir is used for deploying purpose, when you will run the command npm run dev, it will create a dist folder]

util is used for common functions.


Work flow:

server-> Routes -> Controller -> Repository 

For database configuration config folder in app

For datatype setup  Interface folder

For common functions utlis of helper