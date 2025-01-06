#!/usr/bin/env bash

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -ex

if [ ! -x "bin/workerd" ]; then
  ./init.sh
fi

./genCapnp.coffee

exec bin/workerd serve srv.capnp
