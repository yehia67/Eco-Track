#!/bin/bash
cd dummyData/
npm start &

cd ../Products-Scanner-EGY-template/ 
node index.js &

cd ../Products-Scanner-ITALY-template/
node index.js &

cd  ../Products-Scanner-China-template/
node index.js &
