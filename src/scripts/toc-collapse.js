// 目录折叠功能
document.addEventListener('DOMContentLoaded', () => {
  const tocNav = document.querySelector('.right-sidebar nav');
  if (!tocNav) return;

  // 获取所有一级目录项
  const topLevelItems = tocNav.querySelectorAll(':scope > ul > li');
  
  topLevelItems.forEach(item => {
    const link = item.querySelector(':scope > a');
    const subList = item.querySelector(':scope > ul');
    
    if (!link || !subList) return;
    
    // 检查是否包含当前激活项
    const hasActiveChild = subList.querySelector('a[aria-current="true"]');
    
    // 默认展开包含当前页面的section或第一个section
    if (hasActiveChild || item === topLevelItems[0]) {
      item.classList.add('expanded');
    }
    
    // 添加点击事件
    link.addEventListener('click', (e) => {
      // 如果链接本身有href且不是#开头，不阻止默认行为
      if (link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
        return;
      }
      
      e.preventDefault();
      
      // 切换展开状态
      item.classList.toggle('expanded');
    });
  });
  
  // 为二级及以下的链接添加点击时自动展开父级
  const allSubLinks = tocNav.querySelectorAll('ul ul a');
  allSubLinks.forEach(link => {
    link.addEventListener('click', () => {
      const parentLi = link.closest('li').parentElement.closest('li');
      if (parentLi) {
        parentLi.classList.add('expanded');
      }
    });
  });
});

