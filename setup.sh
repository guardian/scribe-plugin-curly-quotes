npm install
bower install

# Download the selenium JAR
SELENIUM_VERSION=2.41.0
SELENIUM_MINOR_VERSION=2.41

LOCAL_SELENIUM=vendor/selenium-server-standalone-$SELENIUM_VERSION.jar

mkdir -p vendor

if [ ! -e $LOCAL_SELENIUM ]
then
    wget -O $LOCAL_SELENIUM \
	https://selenium-release.storage.googleapis.com/$SELENIUM_MINOR_VERSION/selenium-server-standalone-$SELENIUM_VERSION.jar
fi

command -v chromedriver >/dev/null 2>&1 || echo 'Please install chromedriver for your os'; exit 1;
