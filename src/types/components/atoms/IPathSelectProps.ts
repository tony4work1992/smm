export interface IPathSelectProps {
  fPath: string;
  status: PathSelectStatus;
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

export enum PathSelectStatus {
  OK = "",
  ERROR = "error"
}
