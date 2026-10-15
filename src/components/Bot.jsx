// Little agent mascot — blink / look / tilt / antenna keyframes from the reference.
export default function Bot({ size = 40, className = '' }) {
  return (
    <svg className={`bot ${className}`} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <g className="bot__tilt">
        <g className="bot__ant">
          <path d="M20 9V4" stroke="#0039ff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="3.5" r="2.4" fill="#0039ff" />
        </g>
        <rect x="6" y="9" width="28" height="23" rx="8" fill="#0039ff" />
        <rect x="9.5" y="13" width="21" height="14" rx="5" fill="#fff" />
        <g className="bot__look">
          <g className="bot__blink">
            <rect x="14" y="17" width="3.2" height="5.5" rx="1.6" fill="#101013" />
            <rect x="22.8" y="17" width="3.2" height="5.5" rx="1.6" fill="#101013" />
          </g>
        </g>
        <rect x="3" y="17" width="3" height="8" rx="1.5" fill="#5A7FFF" />
        <rect x="34" y="17" width="3" height="8" rx="1.5" fill="#5A7FFF" />
      </g>
    </svg>
  )
}
