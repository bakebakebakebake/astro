// 代码块语言标签显示功能

function initCodeLanguageLabels() {
  // 查找所有代码块
  const codeBlocks = document.querySelectorAll('.expressive-code');
  
  codeBlocks.forEach((block) => {
    // 查找 header 元素
    const header = block.querySelector('.frame .header');
    if (!header) return;
    
    // 尝试从多个位置获取语言信息
    let language = '';
    
    // 1. 从 pre 标签的 data-language 属性获取（Expressive Code 默认方式）
    const pre = block.querySelector('pre');
    if (pre && pre.dataset.language) {
      language = pre.dataset.language;
    }
    
    // 2. 从 pre 标签的 class 中获取语言
    if (!language && pre) {
      const classes = Array.from(pre.classList);
      const langClass = classes.find(cls => cls.startsWith('language-'));
      if (langClass) {
        language = langClass.replace('language-', '');
      }
    }
    
    // 3. 从 code 标签的 class 中获取语言
    if (!language) {
      const code = block.querySelector('code');
      if (code) {
        const classes = Array.from(code.classList);
        const langClass = classes.find(cls => cls.startsWith('language-'));
        if (langClass) {
          language = langClass.replace('language-', '');
        }
      }
    }
    
    // 4. 从标题中提取（如果有 title）
    if (!language) {
      const titleSpan = header.querySelector('.title');
      if (titleSpan) {
        const titleText = titleSpan.textContent || '';
        // 尝试从文件扩展名推断语言
        const extensionMatch = titleText.match(/\.([a-z0-9]+)$/i);
        if (extensionMatch) {
          const ext = extensionMatch[1].toLowerCase();
          const extToLang = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'rb': 'ruby',
            'go': 'go',
            'rs': 'rust',
            'java': 'java',
            'cpp': 'c++',
            'c': 'c',
            'cs': 'c#',
            'php': 'php',
            'html': 'html',
            'css': 'css',
            'scss': 'scss',
            'json': 'json',
            'yml': 'yaml',
            'yaml': 'yaml',
            'md': 'markdown',
            'mdx': 'mdx',
            'sh': 'bash',
            'bash': 'bash',
            'sql': 'sql',
            'graphql': 'graphql',
            'vue': 'vue',
            'jsx': 'jsx',
            'tsx': 'tsx',
            'astro': 'astro',
          };
          language = extToLang[ext] || ext;
        }
      }
    }
    
    // 语言名称美化映射
    const languageDisplayNames = {
      'javascript': 'JS',
      'typescript': 'TS',
      'python': 'Python',
      'bash': 'Bash',
      'shell': 'Shell',
      'json': 'JSON',
      'yaml': 'YAML',
      'markdown': 'MD',
      'mdx': 'MDX',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sql': 'SQL',
      'graphql': 'GraphQL',
      'java': 'Java',
      'rust': 'Rust',
      'go': 'Go',
      'c': 'C',
      'c++': 'C++',
      'c#': 'C#',
      'php': 'PHP',
      'ruby': 'Ruby',
      'vue': 'Vue',
      'jsx': 'JSX',
      'tsx': 'TSX',
      'astro': 'Astro',
    };
    
    // 如果找到了语言，创建语言标签
    if (language && language !== 'plaintext' && language !== 'text') {
      // 检查是否已经有语言标签
      if (!header.querySelector('.code-language-label')) {
        const languageLabel = document.createElement('span');
        languageLabel.className = 'code-language-label';
        const displayName = languageDisplayNames[language.toLowerCase()] || language.toUpperCase();
        languageLabel.textContent = displayName;
        header.appendChild(languageLabel);
        
        console.log('添加语言标签:', displayName);
      }
    }
  });
}

// 页面加载时初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCodeLanguageLabels);
} else {
  initCodeLanguageLabels();
}

// 支持 View Transitions API
document.addEventListener('astro:page-load', initCodeLanguageLabels);
