# thinkster-django-angular-boilerplate

## Installation

*NOTE: Requires [virtualenv](http://virtualenv.readthedocs.org/en/latest/),
[virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/),
[Node.js](http://nodejs.org/).* and [mysql-server](https://dev.mysql.com/doc/refman/5.7/en/linux-installation.html) with a database created for the project.

* Fork this repository.
* `$ git clone git@github.com:<your username>/thinkster-django-angular-boilerplate.git`
* `$ mkvirtualenv thinkster-djangular`
* `$ cd thinkster-django-angular-boilerplate/`
* `$ ./scripts/preInstall.sh`
* `$ pip install -r requirements.txt`
* `$ npm install -g bower`
* `$ npm install`
* `$ bower install`
* `edit thinkster_django_angular_bolierplate/settings.py to set-up database name, user and password`
* `$ python manage.py syncdb`
* `$ python manage.py runserver`

* Per a fer us del codi sass cal llançar aquest comando:
sass --watch styles.scss:styles.css