Ingredients
===========

The ingredient model is a simple model containing member fields that are used to describe the ingredient class
(amount, description, etc.).  The members are generally given defaults to allow flexible capabilities.
The only relationship on the ingredient class is a ForeignKey to the Recipe model to allow connecting the
ingredient to a single Recipe instance.  (See notes for more detail on that connection)

.. automodule:: recipes.models.ingredient
    :members:
    :undoc-members:
    :show-inheritance:
    :noindex:
