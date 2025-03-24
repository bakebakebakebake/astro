import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { fileURLToPath } from 'url';
import path from 'path';
import mdx from '@astrojs/mdx';
// 导入 astroExpressiveCode（如果存在）
import astroExpressiveCode from 'astro-expressive-code';

// 获取项目根目录的绝对路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Markdown 配置
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  // 添加 Vite 配置
  vite: {
    server: {
      fs: {
        // 允许 Vite 访问更广泛的文件路径
        allow: [
          // 允许访问整个项目目录
          __dirname,
          // 允许访问上级目录的 node_modules
          path.resolve(__dirname, '../node_modules'),
          // 允许访问当前目录的 node_modules
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    },
    // 确保 KaTeX 字体被正确复制到构建目录
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.match(/\.(woff|woff2|ttf|otf)$/)) {
              return 'assets/fonts/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  },
  // 修正集成顺序，确保 astroExpressiveCode 在 mdx 之前
  integrations: [
    // 如果存在 astroExpressiveCode，先添加它
    astroExpressiveCode ? astroExpressiveCode() : null,
    mdx(),
    starlight({
      title: 'My docs',
      // 添加社交链接
      social: {
        github: 'https://github.com/bakebakebakebake/astro',
      },
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
      plugins: [starlightThemeRapide()],
      // 移除自定义主题切换组件，使用 starlight-theme-rapide 提供的
      components: {
        // 移除 ThemeSelect 配置，避免与 starlight-theme-rapide 冲突
      },
    }),
  ].filter(Boolean), // 过滤掉 null 值
});