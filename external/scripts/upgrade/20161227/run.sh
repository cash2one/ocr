ODP_HOME=/home/web-ext/

cp php-5.4.ral.so ${ODP_HOME}/php/ext -f
cd ${ODP_HOME}/php/ext
mv ral.so.2.0.19 ral.so.2.0.19.bak
rm ral.so 

ln -s php-5.4.ral.so ral.so

cd ${ODP_HOME}/php/sbin
./php-fpm restart
