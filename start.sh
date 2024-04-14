#!/usr/bin/env zsh
fnm use 21;
pm2 start npm --name "Card Race" -- run preview
