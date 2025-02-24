import {ImageSourcePropType, ViewStyle} from 'react-native';
import {chainNameType} from 'src/helpers/ChainHelper';

export type DropdownProps = {
  style?: ViewStyle;
  data: DropdownOption[];
  onChange: (data: DropdownOption) => void;
  value: string;
};

export type DropdownOption = {
  value: string;
  label: string;
  icon: ImageSourcePropType | null;
};
