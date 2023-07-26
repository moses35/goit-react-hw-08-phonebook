export const checkCurrentPage = location => {
  switch (location.pathname) {
    case '/':
      return 'Home';
    case '/contacts':
      return 'contacts';
    case '/register':
      return 'Register';
    case '/login':
      return 'Log In';
    default:
      return '';
  }
};
