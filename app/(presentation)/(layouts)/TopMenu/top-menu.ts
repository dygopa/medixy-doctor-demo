export interface FormattedMenu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
  pathname: string;
  icon: any;
  title: string;
}