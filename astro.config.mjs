import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My docs',
      // 添加社交链接
      social: {
        github: 'https://github.com/bakebakebakebake/astro',
      },
      // 移除 i18n 相关配置
      // defaultLocale: 'zh-cn',
      // locales: {
      //   'en': {
      //     label: 'English',
      //   },
      //   'zh-cn': {
      //     label: '简体中文',
      //   },
      // },
      plugins: [starlightThemeRapide()],
      // 保留主题切换组件
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
    }),
  ],
});