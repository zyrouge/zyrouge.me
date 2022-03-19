@echo off
yarn build && yarn run serve dist -l 8080 --cors
