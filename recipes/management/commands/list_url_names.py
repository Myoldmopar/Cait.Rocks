# -*- coding: utf-8 -*-
from django.conf import settings
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Lists all the currently found URL names in the project'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.url_names = []

    def load_url_pattern_names(self, patterns):
        """Retrieve a list of urlpattern names"""
        for pat in patterns:
            if pat.__class__.__name__ == 'RegexURLResolver':  # load patterns from this RegexURLResolver
                self.load_url_pattern_names(pat.url_patterns)
            elif pat.__class__.__name__ == 'RegexURLPattern':  # load name from this RegexURLPattern
                if pat.name is not None and pat.name not in self.url_names:
                    print(pat.name)

    def handle(self, *args, **options):
        root_urlconf = __import__(settings.ROOT_URLCONF)
        self.load_url_pattern_names(root_urlconf.urls.urlpatterns)
