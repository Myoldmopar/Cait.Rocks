ForeignKey to Recipe on Ingredient model
========================================

The ingredient model class has a ForeignKey member to a Recipe model instance.  This means the ingredient is assigned
to a single recipe class forever.  This is a bit silly, as an ingredient should just be standalone and potentially
applied to multiple recipes. Right?  Wait no.  That could be bad.  If an ingredient gets altered in one recipe, you
don't want it being altered in all the recipes that reference it.  OK, it's good.  Good to talk things through.  Thanks
Mr. Duck.
