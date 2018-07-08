# -*- coding: utf-8 -*-
import os

from django.shortcuts import render
from rest_framework import status
from subprocess import check_output, CalledProcessError
from django.conf import settings


def handle404(request):
    """
    This view is called by Django when the a GET request is made to a page that does not exist.
    It renders a static page but isn't amenable to making into a simple TemplateView because it must return a 404

    :param request: An HTTP request
    :return: A rendered HTML response
    """
    return render(request, 'common/404.html', status=status.HTTP_404_NOT_FOUND)


def server_version_data(request):
    """
    This function provides the "About" page response, including server information

    :param request: An HTTP request
    :return: A rendered HTML response
    """
    # get the actual server version
    settings_version = settings.VERSION
    git_sha = ''
    git_sha_found = False
    git_dirty_message = ''
    working_dir_clean = True

    # get the current Git sha
    try:
        git_sha = check_output(['git', 'rev-parse', 'HEAD']).decode("utf-8").strip()
        git_sha_found = True
        local_diff_status = check_output(['git', 'status', '--porcelain']).decode("utf-8")
        if local_diff_status != u'':  # pragma: no cover
            working_dir_clean = False
    except CalledProcessError:  # pragma: no cover -- Something failed, try getting it from the ENV...
        if 'SOURCE_VERSION' in os.environ:
            git_sha = os.environ['SOURCE_VERSION']
            git_sha_found = True
            # if this still didn't work, it will just remain False

    if git_sha_found:  # pragma: no cover
        if len(git_sha) >= 10:
            git_sha_message = git_sha[:10]
        else:
            git_sha_message = git_sha  # default to just whatever is happening then
        if not working_dir_clean:
            git_dirty_message = ' (Working directory dirty)'
    else:  # pragma: no cover
        git_sha_message = 'Could not get any Git information'

    return render(
        request,
        'common/about.html',
        context={
            'version': settings_version,
            'git_sha': git_sha_message,
            'git_dirty_message': git_dirty_message
        }
    )
