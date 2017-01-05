cd ../webroot/deploy_packages
sh deploy.sh

cd ../
mkdir download
cd download
rm -f aip-antiporn-java-sdk-1.0.zip  aip-face-java-sdk-1.0.zip  aip-nlp-java-sdk-1.0.zip  aip-ocr-java-sdk-1.0.zip
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-antiporn-java-sdk-1.0.zip
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-face-java-sdk-1.0.zip
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-nlp-java-sdk-1.0.zip 
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-ocr-java-sdk-1.0.zip
rm -f aip-antiporn-php-sdk-1.0.zip   aip-face-php-sdk-1.0.zip   aip-nlp-php-sdk-1.0.zip   aip-ocr-php-sdk-1.0.zip
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-antiporn-php-sdk-1.0.zip
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-face-php-sdk-1.0.zip
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-nlp-php-sdk-1.0.zip 
wget ftp://szwg-qatest-dpf007.szwg01.baidu.com/home/work/yifei/ai/sdk/aip-ocr-php-sdk-1.0.zip
