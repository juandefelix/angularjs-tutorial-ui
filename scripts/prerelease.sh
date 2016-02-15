#!/bin/bash

set -e

npm publish
npm version prerelease --no-git-tag-version
