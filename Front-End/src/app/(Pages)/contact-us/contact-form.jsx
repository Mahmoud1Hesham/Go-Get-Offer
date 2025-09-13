'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactForm() {
    const formRef = useRef(null)

    useEffect(() => {
        const el = formRef.current
        if (!el) return

        const title = el.querySelector('h1')
        const fields = el.querySelectorAll('.field')

        gsap.set([title, fields], { opacity: 0, y: 30 })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
        })

        tl.to(title, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        tl.to(fields, { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'power3.out' }, '-=0.3')

        return () => {
            tl.kill()
            ScrollTrigger.getAll().forEach((st) => st.kill())
        }
    }, [])

    const handleFocus = (e) => {
        const label = e.target.previousElementSibling
        if (!label) return
        gsap.to(label, {
            y: -30,
            scale: 0.9,
            color: 'var(--color-go-primary-e)',
            duration: 0.25,
            ease: 'power2.out',
        })
    }

    const handleBlur = (e) => {
        const label = e.target.previousElementSibling
        if (!label) return
        if (!e.target.value) {
            gsap.to(label, {
                y: 0,
                scale: 1,
                color: '#374151',
                duration: 0.25,
                ease: 'power2.inOut',
            })
        }
    }

    return (
        <section
            ref={formRef}
            className="w-full flex flex-col items-center bg-go-background-gr rounded-4xl py-10 px-12"
        >
            <h1 className="text-3xl text-gray-700 font-bold mb-8 text-center">
                Let's discuss your business needs!
            </h1>

            <form className="flex flex-col gap-6 w-full max-w-4xl" noValidate>
                {/* Row 1 */}
                <div className="flex gap-4">
                    <div className="relative flex-1 field">
                        <label className="absolute left-3 top-2 text-gray-500 pointer-events-none">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full bg-white"
                        />
                    </div>

                    <div className="relative flex-1 field">
                        <label className="absolute left-3 top-2 text-gray-500 pointer-events-none">
                            Company
                        </label>
                        <input
                            type="text"
                            name="company"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full bg-white"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-4">
                    <div className="relative flex-1 field">
                        <label className="absolute left-3 top-2 text-gray-500 pointer-events-none">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full bg-white"
                        />
                    </div>

                    <div className="relative flex-1 field">
                        <label className="absolute left-3 top-2 text-gray-500 pointer-events-none">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full bg-white"
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="relative field">
                    <label className="absolute left-3 top-2 text-gray-500 pointer-events-none">
                        Message
                    </label>
                    <textarea
                        name="message"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full bg-white resize-none"
                        rows={5}
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-go-primary-e text-white p-2 w-4/12 rounded-md"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </section>
    )
}
