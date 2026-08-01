#!/bin/bash


rm -rf dist.zip
zip -r dist.zip dist/*
scp dist.zip root@web:/root/
ssh root@web << 'EOF'
cd /root/
rm -rf /root/dist
unzip -o dist.zip -d /root/
rm -rf /usr/share/nginx/html/dist
mv /root/dist/* /var/www/html/
EOF