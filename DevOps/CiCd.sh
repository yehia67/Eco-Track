#Test


#Commit
echo enter your Commit
read Commit
git add .
git commit -m "$Commit"
git push -u origin master

#Deploy 
ipfs add -r ../src/
