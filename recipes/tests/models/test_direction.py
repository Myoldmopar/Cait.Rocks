from django.test import TestCase

from recipes.models.direction import Direction


class DirectionModelConstructionTests(TestCase):

    def test_direction_short_string(self):
        direction = Direction(full_directions='stir')
        self.assertEqual(str(direction), 'stir')

    def test_direction_long_string(self):
        direction = Direction(full_directions='stirdjflsdjfdsjflkjsdfkjsdilfkjdljflkjdslfkjsdlfkjsdkfjlkdsjflkdsjflkjs')
        self.assertEqual(str(direction), 'stirdjflsdjfdsjflkjsdfkjsdilfkjdljflkjds')
