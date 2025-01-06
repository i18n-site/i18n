#!/usr/bin/env bash

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -ex

./genCapnp.coffee
exec bin/workerd compile srv.capnp >bin/srv
