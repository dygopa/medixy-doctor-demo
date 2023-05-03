import { FormattedMenu } from "(presentation)/(layouts)/SideMenu/side-menu";
import { slideDown, slideUp } from "(presentation)/(utils)/helper";
import { Dispatch, SetStateAction } from "react";

const linkTo = (
  menu: FormattedMenu,
  setActiveMobileMenu: Dispatch<SetStateAction<boolean>>
) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  }
};

const enter = (el: HTMLElement) => {
  slideDown(el, 300);
};

const leave = (el: HTMLElement) => {
  slideUp(el, 300);
};

export { linkTo, enter, leave };
