Recipe Serializers
==================

The recipe serializer is the most complex of the serializers, which isn't saying a lot, as it's not really that complex.
The recipe serializer is based on the Recipe model, so most operations flow easily without additional code, but there
are a few additions:
 - The serializer has an explicit recipe_type field which is used to get the formatted representation of the recipe_type
 - There are serializer method fields for getting read-only versions of the creator and absolute_url
 - There is an ingredients StringRelatedField, which is a read-only field used to show the ingredients connected with
   this recipe.  This works easily because the related_name on the ForeignKey defined on the Ingredient model is
   "ingredients".

.. automodule:: recipes.serializers.recipe
    :members:
    :undoc-members:
    :show-inheritance:
    :noindex:
