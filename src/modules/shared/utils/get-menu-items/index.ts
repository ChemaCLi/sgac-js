export async function getMenuItems(userSession) {
  // Simulación de datos. Puedes conectarlo con una base de datos o API.
  return [
    {
      label: 'Dashboard',
      url: '/dashboard',
      iconName: 'home',
      subItems: [],
    },
    {
      label: 'Settings',
      url: '/settings',
      iconName: 'settings',
      subItems: [
        { label: 'Profile', url: '/settings/profile', iconName: 'user' },
        { label: 'Account', url: '/settings/account', iconName: 'account' },
      ],
    },
    {
      label: 'Help',
      url: '/help',
      iconName: 'help',
      subItems: [],
    },
  ];
}
