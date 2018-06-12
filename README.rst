Cait.Rocks |versionimage|_ |climateimage|_
==========================================

This repo holds the Django-backed and Angular-fronted website for CaitRocks_.

.. _CaitRocks: <https://cait.rocks/>

Python |tstimage|_ |covimage|_
------------------------------

The Python source is tested using the Django's test framework (based on unittest). To find and execute all
the unit tests, just execute ``coverage run manage.py test``. The tests are automatically executed by `Travis
CI <https://travis-ci.org/okielife/okie.life>`__.  After testing is complete, the code coverage status
for those tests are tracked on `Coveralls <https://coveralls.io/github/Myoldmopar/Reciplees?branch=master>`__.

JavaScript |davidimage|_ |codecovimage|_
----------------------------------------

The JavaScript code is tested using Karma.  To execute all the tests, run ``yarn install && yarn test``.  This should
install all the necessary dependencies and execute the karma tool.  Code coverage results can be found in the coverage/
directory.

Documentation |docsimage|_
--------------------------

The project source code is documented using Sphinx.  To build the documentation locally, just change into the docs
directory and execute ``make html``.  The root index.html file should be generated and placed in
``docs/_build/index.html``.  The documentation is also built for every commit over on
`ReadTheDocs <https://caitrocks.readthedocs.io/en/latest/?badge=latest>`__.


Development |ubuntuimage|_
--------------------------

This site is developed on a latest-and-greatest Ubuntu version.
Installation instructions may differ slightly for a different version, distribution, or operating system...
Follow these steps to get a development version up and running:

- Clone this repository:

  - `git clone https://github.com/Myoldmopar/Cait.Rocks`

- Optional, but highly recommended: Create and activate a Python virtual environment:

  - `pyenv virtualenv 2.7.14 caitrocks`
  - `pyenv activate caitrocks`

- Install Python dependencies:

  - `pip install -r requirements.txt`

- Install Node.js runtime:

  - (from https://nodesource.com/blog/installing-node-js-tutorial-ubuntu/)
  - `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
  - `sudo apt-get install -y nodejs`

- Install the Yarn package manager to get all the JS dependencies (front- and back-end)

  - `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
  - `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
  - `sudo apt-get update`
  - `sudo apt-get install yarn`

- Install JavaScript dependencies:

  - `yarn install`

- Create your initial database:

  - `python manage.py migrate`

- Run the server and open the website:

  - `python manage.py runserver`
  - https://localhost:8000

.. |versionimage| image:: https://img.shields.io/github/release/Myoldmopar/Cait.Rocks.svg
.. _versionimage: https://github.com/Myoldmopar/Cait.Rocks/releases/latest

.. |climateimage| image:: https://api.codeclimate.com/v1/badges/ac06f5e99192cac7abbf/maintainability
.. _climateimage: https://codeclimate.com/github/Myoldmopar/Cait.Rocks/maintainability

.. |tstimage| image:: https://travis-ci.org/Myoldmopar/Cait.Rocks.svg?branch=master
.. _tstimage: https://travis-ci.org/Myoldmopar/Cait.Rocks

.. |covimage| image:: https://coveralls.io/repos/github/Myoldmopar/Cait.Rocks/badge.svg?branch=master
.. _covimage: https://coveralls.io/github/Myoldmopar/Cait.Rocks?branch=master

.. |codecovimage| image:: https://codecov.io/gh/Myoldmopar/Cait.Rocks/branch/master/graph/badge.svg
.. _codecovimage: https://codecov.io/gh/Myoldmopar/Cait.Rocks

.. |davidimage| image:: https://david-dm.org/myoldmopar/cait.rocks.svg
.. _davidimage: https://david-dm.org/myoldmopar/cait.rocks

.. |docsimage| image:: https://readthedocs.org/projects/caitrocks/badge/?version=latest
.. _docsimage: https://caitrocks.readthedocs.io/en/latest/?badge=latest

.. |ubuntuimage| image:: https://img.shields.io/badge/Ubuntu-18.04_LTS-orange.svg
.. _ubuntuimage: https://ubuntu.com
