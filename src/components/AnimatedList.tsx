import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import './AnimatedList.css'

export interface AnimatedListEntry {
  id: string
  label: string
  meta: string
  secondary: string
}

interface AnimatedItemProps {
  children: React.ReactNode
  id: string
  index: number
  selected: boolean
  onMouseEnter: () => void
  onClick: () => void
}

function AnimatedItem({
  children,
  id,
  index,
  selected,
  onMouseEnter,
  onClick,
}: AnimatedItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const inView = useInView(itemRef, { amount: 0.42 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={itemRef}
      id={id}
      className={`animated-list__item${selected ? ' is-selected' : ''}`}
      role="option"
      aria-selected={selected}
      data-index={index}
      initial={reduceMotion ? false : { y: 18, scale: 0.97, opacity: 0 }}
      animate={
        reduceMotion || inView
          ? { y: 0, scale: 1, opacity: 1 }
          : { y: 18, scale: 0.97, opacity: 0 }
      }
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedListProps {
  items: AnimatedListEntry[]
  onItemSelect?: (item: AnimatedListEntry, index: number) => void
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
  ariaLabel?: string
}

export default function AnimatedList({
  items,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  displayScrollbar = true,
  initialSelectedIndex = 0,
  ariaLabel = '可滑动作品目录',
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const listId = useId().replaceAll(':', '')
  const reduceMotion = useReducedMotion()
  const safeInitialIndex =
    items.length === 0
      ? -1
      : Math.min(Math.max(initialSelectedIndex, 0), items.length - 1)
  const [selectedIndex, setSelectedIndex] = useState(safeInitialIndex)
  const [keyboardNavigation, setKeyboardNavigation] = useState(false)
  const [topGradientOpacity, setTopGradientOpacity] = useState(0)
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

  const selectItem = useCallback(
    (index: number, fromKeyboard = false) => {
      if (index < 0 || index >= items.length) return
      setSelectedIndex(index)
      setKeyboardNavigation(fromKeyboard)
      onItemSelect?.(items[index], index)
    },
    [items, onItemSelect],
  )

  const handleScroll = useCallback(() => {
    const list = listRef.current
    if (!list) return

    const { scrollTop, scrollHeight, clientHeight } = list
    const bottomDistance = scrollHeight - (scrollTop + clientHeight)
    setTopGradientOpacity(Math.min(scrollTop / 52, 1))
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 52, 1),
    )
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!enableArrowNavigation || items.length === 0) return

    let nextIndex: number
    if (event.key === 'ArrowDown') {
      nextIndex = Math.min(selectedIndex + 1, items.length - 1)
    } else if (event.key === 'ArrowUp') {
      nextIndex = Math.max(selectedIndex - 1, 0)
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = items.length - 1
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault()
      onItemSelect?.(items[selectedIndex], selectedIndex)
      return
    } else {
      return
    }

    event.preventDefault()
    selectItem(nextIndex, true)
  }

  useEffect(() => {
    handleScroll()
  }, [handleScroll, items.length])

  useEffect(() => {
    if (!keyboardNavigation || selectedIndex < 0) return

    const list = listRef.current
    const selectedItem = list?.querySelector<HTMLElement>(
      `[data-index="${selectedIndex}"]`,
    )
    if (!list || !selectedItem) return

    selectedItem.scrollIntoView({
      block: 'nearest',
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    setKeyboardNavigation(false)
  }, [keyboardNavigation, reduceMotion, selectedIndex])

  return (
    <div className={`animated-list${className ? ` ${className}` : ''}`}>
      <div
        ref={listRef}
        className={`animated-list__scroll${
          displayScrollbar ? '' : ' animated-list__scroll--hidden'
        }`}
        role="listbox"
        aria-label={ariaLabel}
        aria-activedescendant={
          selectedIndex >= 0 ? `${listId}-item-${selectedIndex}` : undefined
        }
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            id={`${listId}-item-${index}`}
            index={index}
            key={item.id}
            selected={selectedIndex === index}
            onMouseEnter={() => selectItem(index)}
            onClick={() => selectItem(index)}
          >
            <span className="animated-list__number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="animated-list__copy">
              <span className="animated-list__meta">{item.meta}</span>
              <strong>{item.label}</strong>
              <span className="animated-list__secondary">{item.secondary}</span>
            </span>
            <span className="animated-list__arrow" aria-hidden="true">
              ↗
            </span>
          </AnimatedItem>
        ))}
      </div>

      {showGradients ? (
        <>
          <div
            className="animated-list__gradient animated-list__gradient--top"
            style={{ opacity: topGradientOpacity }}
            aria-hidden="true"
          />
          <div
            className="animated-list__gradient animated-list__gradient--bottom"
            style={{ opacity: bottomGradientOpacity }}
            aria-hidden="true"
          />
        </>
      ) : null}
    </div>
  )
}
