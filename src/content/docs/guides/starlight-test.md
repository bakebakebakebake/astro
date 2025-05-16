---
title: Starlight功能测试
description: 测试Starlight主题的各种功能是否正常工作
---

# Starlight功能测试页面

本页面用于测试Starlight主题的各种功能是否正常工作，包括旁白、代码块、LaTeX公式和组件等。

## 旁白(Aside)测试

以下是不同类型的旁白组件测试：

:::note
这是一个普通的提示信息。
:::

:::tip
这是一个提示信息，提供有用的技巧。
:::

:::caution
这是一个警告信息，提醒用户注意特定事项。
:::

:::danger
这是一个危险提示，警告用户可能的严重后果。
:::

## 代码块测试

以下是代码块的示例：

```python
# 这是一个Python代码示例
def hello_world():
    print("Hello, Starlight!")
    
hello_world()
```

```javascript
// 这是一个JavaScript代码示例
function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(5, 3)); // 输出: 8
```

行内代码 `const greeting = "Hello";`

## LaTeX公式测试

以下是一些数学公式的例子：

行内公式: $E=mc^2$

行间公式:

$$
\frac{d}{dx}\left( \int_{a}^{x} f(u)\,du\right)=f(x)
$$

复杂一点的公式:

$$
\begin{aligned}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{aligned}
$$

## 组件测试

以下是使用Starlight组件的示例：

import { Card, CardGrid } from '@astrojs/starlight/components';

### 卡片组件

<Card title="单独的卡片示例">
  这是一个独立的卡片组件，用于展示特定的信息。
</Card>

### 卡片网格

<CardGrid>
  <Card title="第一个功能" icon="pencil">
    这是描述第一个功能的卡片。
  </Card>
  <Card title="第二个功能" icon="add">
    这是描述第二个功能的卡片。
  </Card>
  <Card title="第三个功能" icon="setting">
    这是描述第三个功能的卡片。
  </Card>
  <Card title="第四个功能" icon="open-book">
    这是描述第四个功能的卡片。
  </Card>
</CardGrid>

## 选项卡测试

import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="基础信息">
    这是基础信息标签页的内容。
  </TabItem>
  <TabItem label="高级设置">
    这是高级设置标签页的内容。
  </TabItem>
  <TabItem label="API参考">
    这是API参考标签页的内容。
  </TabItem>
</Tabs>

## 步骤组件测试

import { Steps } from '@astrojs/starlight/components';

<Steps>
  1. 第一步：下载项目代码
  2. 第二步：安装依赖包
     ```bash
     npm install
     ```
  3. 第三步：启动开发服务器
     ```bash
     npm run dev
     ```
  4. 第四步：在浏览器中打开网站
</Steps>

## 文件树组件测试

import { FileTree } from '@astrojs/starlight/components';

<FileTree>
  - src/
    - content/
      - docs/
        - guides/
          - getting-started.md
          - starlight-test.md
        - index.md
    - components/
      - CustomHeader.astro
      - ThemeSelect.astro
    - styles/
      - custom.css
  - astro.config.mjs
  - package.json
</FileTree> 