# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from reciplees import urls


class Command(BaseCommand):
    help = 'Lists all the currently found URL patterns in the project'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

    def show_urls(self, urllist, depth=0):
        for entry in urllist:
            print("  " * depth, entry.regex.pattern)
            if hasattr(entry, 'url_patterns'):
                self.show_urls(entry.url_patterns, depth + 1)

    def handle(self, *args, **options):
        self.show_urls(urls.urlpatterns)
