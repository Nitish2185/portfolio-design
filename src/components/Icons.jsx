const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const paths = {
  github: <path {...P} d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  linkedin: <g {...P}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></g>,
  x: <path {...P} d="M4 4l16 16M20 4L4 20" />,
  instagram: <g {...P}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></g>,
  download: <path {...P} d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />,
  arrow: <path {...P} d="M5 12h14m0 0l-5.5-5.5M19 12l-5.5 5.5" />,
  arrowUpRight: <path {...P} d="M7 17L17 7M8 7h9v9" />,
  chevron: <path {...P} d="M6 9l6 6 6-6" />,
  mail: <g {...P}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></g>,
  globe: <g {...P}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></g>,
  share: <g {...P}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></g>,
  comment: <path {...P} d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />,
  copy: <g {...P}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></g>,
  terminal: <g {...P}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M7 9l3 3-3 3M12.5 15H17" /></g>,
  badge: <g {...P}><circle cx="12" cy="9" r="6" /><path d="M8.5 13.8L7 21l5-2.5 5 2.5-1.5-7.2" /></g>,
  check: <path {...P} d="M5 12.5l4.5 4.5L19 7.5" />,
  menu: <path {...P} d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...P} d="M6 6l12 12M18 6L6 18" />,
  external: <path {...P} d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
  spark: <path fill="currentColor" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />,
  send: <path {...P} d="M4 12l16-8-6 16-2.5-6.5z" />,
}

export default function Icon({ name, size = 20, className = '', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`icon ${className}`} aria-hidden="true" {...rest}>
      {paths[name]}
    </svg>
  )
}
