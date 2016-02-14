#!/bin/bash
#echo "//${REGISTRY_URL}/:_authToken=${AUTH_TOKEN}" > "${HOME}/.npmrc"
#npm adduser --registry ${REGISTRY_URL}
npm publish;
npm version prerelease --no-git-tag-version;
