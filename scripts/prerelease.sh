npm publish;
npm version prerelease --no-git-tag-version;
git add package.json;
git commit -m "Update prerelease version";
git push origin master;