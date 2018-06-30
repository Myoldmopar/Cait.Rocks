Recipes
=======

The recipe model defines a recipe by defining new fields for title, directions, etc., defining relationships to User
instances for tracking who owns the recipe, and relying on Ingredient instances to be back referenced to recipes
through foreign keys.  The recipe model has a function called get_absolute_url which is used to retrieve the url of the
current recipe's recipe_detail page.

.. automodule:: recipes.models.recipe
    :members:
    :undoc-members:
    :show-inheritance:
    :noindex:
