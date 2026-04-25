"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui";

const FEATURED_PROJECTS = [
  {
    id: "1",
    titleKey: "landing.featuredProjects.projects.solarGridMeshNetwork.title",
    descriptionKey:
      "landing.featuredProjects.projects.solarGridMeshNetwork.description",
    category: "Green Energy" as const,
    goal: 75000,
    raised: 15000,
    backers: 210,
    daysLeft: 45,
    imageUrl: "",
    createdAt: "2024-01-18",
  },
  {
    id: "2",
    titleKey: "landing.featuredProjects.projects.quantumLedgerExplorer.title",
    descriptionKey:
      "landing.featuredProjects.projects.quantumLedgerExplorer.description",
    category: "Tech" as const,
    goal: 50000,
    raised: 32500,
    backers: 124,
    daysLeft: 12,
    imageUrl: "",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    titleKey: "landing.featuredProjects.projects.neonDreamsVrArtGallery.title",
    descriptionKey:
      "landing.featuredProjects.projects.neonDreamsVrArtGallery.description",
    category: "Art" as const,
    goal: 25000,
    raised: 12000,
    backers: 89,
    daysLeft: 20,
    imageUrl: "",
    createdAt: "2024-01-20",
  },
];

export const FeaturedProjects: React.FC = () => {
  const { t } = useTranslation();

  const projects = FEATURED_PROJECTS.map((project) => ({
    ...project,
    title: t(project.titleKey),
    description: t(project.descriptionKey),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-transparent to-[#0a0e27]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {t("landing.featuredProjects.title")}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                  {t("landing.featuredProjects.description")}
                </p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="lg:flex-shrink-0"
              >
                <Link href="/explore" className="inline-block">
                  <Button
                    variant="secondary"
                    className="inline-flex items-center gap-2 group"
                  >
                    {t("common.actions.exploreAllProjects")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-8 sm:p-12 backdrop-blur-sm text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t("landing.featuredProjects.cta.title")}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("landing.featuredProjects.cta.body")}
            </p>
            <Link href="/dashboard" className="inline-block">
              <Button
                variant="primary"
                size="lg"
                className="inline-flex items-center gap-2"
              >
                {t("landing.featuredProjects.cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
