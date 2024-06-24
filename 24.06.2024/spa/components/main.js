function getMainHTML() {
  return `
          <main>
              <aside class="sidebar">
                  <div class="sidebar-content">
                      <h3>Sidebar</h3>
                      <ul>
                          <li><a href="#">Link 1</a></li>
                          <li><a href="#">Link 2</a></li>
                          <li><a href="#">Link 3</a></li>
                      </ul>
                  </div>
              </aside>
              <section id="post-list" class="post-list">Loading posts...</section>
          </main>
      `;
}

export { getMainHTML };
