'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Users, GraduationCap, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Hi, I'm <span className="text-blue-600">Jiya</span> –<br />
            Pharm D Student
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            Currently a 2nd year Pharm D student at [College Name], [City]
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            I enjoy simplifying complex medical topics, creating structured study resources,
            and helping juniors build strong foundations. I like connecting with people,
            but I believe in clarity and priorities first.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/notes"
              className="group px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              View Notes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Me Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            A little about me
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm a Pharm D student who believes that healthcare education should be clear,
              structured, and accessible. My journey in pharmacy has taught me that understanding
              complex medical concepts becomes easier when broken down into simple, logical steps.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I spend my time creating study resources that help my peers grasp difficult topics
              in pharmacology, medicinal chemistry, and clinical pharmacy. I've found that teaching
              others is one of the best ways to solidify my own understanding.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Beyond academics, I'm passionate about building a community where students can learn
              together, share knowledge, and support each other through the challenging but rewarding
              journey of pharmacy education.
            </p>
          </div>
        </motion.div>
      </section>

      {/* College Life Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            My Academic Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Studies Card */}
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Studies</h3>
              <p className="text-gray-600 leading-relaxed">
                Diving deep into pharmacology, medicinal chemistry, and clinical pharmacy.
                I focus on understanding concepts rather than just memorizing facts.
              </p>
            </motion.div>

            {/* Campus Learning Card */}
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campus Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Engaging with professors, attending practical sessions, and participating
                in case studies to bridge the gap between theory and real-world application.
              </p>
            </motion.div>

            {/* Helping Juniors Card */}
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Helping Juniors</h3>
              <p className="text-gray-600 leading-relaxed">
                Creating comprehensive notes and study guides to help junior students
                navigate their pharmacy curriculum with confidence and clarity.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
