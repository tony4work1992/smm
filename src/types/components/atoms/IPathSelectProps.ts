export interface IPathSelectProps {
  fPath: string;
  options: PathSelectOption[];
  events: {
    onChange: (params: { fPath: string }) => void;
    onSearch: (value: string) => void;
  };
}

export interface PathSelectOption {
  value: string;
  label: string;
}
