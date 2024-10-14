"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Feather,
  MenuIcon,
  Star,
  TrendingUp,
  Users,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AnimatedSection = ({ children, direction = "up" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default function EnhancedCreativeLongBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = [
    {
      name: "Fiction",
      icon: BookOpen,
      description:
        "Explore imaginary worlds and compelling characters in our fiction category.",
    },
    {
      name: "Non-Fiction",
      icon: Feather,
      description:
        "Discover real-world insights and knowledge in our non-fiction collection.",
    },
    {
      name: "Poetry",
      icon: Users,
      description:
        "Experience the beauty of language and emotion through our curated poetry.",
    },
    {
      name: "Essays",
      icon: TrendingUp,
      description:
        "Engage with thought-provoking ideas and arguments in our essay section.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-50">
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-black ">
            OceanInk
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="text-blue-800 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-blue-800 hover:text-blue-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-blue-800 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-blue-800 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <XIcon className="text-blue-600" />
              ) : (
                <MenuIcon className="text-blue-600" />
              )}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <Link
                href="/"
                className="text-blue-800 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-blue-800 hover:text-blue-600 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-blue-800 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-blue-800 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </header>

      <main className="flex-grow pt-16">
        <section className="relative h-screen flex items-center overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <Image
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Ocean waves"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                Dive into OceanInk
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                Where Words Flow Like Waves
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="bg-black text-white">
                  Start Your Journey
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black border-white hover:bg-white hover:text-black-600"
                >
                  Explore Stories
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="text-white w-8 h-8" />
          </motion.div>
        </section>
        {/* <section className="relative h-screen flex items-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <Image 
              src="https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80" 
              alt="Typewriter" 
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">MONOBLOG</h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Where Words Paint Pictures</p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">Start Reading</Button>
            </motion.div>
          </div>
        </section> */}

        <AnimatedSection>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "The Silent Typewriter",
                    excerpt:
                      "In the attic, dust-covered keys held untold stories...",
                    image:
                      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  },
                  {
                    title: "Whispers in the Library",
                    excerpt: "The old books seemed to come alive at night...",
                    image:
                      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1290&q=80",
                  },
                  {
                    title: "The Last Page",
                    excerpt: "As she turned the final page, reality shifted...",
                    image:
                      "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  },
                ].map((story, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <Button
                          variant="outline"
                          className="text-white border-white hover:bg-white hover:text-black"
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                      <p className="text-gray-600">{story.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="left">
          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <h2 className="text-4xl font-bold mb-6">
                    Be the Voice of Your Generation
                  </h2>
                  <p className="text-xl mb-6">
                    Share your unique perspective and inspire others with your
                    words. Join our community of passionate writers and make
                    your mark on the world.
                  </p>
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Start Writing Today
                  </Button>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="absolute inset-0 bg-blue-200 transform -rotate-6 rounded-lg"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"
                    alt="Writing"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg relative z-10"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Explore Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((category, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden group cursor-pointer"
                  >
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <category.icon className="w-12 h-12 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 relative mb-8 md:mb-0">
                  <div className="absolute inset-0 bg-blue-500 transform rotate-6 rounded-lg"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Community"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg relative z-10"
                  />
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <h2 className="text-4xl font-bold mb-6">
                    Join Our Thriving Community
                  </h2>
                  <p className="text-xl mb-6">
                    Connect with like-minded writers, receive feedback on your
                    work, and participate in writing challenges to hone your
                    skills.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    Explore Community
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Writing Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Writing Prompts",
                    icon: Feather,
                    description: "Get inspired with our daily writing prompts.",
                  },
                  {
                    title: "Grammar Guide",
                    icon: BookOpen,
                    description:
                      "Improve your writing with our comprehensive grammar guide.",
                  },
                  {
                    title: "Publishing Tips",
                    icon: TrendingUp,
                    description:
                      "Learn how to get your work published and reach a wider audience.",
                  },
                ].map((resource, i) => (
                  <Card key={i} className="text-center">
                    <CardHeader>
                      <resource.icon className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                      <CardTitle>{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{resource.description}</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline">Learn More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="left">
          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Subscription Packages
              </h2>
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        name: "Basic",
                        price: "$9.99",
                        features: [
                          "Access to all articles",
                          "Join writing groups",
                          "Participate in challenges",
                        ],
                      },
                      {
                        name: "Pro",
                        price: "$19.99",
                        features: [
                          "All Basic features",
                          "Priority feedback",
                          "Exclusive workshops",
                          "Ad-free experience",
                        ],
                      },
                      {
                        name: "Elite",
                        price: "$39.99",
                        features: [
                          "All Pro features",
                          "1-on-1 mentoring",
                          "Publishing opportunities",
                          "Featured author status",
                        ],
                      },
                    ].map((plan, i) => (
                      <Card
                        key={i}
                        className={i === 1 ? "border-blue-500 border-2" : ""}
                      >
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold">
                            {plan.name}
                          </CardTitle>
                          <CardDescription className="text-3xl font-bold">
                            {plan.price}/month
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, j) => (
                              <li key={j} className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Choose Plan</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="yearly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        name: "Basic",
                        price: "$95.90",
                        features: [
                          "Access to all articles",
                          "Join writing groups",
                          "Participate in challenges",
                        ],
                      },
                      {
                        name: "Pro",
                        price: "$191.90",
                        features: [
                          "All Basic features",
                          "Priority feedback",
                          "Exclusive workshops",
                          "Ad-free experience",
                        ],
                      },
                      {
                        name: "Elite",
                        price: "$383.90",
                        features: [
                          "All Pro features",
                          "1-on-1 mentoring",
                          "Publishing opportunities",
                          "Featured author status",
                        ],
                      },
                    ].map((plan, i) => (
                      <Card
                        key={i}
                        className={i === 1 ? "border-blue-500 border-2" : ""}
                      >
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold">
                            {plan.name}
                          </CardTitle>
                          <CardDescription className="text-3xl font-bold">
                            {plan.price}/year
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, j) => (
                              <li key={j} className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Choose Plan</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Success Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    story:
                      "I found my voice and published my first novel thanks to MONOBLOGs supportive community.",
                    image:
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  },
                  {
                    name: "Michael Lee",
                    story:
                      "The writing resources and feedback I received helped me land a book deal with a major publisher.",
                    image:
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  },
                ].map((story, i) => (
                  <Card
                    key={i}
                    className="flex flex-col md:flex-row overflow-hidden"
                  >
                    <div className="md:w-1/3">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                      <p className="text-gray-600">{story.story}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Start Your Writing Journey Today
              </h2>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-xl mb-8">
                  Join MONOBLOG and unlock your full potential as a writer.
                  Whether you are a beginner or a seasoned author, we have the
                  tools and community to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Sign Up Now
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Open book"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Story Awaits
              </h2>
              <p className="text-xl mb-8">
                Every great journey begins with a single word. Start yours
                today.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Begin Your Journey <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About MONOBLOG</h3>
              <p>
                A platform for writers to share their stories, connect with
                readers, and explore the power of words.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/category/fiction"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Fiction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/non-fiction"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Non-Fiction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/poetry"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Poetry
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/essays"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Essays
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>
              &copy; {new Date().getFullYear()} MONOBLOG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
