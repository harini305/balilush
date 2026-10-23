import styles from './Menu.module.css';

export function MenuNav({ categories, label }) {
  return (
    <nav className={styles.nav} aria-label={label}>
      <ul className={`container ${styles.navList}`}>
        {categories.map((c) => (
          <li key={c.slug}>
            <a href={`#${c.slug}`}>{c.category}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MenuCategory({ category }) {
  return (
    <section id={category.slug} className={styles.category} aria-labelledby={`${category.slug}-title`}>
      <h3 id={`${category.slug}-title`} className={styles.categoryTitle}>
        {category.category}
      </h3>
      <ul className={styles.items}>
        {category.items.map((item) => (
          <li key={item.name} className={styles.item}>
            <span className={styles.itemName}>{item.name}</span>
            {item.description && <span className={styles.itemDesc}>{item.description}</span>}
          </li>
        ))}
      </ul>
      {category.notes?.length > 0 && (
        <div className={styles.notes}>
          {category.notes.map((n) => <p key={n}>{n}</p>)}
        </div>
      )}
    </section>
  );
}
