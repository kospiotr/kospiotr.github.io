export default defineAppConfig({
  'gh-url': 'https://github.com/kospiotr/kospiotr.github.io',
  'ui': {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    }
  },
  'menu-main': [
    {
      label: 'Notes',
      icon: 'i-lucide-book',
      to: '/notes'
    }, {
      label: 'Blog',
      icon: 'i-lucide-pencil',
      to: '/blog'
    }, {
      label: 'Projects',
      icon: 'i-lucide-folder',
      to: '/projects'
    }
  ],
  'menu-icons': [
    {
      'label': 'GitHub',
      'to': 'https://github.com/kospiotr',
      'icon': 'i-simple-icons-github',
      'aria-label': 'GitHub'
    },
    {
      'label': 'LinkedIn',
      'to': 'https://www.linkedin.com/in/pkosmowski/',
      'icon': 'i-simple-icons-linkedin',
      'aria-label': 'LinkedIn'
    }
  ]
})
