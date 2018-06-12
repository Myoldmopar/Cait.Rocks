Serializing Thoughts and Concerns and Etc
=========================================

I would really like to wrap my head around the best use of serializers, but I'm not quite there yet.
One thing I have noted from the inter webs is that people say we should have "light" views, and "heavy" serializers.
I know this means that when we need to start customizing the output/processing, we should focus on adding to the
serializers, not the views, as much as possible.  But sometimes, it seems way easier to just override the create method
on the view, for example, because we need access to the request.user.  I'm sure there is a better way to do it through
overriding something in the serializer, but I'm not sure of it yet.