import React from 'react';
import './App.css';
import InputModelOrganism from './components/organisms/smv';

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
}
const App: React.FC = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <InputModelOrganism data={data} />
      <div style={{ width: 400 }}></div>
      <InputModelOrganism data={data} />
    </div>
  );
};

export default App;