echo enter your Commit
read Commit
git add .
git commit -m "$Commit"
echo commit = $Commit
git push -u origin master

