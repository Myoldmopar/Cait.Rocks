Cait.Rocks
==========

This repo holds the Django-backed and Angular-fronted website for CaitRocks_.

.. _CaitRocks: <https://cait.rocks/>

Python |tstimage|_ |covimage|_
------------------------------

The Python source is tested using the Django's test framework (based on unittest). To find and execute all
the unit tests, just execute ``python manage.py test``. The tests are automatically executed by `Travis
CI <https://travis-ci.org/okielife/okie.life>`__.  After testing is complete, the code coverage status
for those tests are tracked on `Coveralls <https://coveralls.io/github/Myoldmopar/Reciplees?branch=master>`__.

JavaScript |codecovimage|_ |davidimage|_
----------------------------------------

The JavaScript code is tested using Karma.  To execute all the tests, run ``npm install && npm test``.  This should
install all the necessary dependencies and execute the karma tool.  Code coverage results can be found in the coverage/
directory.

.. |tstimage| image:: https://travis-ci.org/Myoldmopar/Cait.Rocks.svg?branch=master
.. _tstimage: https://travis-ci.org/Myoldmopar/Cait.Rocks

.. |covimage| image:: https://coveralls.io/repos/github/Myoldmopar/Cait.Rocks/badge.svg?branch=master
.. _covimage: https://coveralls.io/github/Myoldmopar/Cait.Rocks?branch=master

.. |codecovimage| image:: https://codecov.io/gh/Myoldmopar/Cait.Rocks/branch/master/graph/badge.svg
.. _codecovimage: https://codecov.io/gh/Myoldmopar/Cait.Rocks

.. |davidimage| image:: https://david-dm.org/myoldmopar/cait.rocks.svg
.. _davidimage: https://david-dm.org/myoldmopar/cait.rocks