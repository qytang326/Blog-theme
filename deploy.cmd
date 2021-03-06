rm -rf public

rm -rf exampleSite/public

cd exampleSite

hugo --baseUrl="https://qytang326.coding.me/Blog-theme" -t Blog-Theme-Hugo

cd public

git init

git add .

git commit -m "%DATE%: %1"

git remote add coding git@git.coding.net:qytang326/Blog-theme.git

git branch coding-pages

git checkout coding-pages

git push -u -f coding coding-pages

cd ../..

rm -rf examplesite/public

cd examplesite/

hugo --baseUrl="https://theme.quanyin.ml" -t Blog-Theme-Hugo

cd public

git init

git add .

git commit -m "%DATE%: %1"

git remote add origin git@github.com:qytang326/Blog-theme.git

git branch gh-pages

git checkout gh-pages

git push -u -f origin gh-pages

rm -rf public

cd ../..

pause
