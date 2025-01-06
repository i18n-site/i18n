using Workerd = import "/workerd/workerd.capnp";

const config :Workerd.Config = (
  services = [
{{@each(it.li) => i}}(name = "{{i[0]}}", worker = .{{i[0]}}Js),
{{/each}}
  ],

  sockets = [
    {{@each(it.li) => i}}( 
      name = "http",
      address = "*:{{i[1]}}",
      http = (),
      service = "{{i[0]}}"
    ),{{/each}}
  ]
);

{{@each(it.li) => i}}
const {{i[0]}}Js :Workerd.Worker = (
  compatibilityDate = "{{it.compatibilityDate}}",
  modules = [
    (name = "worker", esModule = embed "js/{{i[0]}}.js")
  ],
);
{{/each}}

