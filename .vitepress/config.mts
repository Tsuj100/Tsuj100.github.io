import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'tsuj100',
  description: 'A blog',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'document', link: '/docs/git-worktree命令详细使用方法及什么情况下会使用' }
    ],

    sidebar: [
      {
        text: 'document',
        items: [
          { text: 'git-worktree命令', link: '/docs/git-worktree命令详细使用方法及什么情况下会使用' },
          { text: '前端依赖缓存位置配置', link: '/docs/前端依赖缓存位置配置' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
