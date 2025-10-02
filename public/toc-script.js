// 目录折叠功能 - 支持所有级别的标题
function initTocCollapse() {
  const tocNav = document.querySelector('.right-sidebar-panel nav');
  if (!tocNav) {
    console.log('TOC not found');
    return;
  }

  // 递归处理所有列表项
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
        
        // 默认展开：1) 包含当前页面 2) 顶级第一个
        if (hasActiveChild || (isTopLevel && index === 0)) {
          item.classList.add('expanded');
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
}

// 页面加载时初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTocCollapse);
} else {
  setTimeout(initTocCollapse, 100);
}

// 支持 Astro View Transitions
document.addEventListener('astro:page-load', () => {
  setTimeout(initTocCollapse, 100);
});

