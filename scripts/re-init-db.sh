#!/usr/bin/env bash

rm -f old.db.sqlite3
mv db.sqlite3 old.db.sqlite3
python manage.py migrate
python manage.py re_init_db
