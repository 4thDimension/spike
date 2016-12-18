Source({ name:"mongo", namespace: "nexthome./(tenants|properties)/"})
  .transform({ filename: "transformers/passthrough_and_log.js", namespace: "nexthome./.*/" })
  .save({ name:"es", namespace: "nexthome.tenants" })
  .save({ name:"es", namespace: "nexthome.properties" });
