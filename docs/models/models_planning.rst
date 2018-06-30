Planning
========

The planning model defines the monthly recipe plan.  Each day of the month has two recipe placeholder spots.  Initially
this was left more general, but the complexity felt through the roof for what I was trying to accomplish.  I've now got
it down to this relatively small list of fields.  I understand the field list is still pretty lengthy, and that adding
more fields to do another recipe each day is a major burden at this point, but I have at least reduced the code required
to reference each recipe field down using some getattr and setattr magic.

.. automodule:: recipes.models.planning
    :members:
    :undoc-members:
    :show-inheritance:
    :noindex:
