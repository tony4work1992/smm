import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./SmartModelMapper.tsx";
import { PathSelectStatus } from "./lib/main.ts";

const data = {
  user: {
    metadata: {
      datatype: "Object",
      fieldname: "user",
      defaultValue: "",
    },
    fields: {
      personal: {
        metadata: {
          datatype: "Object",
          fieldname: "personal",
          defaultValue: "",
        },
        fields: {
          name: {
            metadata: {
              datatype: "String",
              fieldname: "name",
              defaultValue: "Anonymous",
            },
            fields: {},
          },
          age: {
            metadata: {
              datatype: "Number",
              fieldname: "age",
              defaultValue: "0",
            },
            fields: {},
          },
        },
      },
      contact: {
        metadata: {
          datatype: "Object",
          fieldname: "contact",
          defaultValue: "",
        },
        fields: {
          email: {
            metadata: {
              datatype: "String",
              fieldname: "email",
              defaultValue: "example@example.com",
            },
            fields: {},
          },
          phone: {
            metadata: {
              datatype: "Object",
              fieldname: "phone",
              defaultValue: "000-000-0000",
            },
            fields: {
              personal: {
                metadata: {
                  datatype: "Object",
                  fieldname: "personal",
                  defaultValue: "",
                },
                fields: {
                  name: {
                    metadata: {
                      datatype: "String",
                      fieldname: "name",
                      defaultValue: "Anonymous",
                    },
                    fields: {},
                  },
                  age: {
                    metadata: {
                      datatype: "Number",
                      fieldname: "age",
                      defaultValue: "0",
                    },
                    fields: {},
                  },
                },
              },
              contact: {
                metadata: {
                  datatype: "Object",
                  fieldname: "contact",
                  defaultValue: "",
                },
                fields: {
                  email: {
                    metadata: {
                      datatype: "String",
                      fieldname: "email",
                      defaultValue: "example@example.com",
                    },
                    fields: {},
                  },
                  phone: {
                    metadata: {
                      datatype: "String",
                      fieldname: "phone",
                      defaultValue: "000-000-0000",
                    },
                    fields: {},
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Mapped paths for from and to model
const mappedPaths = [
  {
    from: { fPath: "user.personal.name", status: PathSelectStatus.OK },
    to: { fPath: "user.personal.name", status: PathSelectStatus.OK },
  },
  {
    from: { fPath: "user.personal.age", status: PathSelectStatus.OK },
    to: { fPath: "user.personal.age", status: PathSelectStatus.OK },
  },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App from={data} to={data} mapping={mappedPaths} />
  </StrictMode>,
);
