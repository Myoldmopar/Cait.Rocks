Missing ForeignKey to User on Ingredient model
==============================================

The ingredient model does not have a foreign key to a User.  This seems like a problem given all the other
ownership stuff we've put in.  I think we need to add it.  It will probably be a super light addition once I figure
out the serializer stuff.
