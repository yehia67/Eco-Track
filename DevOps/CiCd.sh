#Test
echo "parsing tests.."
cd ../test/mainTest.js
cd ../simulate/mainSimulator.js

#Commit
echo "enter your Commit"
read Commit
git add .
git commit -m "$Commit"
git push -u origin master

#Deploy 
ipfs add -r ../src/
echo "Press y to deploy"
read ip
if [ "$ip" == "Y" ] || [ "$ip" == "y" ]; then
   echo "input word Y"
else
   echo "The file 'somefile' does not exist."
fi