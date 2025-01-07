import { Flex } from "antd";
import React from "react";
import "./SmartModelMapper.css";
import SmartModelVisualizer from "./components/organisms/smv";
import SmartPathMapper from "./components/organisms/spm";
import { IPathMapperData } from './types';
import { IInputModelTree } from "./types/IInputModelTree";

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
              datatype: "String",
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
    from: { fPath: "user.personal.name" },
    to: { fPath: "user.personal.name" },
  },
  { from: { fPath: "user.personal.age" }, to: { fPath: "user.personal.age" } },
];

const SmartModelMapper: React.FC = () => {
  const [fromModel, setFromModel] = React.useState<IInputModelTree[]>([]);
  const [toModel, setToModel] = React.useState<IInputModelTree[]>([]);

  return (
    // <div style={{ display: "flex", flexDirection: "row" }}>
    <Flex gap={10} style={{ padding: 10, border: '2px solid #4848d3', borderRadius: 5 }}>
      <SmartModelVisualizer
        data={data}
        onModelChange={(params) => {
          setFromModel(params.data);
        }}
      />
      <SmartPathMapper
        data={mappedPaths}
        fromModel={fromModel}
        toModel={toModel}
        onPathUpdate={(data: IPathMapperData[]) => {
          console.log(data)
          // Insert logic here
          throw new Error("Function not implemented.");
        }}
      />
      <SmartModelVisualizer
        data={data}
        onModelChange={(params) => {
          setToModel(params.data);
        }}
      />
    </Flex>
  );
};

export default SmartModelMapper;
