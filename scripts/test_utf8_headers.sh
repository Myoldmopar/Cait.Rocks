#!/bin/bash

declare -a ERRORS

FILES=`find recipes -type f \( -iname "*.py" ! -iname "__init__.py" ! -path "recipes/migrations/*" \)`
for FILE in ${FILES}; do
  head -2 ${FILE} | grep -qF '# -*- coding: utf-8 -*-'
  RESULT=$?
  if [ "x${RESULT}" == "x0" ]; then
    : # echo "${FILE} OK!"
  else
    ERRORS=("${ERRORS[@]}" "${FILE}")
    # echo "${FILE} ****BAD****"
  fi
done

FILES=`find reciplees -type f \( -iname "*.py" ! -iname "__init__.py" \)`
for FILE in ${FILES}; do
  head -2 ${FILE} | grep -qF '# -*- coding: utf-8 -*-'
  RESULT=$?
  if [ "x${RESULT}" == "x0" ]; then
    : # echo "${FILE} OK!"
  else
    ERRORS=("${ERRORS[@]}" "${FILE}")
    # echo "${FILE} ****BAD****"
  fi
done

if [ ${#ERRORS[@]} -eq 0 ]; then
  # "No errors, hooray"
  exit 0
else
  echo "*** These files failed UTF-8 validation; add # -*- coding: utf-8 -*- to first or second line of all py files"
  printf '%s\n' "${ERRORS[@]}"
  exit 1
fi
