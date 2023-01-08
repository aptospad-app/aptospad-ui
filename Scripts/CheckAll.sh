#!/usr/bin/sh

tsc --noEmit && npx eslint './src'
npx madge --circular --extensions ts ./src