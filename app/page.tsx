'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { TextureLoader } from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, X, Menu, Facebook, Instagram, MessageCircle, UserPlus } from 'lucide-react'
import * as THREE from 'three'

function CPUModel() {
  const fbx = useLoader(FBXLoader, '/models/source/projek-hd.fbx')
  const texture = useLoader(TextureLoader, '/models/textures/1209.png')

  useEffect(() => {
    fbx.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture
        child.material.needsUpdate = true
      }
    })
  }, [fbx, texture])

  return <primitive object={fbx} scale={0.01} />
}

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', darkMode)
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="bg-primary text-primary-foreground py-4 px-4 md:px-8 transition-colors duration-300 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleMenu} className="mr-4 md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">CPU Showcase</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <Image
              src="/CSA_Vector.svg"
              alt="CSA LOGO"
              width={100}
              height={100}
              className="hidden md:block"
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-background fixed top-16 left-0 right-0 z-40 shadow-lg"
          >
            <nav className="container mx-auto py-4">
              <ul className="space-y-2">
                {['Overview', 'History', 'How It Works', 'Gallery', 'Fun Facts'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase().replace(' ', '-')}`} 
                      className="block px-4 py-2 hover:bg-muted rounded transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 md:px-8 py-8">
        <section className="mb-12 text-center" id="overview">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore the Heart of Computing
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dive into the world of Central Processing Units (CPUs)
          </motion.p>
        </section>

        <section className="mb-12" aria-labelledby="model-viewer">
          <h2 id="model-viewer" className="text-3xl font-bold mb-4 text-center">Interactive 3D Model of CPU</h2>
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-4 aspect-video transition-colors duration-300">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Suspense fallback={null}>
                <CPUModel />
                <Environment preset="studio" />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
          <p className="text-center mt-2 text-muted-foreground">Interact with the 3D model by clicking and dragging</p>
        </section>

        {/* Component Information */}
        <motion.section 
          className="mb-12" 
          aria-labelledby="component-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="component-info" className="text-3xl font-bold mb-4">Central Processing Unit (CPU)</h2>
          <p className="mb-4 text-lg">
            The CPU, often called the &quot;brain&quot; of the computer, is the primary component responsible for executing instructions and processing data. It interprets and carries out most of the commands from the computer&apos;s hardware and software.
          </p>
          <h3 className="text-2xl font-semibold mb-2">Key Specifications:</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Clock speed (measured in GHz): Determines how many instructions the CPU can process per second</li>
            <li>Number of cores: Allows for parallel processing, improving multitasking capabilities</li>
            <li>Cache size: Faster memory that stores frequently used data for quick access</li>
            <li>Instruction set architecture: Defines the CPU&apos;s fundamental operations and capabilities</li>
          </ul>
        </motion.section>

        {/* Historical Timeline */}
        <section className="mb-12" id="history" aria-labelledby="timeline">
          <h2 id="timeline" className="text-3xl font-bold mb-4 text-center">Evolution of CPU</h2>
          <div className="space-y-4">
            {[
              { year: 1971, event: "Intel 4004: First commercially available microprocessor", details: "The 4-bit CPU had 2,300 transistors and ran at 740 kHz." },
              { year: 1978, event: "Intel 8086: Introduction of x86 architecture", details: "This 16-bit processor became the foundation for modern PC architecture." },
              { year: 1993, event: "Intel Pentium: Superscalar architecture", details: "Introduced parallel execution of instructions, significantly boosting performance." },
              { year: 2005, event: "AMD Athlon 64 X2: First x86 dual-core processor", details: "Marked the beginning of multi-core processors for consumer PCs." },
              { year: 2017, event: "AMD Ryzen: High core count consumer CPUs", details: "Brought 8-core, 16-thread processors to mainstream consumers." }
            ].map((milestone, index) => (
              <motion.div 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 font-bold text-blue-600 dark:text-blue-400">{milestone.year}</div>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700 transition-colors duration-300"></div>
                <div className="flex-shrink-0 w-3/4 pl-4">
                  <h3 className="font-semibold">{milestone.event}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Information Sections */}
        <section className="mb-12 space-y-8" id="how-it-works" aria-labelledby="detailed-info">
          <h2 id="detailed-info" className="text-3xl font-bold mb-4 text-center">How CPUs Work</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">The Fetch-Decode-Execute Cycle</h3>
            <p className="text-lg">
              A CPU operates by fetching instructions from memory, decoding them, executing the instructions, and then storing the results. This process, known as the fetch-decode-execute cycle, happens billions of times per second in modern CPUs. The CPU&apos;s clock speed determines how many cycles it can perform per second, while its architecture influences how efficiently it can process these instructions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Historical Development</h3>
            <p className="text-lg">
              CPU development has been marked by continuous improvements in speed, efficiency, and complexity. From the first microprocessors in the early 1970s to today&apos;s multi-core behemoths, CPUs have evolved from simple calculators to powerful computing engines. Key milestones include the introduction of 32-bit and 64-bit architectures, the development of multi-core processors, and the integration of graphics processing units (GPUs) into CPU packages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Current State and Future Prospects</h3>
            <p className="text-lg">
              Modern CPUs are pushing the boundaries of semiconductor technology, with nanometer-scale transistors and billions of transistors per chip. Current trends include the development of specialized AI accelerators, further integration of CPU and GPU technologies, and exploration of new materials and architectures to overcome the limitations of silicon. Future CPUs may incorporate quantum computing elements or neuromorphic designs that mimic the human brain&apos;s neural networks.
            </p>
          </motion.div>
        </section>

        {/* Image Gallery */}
        <section className="mb-12" id="gallery" aria-labelledby="image-gallery">
          <h2 id="image-gallery" className="text-3xl font-bold mb-4 text-center">Image Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/placeholder.svg?height=200&width=300", alt: "Early microprocessor", caption: "Intel 4004: The first commercially available microprocessor (1971)" },
              { src: "/placeholder.svg?height=200&width=300", alt: "Modern CPU", caption: "A modern multi-core CPU with its heat spreader removed" },
              { src: "/placeholder.svg?height=200&width=300", alt: "CPU die", caption: "Close-up of a CPU die, showing the intricate circuit patterns" },
            ].map((image, i) => (
              <motion.figure 
                key={i} 
                className="bg-white  dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className="w-full h-auto rounded"
                />
                <figcaption className="mt-2 text-center text-gray-600 dark:text-gray-400">{image.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* Did You Know? Section */}
        <motion.section 
          className="mb-12 bg-blue-100 dark:bg-blue-900 rounded-lg p-6 transition-colors duration-300" 
          id="fun-facts"
          aria-labelledby="did-you-know"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="did-you-know" className="text-3xl font-bold mb-4 text-center">Did You Know?</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>The first microprocessor, the Intel 4004, was the size of a thumbnail and had 2,300 transistors.</li>
            <li>Modern CPUs can have billions of transistors, with some high-end processors exceeding 50 billion transistors.</li>
            <li>CPUs can generate enough heat to fry an egg! This is why efficient cooling systems are crucial for computer performance.</li>
            <li>The world&apos;s fastest supercomputer, as of 2021, can perform over 400 quadrillion calculations per second.</li>
          </ul>
        </motion.section>
      </main>

      <footer className="bg-muted text-muted-foreground py-8 px-4 md:px-8 transition-colors duration-300">
        <div className="container mx-auto flex flex-col items-center">
          <nav className="mb-4 w-full">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-2 md:gap-4">
              {['CPU', 'GPU', 'RAM', 'Motherboard', 'SSD', 'HDD', 'Power Supply', 'Cooling', 'Case'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://www.facebook.com/CSA.Club23" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/csa.club23" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://discord.gg/CSAClub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <MessageCircle size={24} />
              <span className="sr-only">Discord</span>
            </a>
            <Link href="/register" className="text-muted-foreground hover:text-primary">
              <UserPlus size={24} />
              <span className="sr-only">Register</span>
            </Link>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="text-center">
              <p>&copy; 2024 Computer Science & Automation Club. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}