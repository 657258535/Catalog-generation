function generateCatalog(articleSelector, dirSelector) {
  // 获取文章元素和目录容器元素
  const article = document.querySelector(articleSelector);
  const catalogs = document.querySelector(dirSelector);

  // 在文章元素内获取所有标题元素
  const articleHeadings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');

  // 遍历文章标题，生成目录
  articleHeadings.forEach(function(heading, index) {
      // 获取标题级别
      const headingLevel = heading.tagName.toLowerCase().replace('h', '');
      // 获取标题文本
      const headingName = heading.innerText.trim();
      let anchorName = heading.id;

      // 如果标题没有ID，则创建数字ID
      if (!anchorName) {
          anchorName = 'section-' + (index + 1);
          heading.id = anchorName; // 将数字ID赋值给标题的ID属性
      }

      // 设置不同级别标题的左边距
      let paddingLeft = 5 + (headingLevel - 1) * 5; // 5px起始值，每级标题增加5px内边距
      // 创建目录条目
      const catalogItem = document.createElement('div');
      catalogItem.classList.add('catalog', `catalog-${headingLevel}`);
      catalogItem.setAttribute('name', anchorName);
      catalogItem.innerHTML = `<a href="#${anchorName}" style="padding-left: ${paddingLeft}px;">${headingName}</a>`;
      catalogs.appendChild(catalogItem);
  });

  // 监听滚动事件，自动更新目录高亮
  window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      let currentHeading = null;

      // 找到当前正在阅读的章节标题
      for (let i = articleHeadings.length - 1; i >= 0; i--) {
          const heading = articleHeadings[i];
          const headingOffset = heading.offsetTop;
          if (headingOffset <= currentScroll + 60) {
              currentHeading = heading;
              break;
          }
      }

      // 更新目录高亮
      const anchorName = currentHeading ? currentHeading.id : '';
      const activeCatalog = document.querySelector(`.catalog[name="${anchorName}"]`);
      if (activeCatalog) {
          // 移除所有已激活的目录条目的激活状态
          document.querySelectorAll('.catalog-active').forEach(function(item) {
              item.classList.remove('catalog-active');
          });
          // 将当前活动的目录条目添加激活状态
          activeCatalog.classList.add('catalog-active');

          // 滚动目录，使当前章节可见
          catalogs.scrollTop = activeCatalog.offsetTop - catalogs.offsetTop;
      }
  });
}

// 调用函数并传入选择器参数 .article 要搜索目录的class .dir 存放目录的class
generateCatalog('.article', '.dir');

