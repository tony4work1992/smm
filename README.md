# Loi khong change duoc datatype.


```js

const App: React.FC = () => {
  const [fromModel, setFromModel] = React.useState<IInputModelTree[]>([]);
  const [toModel, setToModel] = React.useState<IInputModelTree[]>([]);

  return (
    // <div style={{ display: "flex", flexDirection: "row" }}>
    <Flex gap={10} style={{ padding: 10, border: '3px solid #0783d3', borderRadius: 5 }}>
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
        onPathUpdate={function (data: IPathMapperData[]): void {
          console.log(data)
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
```
