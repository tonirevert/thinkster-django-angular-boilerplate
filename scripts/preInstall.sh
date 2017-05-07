#!/bin/bash

sudo apt-get update

# General development essentials
sudo apt-get install -y build-essential ssh git gitk

# Databases: You may not need all of these;
# none are explicit dependencies of other items in this script.
# SQLite and MySQL are pretty generally used for web development,
# and ODBC is just something we use at work.
sudo apt-get install -y sqlite
sudo apt-get install -y python-mysqldb libmysqlclient-dev
sudo apt-get install -y unixodbc unixodbc-dev

# Python development essentials
sudo apt-get install -y python python-setuptools python-dev && sudo easy_install -U pip
sudo apt-get install -y libxml2-dev libxslt-dev  # needed for Python package 'lxml'
sudo apt-get install -y libmysqlclient-dev build-essential #needed for MySQL client

# virtualenv, virtualenvwrapper stuff
sudo pip install virtualenv virtualenvwrapper
echo "
if [ -f /usr/local/bin/virtualenvwrapper.sh ] ; then
  . /usr/local/bin/virtualenvwrapper.sh
fi
export WORKON_HOME=~/Envs
" >> $HOME/.bashrc
. $HOME/.bashrc
mkdir -p $WORKON_HOME
# Now you should be able to do do: `mkvirtualenv foo`

# Extra stuff (essential to me, may not be essential to you)
sudo apt-get -y install trash-cli

# Add personal bin to path
echo '
# Add personal bin to PATH
if [ -d "$HOME/bin" ]; then
  PATH="$HOME/bin:$PATH"
fi
' >> $HOME/.bashrc
