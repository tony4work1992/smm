interface ILockSwitchProps {
  resizeable: boolean;
  onLockChange: (
    resizeable: boolean,
    e: React.MouseEvent | React.KeyboardEvent,
  ) => void;
}

export default ILockSwitchProps;
