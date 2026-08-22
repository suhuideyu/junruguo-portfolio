import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const introEase = 'power4.inOut'
const revealEase = 'expo.out'
const openingCompleteEvent = 'portfolio-opening-complete'

export function usePortfolioMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const previousBodyOverflow = document.body.style.overflow

    if (reducedMotion) {
      const reducedContext = gsap.context(() => {
        gsap.set('.opening-curtain', { display: 'none' })
        gsap.set(
          [
            '.hero__title-inner',
            '.section-heading__english',
            '.contact__english',
            '[data-section-copy]',
            '[data-stagger-item]',
            '[data-image-reveal]',
            '[data-project-reveal] *',
            '[data-block-reveal] *',
            '[data-contact-copy]',
            '[data-parallax]',
          ],
          { clearProps: 'all' },
        )
      }, root)
      const eventFrame = window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event(openingCompleteEvent))
      })

      return () => {
        window.cancelAnimationFrame(eventFrame)
        reducedContext.revert()
      }
    }

    document.body.style.overflow = 'hidden'

    const readySections = new WeakSet<HTMLElement>()
    const pendingReveals = new WeakMap<HTMLElement, Array<() => void>>()
    const mediaQueries = gsap.matchMedia()
    let openingFinished = false
    let openingFailsafe = 0

    const finishOpening = () => {
      if (openingFinished) return
      openingFinished = true
      window.clearTimeout(openingFailsafe)
      document.body.style.overflow = previousBodyOverflow
      gsap.set(root.querySelector('.site-header'), {
        clearProps: 'transform',
      })
      ScrollTrigger.refresh()
      window.dispatchEvent(new Event(openingCompleteEvent))
    }

    const markSectionReady = (section: HTMLElement) => {
      readySections.add(section)
      pendingReveals.get(section)?.forEach((play) => play())
      pendingReveals.delete(section)
    }

    const playAfterSectionIntro = (
      element: HTMLElement,
      play: () => void,
    ) => {
      const section = element.closest<HTMLElement>('[data-motion-section]')
      if (!section || readySections.has(section)) {
        play()
        return
      }

      const pending = pendingReveals.get(section) ?? []
      pending.push(play)
      pendingReveals.set(section, pending)
    }

    const context = gsap.context(() => {
      const openingTimeline = gsap.timeline({
        defaults: { ease: revealEase },
        onComplete: finishOpening,
      })

      gsap.set('.site-header', { yPercent: -110 })
      gsap.set('.opening-curtain__line', {
        scaleX: 0,
        transformOrigin: 'left center',
      })
      gsap.set('.opening-curtain__word-inner', {
        yPercent: 115,
        scaleX: 0.72,
        transformOrigin: 'left bottom',
      })
      gsap.set('.opening-curtain__meta', { y: 24, opacity: 0 })
      gsap.set('.hero__title-inner', {
        yPercent: 120,
        scaleX: 0.76,
        skewY: 3,
        transformOrigin: 'left bottom',
      })
      gsap.set('.hero__masthead > p', { y: 28, opacity: 0 })
      gsap.set('.hero__media', {
        clipPath: 'inset(0 0 100% 0)',
        y: 54,
      })
      gsap.set('.hero__index > *', { y: 38, opacity: 0 })
      gsap.set('.hero__brief > *', { y: 48, opacity: 0 })
      gsap.set('.hero__scroll', { y: 20, opacity: 0 })

      openingTimeline
        .to('.opening-curtain__line', {
          scaleX: 1,
          duration: 0.85,
          ease: 'power3.inOut',
        })
        .to(
          '.opening-curtain__word-inner',
          {
            yPercent: 0,
            scaleX: 1,
            duration: 1.15,
            ease: revealEase,
          },
          0.18,
        )
        .to(
          '.opening-curtain__meta',
          { y: 0, opacity: 1, duration: 0.8 },
          0.42,
        )
        .to(
          '.opening-curtain',
          {
            yPercent: -100,
            duration: 1.25,
            ease: introEase,
          },
          1.42,
        )
        .to(
          '.site-header',
          { yPercent: 0, duration: 1.05, ease: revealEase },
          1.68,
        )
        .to(
          '.hero__masthead > p',
          { y: 0, opacity: 1, duration: 0.85 },
          1.72,
        )
        .to(
          '.hero__title-inner',
          {
            yPercent: 0,
            scaleX: 1,
            skewY: 0,
            duration: 1.35,
            stagger: 0.12,
            ease: revealEase,
          },
          1.76,
        )
        .to(
          '.hero__media',
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1.45,
            ease: introEase,
          },
          2.02,
        )
        .to(
          '.hero__index > *',
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08,
          },
          2.12,
        )
        .to(
          '.hero__brief > *',
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.12,
          },
          2.18,
        )
        .to(
          '.hero__scroll',
          { y: 0, opacity: 1, duration: 0.8 },
          2.55,
        )
        .set(
          [
            '.opening-curtain__word-inner',
            '.opening-curtain__meta',
            '.hero__title-inner',
          ],
          { clearProps: 'willChange' },
        )
        .set('.opening-curtain', { display: 'none' })

      openingFailsafe = window.setTimeout(() => {
        openingTimeline.kill()
        gsap.set('.opening-curtain', { display: 'none' })
        finishOpening()
      }, 6000)

      gsap.utils
        .toArray<HTMLElement>('[data-motion-section]')
        .forEach((section) => {
          const englishTitle = section.querySelector<HTMLElement>(
            '.section-heading__english',
          )
          const sectionCopy =
            section.querySelectorAll<HTMLElement>('[data-section-copy]')
          const trigger =
            section.querySelector<HTMLElement>('.section-heading') ?? section

          if (!englishTitle) {
            markSectionReady(section)
            return
          }

          const sectionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger,
              start: 'top 82%',
              once: true,
            },
            onComplete: () => markSectionReady(section),
          })

          sectionTimeline
            .set(englishTitle, { willChange: 'transform' })
            .fromTo(
              englishTitle,
              {
                yPercent: 125,
                scaleX: 0.68,
                scaleY: 0.58,
                skewX: -6,
                transformOrigin: 'left bottom',
              },
              {
                yPercent: 0,
                scaleX: 1,
                scaleY: 1,
                skewX: 0,
                duration: 1.45,
                ease: revealEase,
              },
            )
            .fromTo(
              sectionCopy,
              { y: 70, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.05,
                stagger: 0.09,
                ease: revealEase,
              },
              0.48,
            )
            .set(englishTitle, { clearProps: 'willChange' })
        })

      gsap.utils
        .toArray<HTMLElement>('[data-stagger-group]')
        .forEach((group) => {
          const items = gsap.utils
            .toArray<HTMLElement>('[data-stagger-item]', group)
            .filter(
              (item) =>
                item.closest<HTMLElement>('[data-stagger-group]') === group,
            )
          if (items.length === 0) return

          gsap.set(items, {
            y: 96,
            opacity: 0,
            scaleY: 0.9,
            transformOrigin: 'center bottom',
          })
          const tween = gsap.to(items, {
            y: 0,
            opacity: 1,
            scaleY: 1,
            duration: 1.2,
            stagger: 0.13,
            ease: revealEase,
            paused: true,
          })
          ScrollTrigger.create({
            trigger: group,
            start: 'top 84%',
            once: true,
            onEnter: () =>
              playAfterSectionIntro(group, () => tween.play()),
          })
        })

      gsap.utils
        .toArray<HTMLElement>('[data-image-reveal]')
        .forEach((visual) => {
          gsap.set(visual, {
            clipPath: 'inset(100% 0 0 0)',
            y: 64,
          })
          const tween = gsap.to(visual, {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            duration: 1.5,
            ease: introEase,
            paused: true,
          })
          ScrollTrigger.create({
            trigger: visual,
            start: 'top 86%',
            once: true,
            onEnter: () =>
              playAfterSectionIntro(visual, () => tween.play()),
          })
        })

      gsap.utils
        .toArray<HTMLElement>('[data-project-reveal]')
        .forEach((project) => {
          const heading =
            project.querySelectorAll<HTMLElement>('.featured-project__head > *')
          const visual = project.querySelector<HTMLElement>(
            '.featured-project__visual',
          )
          const content = project.querySelectorAll<HTMLElement>(
            '.featured-project__content > *',
          )
          gsap.set(heading, { y: 68, opacity: 0 })
          gsap.set(visual, {
            clipPath: 'inset(0 100% 0 0)',
            x: -46,
          })
          gsap.set(content, { y: 72, opacity: 0 })

          const timeline = gsap
            .timeline({ paused: true })
            .to(heading, {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.09,
              ease: revealEase,
            })
            .to(
              visual,
              {
                clipPath: 'inset(0 0% 0 0)',
                x: 0,
                duration: 1.45,
                ease: introEase,
              },
              0.28,
            )
            .to(
              content,
              {
                y: 0,
                opacity: 1,
                duration: 1.05,
                stagger: 0.1,
                ease: revealEase,
              },
              0.52,
            )

          ScrollTrigger.create({
            trigger: project,
            start: 'top 82%',
            once: true,
            onEnter: () =>
              playAfterSectionIntro(project, () => timeline.play()),
          })
        })

      gsap.utils
        .toArray<HTMLElement>('[data-block-reveal]')
        .forEach((block) => {
          const headerItems =
            block.querySelectorAll<HTMLElement>(':scope > header > *')
          const bodyItems = block.querySelectorAll<HTMLElement>(
            '.repository-browser > *',
          )
          gsap.set(headerItems, { y: 62, opacity: 0 })
          gsap.set(bodyItems, { y: 92, opacity: 0, scaleY: 0.92 })

          const timeline = gsap
            .timeline({ paused: true })
            .to(headerItems, {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.1,
              ease: revealEase,
            })
            .to(
              bodyItems,
              {
                y: 0,
                opacity: 1,
                scaleY: 1,
                duration: 1.2,
                stagger: 0.16,
                ease: revealEase,
              },
              0.32,
            )

          ScrollTrigger.create({
            trigger: block,
            start: 'top 84%',
            once: true,
            onEnter: () =>
              playAfterSectionIntro(block, () => timeline.play()),
          })
        })

      const contact = root.querySelector<HTMLElement>('[data-contact-section]')
      if (contact) {
        const englishTitle =
          contact.querySelector<HTMLElement>('.contact__english')
        const content =
          contact.querySelectorAll<HTMLElement>('[data-contact-copy]')
        const contactTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: contact,
            start: 'top 72%',
            once: true,
          },
        })

        contactTimeline
          .set(englishTitle, { willChange: 'transform' })
          .fromTo(
            englishTitle,
            {
              yPercent: 125,
              scaleX: 0.65,
              scaleY: 0.55,
              transformOrigin: 'left bottom',
            },
            {
              yPercent: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 1.5,
              ease: revealEase,
            },
          )
          .fromTo(
            content,
            { y: 82, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.09,
              ease: revealEase,
            },
            0.48,
          )
          .set(englishTitle, { clearProps: 'willChange' })
      }

      mediaQueries.add(
        '(min-width: 681px) and (prefers-reduced-motion: no-preference)',
        () => {
          const parallaxTweens = gsap.utils
            .toArray<HTMLElement>('[data-parallax]')
            .map((media) =>
              gsap.fromTo(
                media,
                { yPercent: -4, scale: 1.06, willChange: 'transform' },
                {
                  yPercent: 4,
                  scale: 1.06,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: media.parentElement ?? media,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.9,
                  },
                },
              ),
            )

          return () => {
            parallaxTweens.forEach((tween) => tween.kill())
            gsap.set('[data-parallax]', {
              clearProps: 'transform,willChange',
            })
          }
        },
      )
    }, root)

    return () => {
      window.clearTimeout(openingFailsafe)
      document.body.style.overflow = previousBodyOverflow
      mediaQueries.revert()
      context.revert()
    }
  }, [rootRef])
}
