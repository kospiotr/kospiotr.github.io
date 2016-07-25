apt-get install ruby2.0 ruby2.0-dev
apt-get install make gcc nodejs
rm /usr/bin/ruby
rm /usr/bin/gem
ln -s /usr/bin/ruby2.0 /usr/bin/ruby
ln -s /usr/bin/gem2.0 /usr/bin/gem
gem install jekyll --no-rdoc --no-ri
gem install github-pages --no-rdoc --no-ri

