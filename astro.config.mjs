import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';

export default defineConfig({
  // Markdown 配置
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  // 集成配置
  integrations: [
    // 配置代码高亮
    astroExpressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        lineHeight: '1.1',
        codePaddingBlock: '0.3rem',
        codeFontSize: '0.9rem',
      },
      showLineNumbers: true,
    }),
    mdx(),
    starlight({
      title: 'My Docs',
      // 更新social配置格式，使用href而不是link
      social: [
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
      // 使用主题插件
      plugins: [
        starlightThemeRapide({
          disableThemeSelect: true,
        }),
      ],
      // 组件配置
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
        Header: './src/components/CustomHeader.astro',
      },
      // 配置侧边栏
      sidebar: [
        {
          label: '指南',
          items: [
            { label: '开始使用', link: '/guides/getting-started/' },
            { label: 'Dirichlet卷积', link: '/guides/dirichlet-convolution/' },
          ],
        },
      ],
    }),
  ],
});