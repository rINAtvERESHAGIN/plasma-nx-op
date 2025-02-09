interface MenuItem {
  label: string;
  route: string;
}

export interface MenuButtonWithPanelProps {
  buttonText: string;
  menuItems: MenuItem[];
}
