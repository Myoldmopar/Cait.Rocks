# -*- coding: utf-8 -*-
from django.shortcuts import render
from rest_framework import status
from subprocess import check_output, CalledProcessError
from django.conf import settings


def handle404(request):
    return render(request, 'common/404.html', status=status.HTTP_404_NOT_FOUND)


def server_version_data(request):
    # get the actual server version
    settings_version = settings.VERSION

    # get the current Git sha
    try:
        git_sha = check_output(['git', 'rev-parse', 'HEAD']).strip()
        # git_sha = git_sha[0:10]
    except CalledProcessError:  # pragma: no cover -- This would be crazy to try to test...
        git_sha = '<Could not get current git sha, does this server not have Git?>'
    except OSError:  # pragma: no cover -- This would be crazy to try to test...
        git_sha = '<Could not get current git sha, does this server not have Git?>'

    # get a flag for whether there are local uncommitted changes
    working_dir_clean_message = 'Clean'
    try:
        local_diff_status = check_output(['git', 'status', '--porcelain'])
        if local_diff_status != u'':  # pragma: no cover
            working_dir_clean_message = 'Local uncommitted changes!'
    except CalledProcessError:  # pragma: no cover -- This would be crazy to try to test...
        working_dir_clean_message = '<Could not check working directory cleanliness, does this server not have Git?>'
    except OSError:  # pragma: no cover -- This would be crazy to try to test...
        git_sha = '<Could not check working directory cleanliness, does this server not have Git?>'

    return render(
        request,
        'common/about.html',
        context={
            'version': settings_version,
            'git_sha': git_sha,
            'dirty_message': working_dir_clean_message,
        }
    )
