'use client';

import { useState, useRef, useCallback, useEffect, useId } from 'react';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import styles from './AIAssistant.module.css';

// ─── Suggested starter questions ──────────────────────────────────────────────
const SUGGESTIONS = [
  'Summarize Abdul Kadir\'s React experience',
  'Explain the AI SaaS Dashboard project',
  'What technologies has he worked with?',
  'Tell me about his work experience',
  'What is his educational background?',
  'What are his key achievements?',
];

// ─── Icons (inline SVG — no extra dependency) ─────────────────────────────────
function BotIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M8 15h.01M12 15h.01M16 15h.01" strokeWidth="2.5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className={`${styles.message} ${styles.messageAssistant}`} aria-live="polite" aria-label="AI is typing">
      <span className={styles.messageRole}>Assistant</span>
      <div className={styles.typingIndicator}>
        <span className={styles.typingDot} />
        <span className={styles.typingDot} />
        <span className={styles.typingDot} />
      </div>
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isError = message.isError;
  return (
    <div
      className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAssistant} ${
        isError ? styles.messageError : ''
      }`}
    >
      <span className={styles.messageRole}>{isUser ? 'You' : 'Assistant'}</span>
      <div className={styles.messageBubble}>{message.content}</div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
const MAX_CHARS = 500;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const previousFocusRef = useRef(null);
  const dialogId = useId();

  // Scroll to the latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Open/close with scroll lock + focus management
  const openPanel = useCallback(() => {
    previousFocusRef.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    // Restore focus to trigger button
    try {
      const target = previousFocusRef.current;
      if (target && typeof target.focus === 'function' && document.contains(target)) {
        target.focus();
      }
    } catch {
      // ignore
    }
  }, []);

  // Lock scroll on mobile when panel is open
  useEffect(() => {
    if (isOpen) {
      // Only lock on small screens — panel is floating on desktop
      if (window.innerWidth < 480) lockScroll();
      // Focus input after animation frame
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        cancelAnimationFrame(raf);
        if (window.innerWidth < 480) unlockScroll();
      };
    }
  }, [isOpen]);

  // Escape key closes panel; focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closePanel();
        return;
      }
      // Focus trap inside panel
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const idx = focusable.indexOf(document.activeElement);
        if (e.shiftKey) {
          if (idx <= 0) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (idx === -1 || idx === focusable.length - 1) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePanel]);

  // Auto-resize textarea
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
    // Reset height first to allow shrinking
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  }, []);

  // Send question to API
  const sendMessage = useCallback(
    async (questionText) => {
      const question = (questionText ?? input).trim();
      if (!question || isLoading) return;
      if (question.length > MAX_CHARS) return;

      // Append user message immediately
      const userMsg = { role: 'user', content: question };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
      setIsLoading(true);

      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        });

        const data = await res.json();

        if (data.success) {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.message ?? 'Something went wrong. Please try again.',
              isError: true,
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Network error — please check your connection and try again.',
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage();
    },
    [sendMessage]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const handleSuggestion = useCallback(
    (suggestion) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  const showSuggestions = messages.length === 0 && !isLoading;
  const charOver = input.length > MAX_CHARS;

  return (
    <>
      {/* ─── Floating trigger button ─────────────────────────────────────── */}
      <button
        id="ai-assistant-trigger"
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={isOpen ? closePanel : openPanel}
        aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
        aria-expanded={isOpen}
        aria-controls={isOpen ? dialogId : undefined}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <BotIcon className={styles.triggerIcon} />
        )}
      </button>

      {/* ─── Chat panel ──────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          id={dialogId}
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="false"
          aria-label="AI Portfolio Assistant"
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerIcon} aria-hidden="true">🤖</div>
            <div className={styles.headerText}>
              <p className={styles.headerTitle}>Portfolio Assistant</p>
              <p className={styles.headerSubtitle}>Ask about Abdul Kadir&apos;s experience &amp; skills</p>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closePanel}
              aria-label="Close assistant panel"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages} aria-live="polite" aria-relevant="additions">
            {showSuggestions && (
              <div className={styles.welcome}>
                <span className={styles.welcomeEmoji}>👋</span>
                <p className={styles.welcomeTitle}>Hi! I&apos;m Abdul Kadir&apos;s AI assistant.</p>
                <p className={styles.welcomeText}>
                  Ask me anything about his skills, projects, or experience.
                </p>
                <div className={styles.suggestions}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={styles.suggestionBtn}
                      onClick={() => handleSuggestion(s)}
                      disabled={isLoading}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {/* Input */}
          <form className={styles.inputArea} onSubmit={handleFormSubmit} noValidate>
            <textarea
              ref={inputRef}
              id="ai-assistant-input"
              className={styles.inputField}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, experience…"
              aria-label="Your question"
              rows={1}
              maxLength={MAX_CHARS + 50}
              disabled={isLoading}
              autoComplete="off"
              spellCheck="true"
            />
            <button
              type="submit"
              className={styles.sendBtn}
              aria-label="Send question"
              disabled={isLoading || !input.trim() || charOver}
            >
              <SendIcon />
            </button>
          </form>
          {input.length > MAX_CHARS * 0.85 && (
            <p className={`${styles.charCount} ${charOver ? styles.charCountOver : ''}`}>
              {input.length}/{MAX_CHARS}
            </p>
          )}
        </div>
      )}
    </>
  );
}
