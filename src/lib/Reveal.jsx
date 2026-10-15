import { useEffect, useRef, useState } from 'react'

/**
 * data-reveal: fades + lifts + un-blurs an element when it scrolls in,
 * using the reference transition (0.75s cubic-bezier(0.16,0.84,0.3,1)).
 * `delay` maps to the --d custom property, like the original markup.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, style, variant, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      data-reveal={variant || ''}
      className={`${className} ${shown ? 'is-in' : ''}`}
      style={{ '--d': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
