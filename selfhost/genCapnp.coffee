#!/usr/bin/env coffee

> @3-/read
  @3-/write
  path > join
  squirrelly:Sqrl

compatibilityDate = '2024-12-30'

ROOT = import.meta.dirname

capnp = Sqrl.render(
  read(join(ROOT, 'srv.tmpl.capnp'))
  {
    compatibilityDate
    li: [...Object.entries(await import('./jsPort.js'))]
  }
  {
    autoEscape: false
  }
)

write(
  join(ROOT, 'srv.capnp')
  capnp
)
