#!/usr/bin/env bash -e
ARTIFACT_NAME=heapdump

if [[ -z $1 || -z $2 ]]; then
  echo "Please specify semver type and directory containing $ARTIFACT_NAME.tgz.zip"
  exit 255
fi

SEMVER_TYPE=$1
ARTIFACT_PATH=$2

#Clear any old files
rm -rf "$ARTIFACT_PATH/$ARTIFACT_NAME"
rm -rf "$ARTIFACT_PATH/$ARTIFACT_NAME.tgz"

unzip "$ARTIFACT_PATH/$ARTIFACT_NAME.tgz.zip" -d "$ARTIFACT_PATH"
mkdir "$ARTIFACT_PATH/$ARTIFACT_NAME"
tar -xzvf "$ARTIFACT_PATH/$ARTIFACT_NAME.tgz" -C "$ARTIFACT_PATH/$ARTIFACT_NAME"

echo "Publishing module"
npm version "$SEMVER_TYPE" --prefix "$ARTIFACT_PATH/$ARTIFACT_NAME/package"
npm publish "$ARTIFACT_PATH/$ARTIFACT_NAME/package"
