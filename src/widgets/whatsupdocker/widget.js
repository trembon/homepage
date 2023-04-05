import { asJson, jsonArrayFilter } from "utils/proxy/api-helpers";
import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}api/{endpoint}",
  proxyHandler: genericProxyHandler,

  mappings: {
    "whatsupdocker": {
      endpoint: "containers",
      map: (data) => ({
        updates: jsonArrayFilter(data, (item) => item?.updateAvailable === true).length,
        total: asJson(data).length,
      }),
    },
  },
};

export default widget;
