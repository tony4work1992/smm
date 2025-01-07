# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

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
