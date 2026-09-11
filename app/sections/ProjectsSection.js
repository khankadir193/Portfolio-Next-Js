
import { SectionTitle } from '../SectionComponents';
import ProjectCardWithModal from '../components/ProjectCardWithModal';
import styles from './ProjectsSection.module.css';
import { projectsData } from '../data/projectsData';

export default function ProjectsSection() {
  return (
    <section id="project" className={styles.projectsSection}>
      <SectionTitle>Projects</SectionTitle>
      
      <div className={styles.projectsGrid}>
        {projectsData.map((proj) => (
          <div key={proj.title} className={styles.projectsGridItem}>
            <ProjectCardWithModal project={proj} />
          </div>
        ))}
      </div>
    </section>
  );
}
