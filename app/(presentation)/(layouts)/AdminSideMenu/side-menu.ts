import { slideDown, slideUp } from "(presentation)/(utils)/helper";

export interface FormattedMenu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
  title: string;
  pathname: string;
  icon: any;
  ignore: boolean;
}

const enter = (el: HTMLElement) => {
  slideDown(el, 300);
};

const leave = (el: HTMLElement) => {
  slideUp(el, 300);
};

export { enter, leave };
