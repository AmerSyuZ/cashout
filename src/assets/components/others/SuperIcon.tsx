/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author        Version         Remarks
------------------------------------------------------------------------------------------
01/11/2023            AmerSyu       1.0.0           - Base version

*/

// library
import allIcons from "../../utilities/iconConfigs";

export interface superIconProps {
  id?: string;
  iconName: string;
  onPress?: () => void;
  styles?: any;
}

const SuperIcon = ({
  id = "",
  iconName,
  onPress,
  styles = {},
}: superIconProps) => {
  const Icon = allIcons[iconName];

  return (
    <Icon
      onClick={() => {
        onPress();
      }}
      id={`${id}_SuperIcon`}
      css={{ ...styles }}
    />
  );
};

export default SuperIcon;
