'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ProjectCardComponent } from '../SectionComponents';
import { TechTag } from '../SectionComponents';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import styles from './ProjectCardWithModal.module.css';

/** Selector string for all focusable elements inside a container */
const FOCUSABLE = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const previousFocusRef = useRef(null);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Save the previously focused element for restoration on close
    previousFocusRef.current = document.activeElement;

    // Apply ref-counted scroll lock — cooperates with Navbar mobile menu (Issue 10)
    lockScroll();

    // Focus the first focusable element inside the modal
    const focusable = overlayRef.current?.querySelectorAll(FOCUSABLE);
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    return () => {
      unlockScroll();
      // Restore focus to the element that triggered the modal.
      // Guard against cases where the element may have been removed from the DOM.
      try {
        const target = previousFocusRef.current;
        if (target && typeof target.focus === 'function' && document.contains(target)) {
          target.focus();
        }
      } catch {
        // Silently ignore focus errors on unmount
      }
    };
  }, []);

  // Escape key and focus trap — Issue 9
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: keep Tab/Shift+Tab cycling inside the modal
      if (e.key === 'Tab') {
        const focusable = overlayRef.current?.querySelectorAll(FOCUSABLE);
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: if focus is on first element, wrap to last
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab: if focus is on last element, wrap to first
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalIcon}>📁</span>
          <h3 className={styles.modalTitle}>{project.title}</h3>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalDescription}>{project.description}</p>

          <div className={styles.modalDivider} />

          <div className={styles.modalTechSection}>
            <h4 className={styles.modalSectionTitle}>Technologies</h4>
            <div className={styles.modalTechList}>
              {project.technologies.map((tech, idx) => (
                <TechTag key={idx} label={tech} variant="filled" />
              ))}
            </div>
          </div>

          {project.link && project.link !== '#' && (
            <div className={styles.modalLinkWrapper}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                View Live Project →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCardWithModal({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <ProjectCardComponent
        {...project}
        onReadMore={openModal}
      />
      {isOpen && (
        <ProjectModal
          project={project}
          onClose={closeModal}
        />
      )}
    </>
  );
}
