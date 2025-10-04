import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://starlight.astro.build/zh-cn/manual-setup/
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      // 社交链接配置
      social: [
        { label: '主页', icon: 'open-book', href: 'https://fxj.wiki' },
        { label: 'GitHub', icon: 'github', href: 'https://github.com/bakebakebakebake/astro' },
      ],
      // 配置目录显示级别
      tableOfContents: { 
        minHeadingLevel: 2, 
        maxHeadingLevel: 6 
      },
      // 添加自定义 CSS
      customCss: [
        './src/styles/katex.css',
        './src/styles/custom.css',
      ],
      // Markdown 插件配置（用于代码块高级特性）
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '12px',
          codeFontSize: '0.9rem',
          codePaddingBlock: '1rem',
          codePaddingInline: '1rem',
          frames: {
            frameBoxShadowCssValue: '0 4px 12px rgba(0, 0, 0, 0.1)',
            // Terminal 风格的标题栏
            terminalTitlebarBackground: '#f6f8fa',
            terminalTitlebarBorderBottomColor: 'transparent',
            terminalTitlebarDotsOpacity: '1',
            terminalTitlebarDotsForeground: '#d1d5da',
          },
        },
        defaultProps: {
          showLineNumbers: true,
          wrap: false,
          preserveIndent: true,
          // 强制所有代码块使用 terminal frame
          frame: 'terminal',
        },
        plugins: [],
        // 启用语言标签显示
        useDarkModeMediaQuery: true,
      },
      // 使用 Rapide 主题插件
      plugins: [
        starlightThemeRapide({
          disableThemeSelect: false,
        }),
      ],
      // 自定义组件
      components: {
        Header: './src/components/CustomHeader.astro',
      },
      // 在页面底部注入脚本
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/toc-script.js',
            defer: true,
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '/code-language.js',
            defer: true,
          },
        },
      ],
      // 配置侧边栏
      sidebar: [
        {
          label: '指南',
          items: [
            { label: '开始使用', link: '/guides/getting-started/' },
            { label: 'Rapide 语法指南', link: '/guides/rapide-syntax-guide/' },
            { label: '代码块示例', link: '/guides/code-examples/' },
            { label: 'Rapide 主题测试', link: '/guides/rapide-test/' },
            { label: 'Dirichlet 卷积', link: '/guides/dirichlet-convolution/' },
          ],
        },
      ],
    }),
  ],
  // 全局 Markdown 配置（用于支持 LaTeX）
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});