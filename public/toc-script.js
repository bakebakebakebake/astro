// 目录折叠功能 - 支持所有级别的标题
// 添加全部折叠/展开按钮和自动展开当前标题功能

function initTocCollapse() {
  const tocNav = document.querySelector('.right-sidebar-panel nav');
  if (!tocNav) {
    console.log('TOC not found');
    return;
  }

  // 检查是否已经添加了控制按钮
  if (document.querySelector('.toc-controls')) {
    console.log('TOC controls already added');
    return;
  }

  // 创建控制按钮
  function createTocControls() {
    // 查找目录标题
    const tocTitle = tocNav.querySelector('h2') || tocNav.previousElementSibling?.querySelector('h2');
    if (!tocTitle) {
      console.log('TOC title not found');
      return;
    }

    // 创建控制按钮容器
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'toc-controls';
    controlsContainer.innerHTML = `
      <button class="toc-control-btn locate-current" title="定位当前标题" aria-label="定位当前标题位置">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>
      <button class="toc-control-btn expand-all" title="全部展开" aria-label="全部展开目录">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>
      <button class="toc-control-btn collapse-all" title="全部折叠" aria-label="全部折叠目录">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          <path d="M12 2v20"/>
        </svg>
      </button>
    `;

    // 创建标题容器
    const titleContainer = document.createElement('div');
    titleContainer.className = 'toc-header';
    titleContainer.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--sl-color-gray-4);
    `;

    // 移动标题到新容器
    titleContainer.appendChild(tocTitle.cloneNode(true));
    titleContainer.appendChild(controlsContainer);

    // 替换原始标题
    tocTitle.parentNode.replaceChild(titleContainer, tocTitle);

    // 添加按钮样式
    const style = document.createElement('style');
    style.textContent = `
      .toc-controls {
        display: flex;
        gap: 0.25rem;
      }

      .toc-control-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 1px solid var(--sl-color-gray-4);
        border-radius: 6px;
        background: var(--sl-color-gray-7);
        color: var(--sl-color-gray-2);
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 0;
      }

      .toc-control-btn:hover {
        background: var(--sl-color-gray-6);
        border-color: var(--sl-color-gray-3);
        color: var(--sl-color-gray-1);
        transform: translateY(-1px);
      }

      .toc-control-btn:active {
        transform: translateY(0);
      }

      .toc-control-btn svg {
        width: 14px;
        height: 14px;
      }

      .toc-control-btn.locate-current {
        background: var(--sl-color-accent-low);
        border-color: var(--sl-color-accent);
        color: var(--sl-color-accent);
      }

      .toc-control-btn.locate-current:hover {
        background: var(--sl-color-accent);
        color: var(--sl-color-white);
        transform: translateY(-1px) scale(1.05);
      }

      /* 深色模式 */
      :root[data-theme="dark"] .toc-header {
        border-bottom-color: var(--sl-color-gray-5);
      }

      :root[data-theme="dark"] .toc-title {
        color: var(--sl-color-gray-2);
      }

      :root[data-theme="dark"] .toc-control-btn {
        background: var(--sl-color-gray-6);
        border-color: var(--sl-color-gray-5);
        color: var(--sl-color-gray-3);
      }

      :root[data-theme="dark"] .toc-control-btn:hover {
        background: var(--sl-color-gray-5);
        border-color: var(--sl-color-gray-4);
        color: var(--sl-color-gray-1);
      }

      :root[data-theme="dark"] .toc-control-btn.locate-current {
        background: rgba(var(--sl-color-accent-rgb), 0.2);
        border-color: var(--sl-color-accent);
        color: var(--sl-color-accent);
      }

      :root[data-theme="dark"] .toc-control-btn.locate-current:hover {
        background: var(--sl-color-accent);
        color: var(--sl-color-white);
        transform: translateY(-1px) scale(1.05);
      }

      /* 目录项高亮样式 */
      .toc-item-highlighted {
        background-color: var(--sl-color-accent-low) !important;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }

      .toc-item-highlighted > a {
        color: var(--sl-color-accent) !important;
        font-weight: 600 !important;
      }

      :root[data-theme="dark"] .toc-item-highlighted {
        background-color: rgba(var(--sl-color-accent-rgb), 0.2) !important;
      }

      :root[data-theme="dark"] .toc-item-highlighted > a {
        color: var(--sl-color-accent) !important;
      }
    `;
    document.head.appendChild(style);

    return controlsContainer;
  }

  // 创建控制按钮
  const controlsContainer = createTocControls();
  if (!controlsContainer) return;

  const expandBtn = controlsContainer.querySelector('.expand-all');
  const collapseBtn = controlsContainer.querySelector('.collapse-all');
  const locateBtn = controlsContainer.querySelector('.locate-current');

  // 定位当前标题功能
  locateBtn.addEventListener('click', () => {
    // 查找当前激活的目录项
    const activeLink = tocNav.querySelector('a[aria-current="true"]');
    if (activeLink) {
      const targetId = activeLink.getAttribute('href')?.substring(1); // 移除 # 号
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // 1. 平滑滚动到目标元素
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
          
          // 2. 添加页面标题高亮效果
          targetElement.style.transition = 'background-color 0.3s ease';
          targetElement.style.backgroundColor = 'var(--sl-color-accent-low)';
          
          // 3. 定位并高亮目录中的对应项
          locateAndHighlightTocItem(activeLink);
          
          // 4. 2秒后移除高亮效果
          setTimeout(() => {
            targetElement.style.backgroundColor = '';
            // 移除目录项的高亮
            const highlightedTocItem = tocNav.querySelector('.toc-item-highlighted');
            if (highlightedTocItem) {
              highlightedTocItem.classList.remove('toc-item-highlighted');
            }
          }, 2000);
          
          console.log('定位到标题:', targetId);
        }
      }
    } else {
      // 如果没有激活的目录项，尝试找到当前视口中的第一个标题
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let currentHeading = null;
      
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2 && !currentHeading) {
          currentHeading = heading;
        }
      });
      
      if (currentHeading) {
        // 1. 平滑滚动到目标元素
        currentHeading.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // 2. 添加页面标题高亮效果
        currentHeading.style.transition = 'background-color 0.3s ease';
        currentHeading.style.backgroundColor = 'var(--sl-color-accent-low)';
        
        // 3. 查找并定位目录中的对应项
        const tocLink = tocNav.querySelector(`a[href="#${currentHeading.id}"]`);
        if (tocLink) {
          locateAndHighlightTocItem(tocLink);
        }
        
        // 4. 2秒后移除高亮效果
        setTimeout(() => {
          currentHeading.style.backgroundColor = '';
          // 移除目录项的高亮
          const highlightedTocItem = tocNav.querySelector('.toc-item-highlighted');
          if (highlightedTocItem) {
            highlightedTocItem.classList.remove('toc-item-highlighted');
          }
        }, 2000);
        
        console.log('定位到当前视口标题:', currentHeading.id);
      } else {
        console.log('未找到可定位的标题');
      }
    }
  });

  // 定位并高亮目录项的函数
  function locateAndHighlightTocItem(tocLink) {
    if (!tocLink) return;
    
    // 1. 展开所有父级目录项
    let parentLi = tocLink.closest('li');
    while (parentLi) {
      const parentSubList = parentLi.querySelector('ul');
      if (parentSubList) {
        parentLi.classList.add('expanded');
      }
      parentLi = parentLi.parentElement?.closest('li');
    }
    
    // 2. 滚动目录到对应位置
    const tocContainer = tocNav.closest('.right-sidebar-panel');
    if (tocContainer) {
      // 计算目标位置
      const containerRect = tocContainer.getBoundingClientRect();
      const linkRect = tocLink.getBoundingClientRect();
      const containerScrollTop = tocContainer.scrollTop;
      
      // 计算需要滚动的距离
      const targetScrollTop = containerScrollTop + (linkRect.top - containerRect.top) - (containerRect.height / 2);
      
      // 平滑滚动目录
      tocContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
    
    // 3. 添加目录项高亮效果
    const tocItem = tocLink.closest('li');
    if (tocItem) {
      tocItem.classList.add('toc-item-highlighted');
    }
  }

  // 全部展开功能
  expandBtn.addEventListener('click', () => {
    const allItems = tocNav.querySelectorAll('li.has-children');
    allItems.forEach(item => {
      item.classList.add('expanded');
    });
    console.log('全部展开');
  });

  // 全部折叠功能
  collapseBtn.addEventListener('click', () => {
    const allItems = tocNav.querySelectorAll('li.has-children');
    allItems.forEach(item => {
      item.classList.remove('expanded');
    });
    console.log('全部折叠');
  });

  // 递归处理所有列表项，默认全部折叠
  function processListItems(container) {
    const items = container.querySelectorAll(':scope > li');
    
    items.forEach((item, index) => {
      const link = item.querySelector(':scope > a');
      const subList = item.querySelector(':scope > ul');
      
      if (!link) return;
      
      // 如果有子列表，标记为可折叠
      if (subList && subList.children.length > 0) {
        item.classList.add('has-children');
        
        // 检查是否包含当前激活项
        const hasActiveChild = subList.querySelector('a[aria-current="true"]');
        const isTopLevel = container === tocNav.querySelector('ul');
        
        // 默认折叠，除非包含当前页面
        if (hasActiveChild) {
          item.classList.add('expanded');
        } else {
          item.classList.remove('expanded');
        }
        
        // 添加点击事件（只在链接部分，不影响子项）
        link.addEventListener('click', function(e) {
          // 阻止默认跳转
          e.preventDefault();
          e.stopPropagation();
          
          // 切换展开状态
          item.classList.toggle('expanded');
        });
        
        // 递归处理子列表
        processListItems(subList);
      } else {
        // 没有子项，移除可能存在的类
        item.classList.remove('has-children');
      }
    });
  }
  
  // 从根列表开始处理
  const rootList = tocNav.querySelector('ul');
  if (rootList) {
    processListItems(rootList);
  }

  // 自动展开当前浏览的标题
  function autoExpandCurrentHeading() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // 创建 Intersection Observer 来监听标题
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const headingId = entry.target.id;
          const tocLink = tocNav.querySelector(`a[href="#${headingId}"]`);
          
          if (tocLink) {
            // 找到包含此链接的父级列表项
            let parentLi = tocLink.closest('li');
            while (parentLi) {
              const parentSubList = parentLi.querySelector('ul');
              if (parentSubList) {
                parentLi.classList.add('expanded');
              }
              parentLi = parentLi.parentElement?.closest('li');
            }
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    // 观察所有标题
    headings.forEach(heading => {
      if (heading.id) {
        observer.observe(heading);
      }
    });
  }

  // 初始化自动展开功能
  autoExpandCurrentHeading();
}

// 页面加载时初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTocCollapse);
} else {
  initTocCollapse();
}

// 支持 View Transitions API
document.addEventListener('astro:page-load', initTocCollapse);