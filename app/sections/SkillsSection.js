
import { SectionTitle, TechTag } from '../SectionComponents';
import styles from './SkillsSection.module.css';
import { skillsData } from '../data/skillsData';

// Static — defined outside the component so it is never re-created.
// React Compiler (enabled in next.config.mjs) also handles memoization,
// but module-level constants are the clearest way to express static data.
const SKILL_CATEGORIES = [
  { title: 'Frontend', skills: skillsData.frontend, icon: '🎨' },
  { title: 'Backend', skills: skillsData.backend, icon: '⚙️' },
  { title: 'Software', skills: skillsData.software, icon: '🛠️' },
];

export default function SkillsSection() {
  // No useRef/useEffect needed — the cosmetic scroll-fade indicator (.scrollable)
  // has been removed. The functional scrollbar is preserved via CSS alone.

  return (
    <section id="skills" className={styles.skillsSection} aria-labelledby="skills-heading">
      <SectionTitle id="skills-heading">Skills</SectionTitle>

      <div className={styles.skillsGrid}>
        {SKILL_CATEGORIES.map((category, index) => (
          <div key={category.title} className={styles.skillsGridItem}>
            <article className={styles.skillCardContainer}>
              <div className={styles.skillCardIcon} aria-hidden="true">{category.icon}</div>
              <h3 className={styles.skillCardTitle}>{category.title}</h3>

              <div
                className={styles.skillsList}
                role="list"
                aria-label={`${category.title} skills list`}
              >
                {category.skills.map((skill) => (
                  <TechTag key={`${category.title}-${skill}`} label={skill} variant="outline" />
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
