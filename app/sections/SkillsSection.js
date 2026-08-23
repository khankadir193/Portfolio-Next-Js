'use client';

import { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
  const skillsListRefs = useRef([]);

  useEffect(() => {
    // Add a CSS class if a skills list overflows — checked after mount
    skillsListRefs.current.forEach((ref) => {
      if (ref && ref.scrollHeight > ref.clientHeight) {
        ref.classList.add(styles.scrollable);
      }
    });
  }, []);

  return (
    <Box id="skills" sx={{ mb: 4, py: 2 }} component="section" aria-labelledby="skills-heading">
      <SectionTitle id="skills-heading">Skills</SectionTitle>

      <Grid container spacing={3} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
        {SKILL_CATEGORIES.map((category, index) => (
          <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <article className={styles.skillCardContainer}>
              <div className={styles.skillCardIcon} aria-hidden="true">{category.icon}</div>
              <h3 className={styles.skillCardTitle}>{category.title}</h3>

              <div
                ref={(el) => { skillsListRefs.current[index] = el; }}
                className={styles.skillsList}
                role="list"
                aria-label={`${category.title} skills list`}
              >
                {category.skills.map((skill) => (
                  <TechTag key={`${category.title}-${skill}`} label={skill} variant="outline" />
                ))}
              </div>
            </article>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
