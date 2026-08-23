import { Type, AlignLeft, Image, MousePointerClick, LayoutGrid, Briefcase, BarChart, Users, MessageSquare, Minus, Code, PlaySquare, AlignCenterVertical } from 'lucide-react';

export const ELEMENT_CATEGORIES = ['All', 'Basic', 'Content', 'Media', 'Marketing', 'Layout', 'Advanced'];

export const ELEMENT_REGISTRY: Record<string, { name: string; description: string; icon: any; category: string; defaultContent: any }> = {
  heading: {
    name: 'Heading',
    description: 'Add a formatted heading.',
    icon: Type,
    category: 'Basic',
    defaultContent: { text: 'Heading Text', level: 'h2', alignment: 'left' }
  },
  text: {
    name: 'Text Block',
    description: 'Add rich text content.',
    icon: AlignLeft,
    category: 'Basic',
    defaultContent: { content: 'I am text block. Click edit button to change this text.' }
  },
  image: {
    name: 'Single Image',
    description: 'Add an image to your page.',
    icon: Image,
    category: 'Media',
    defaultContent: { url: '', alt: '', width: 'full' }
  },
  button: {
    name: 'Button',
    description: 'Create a CTA button.',
    icon: MousePointerClick,
    category: 'Basic',
    defaultContent: { text: 'Click Here', url: '', style: 'primary', size: 'md' }
  },
  separator: {
    name: 'Separator',
    description: 'Horizontal divider line.',
    icon: Minus,
    category: 'Layout',
    defaultContent: { style: 'solid', thickness: '1px' }
  },
  spacer: {
    name: 'Spacer',
    description: 'Add vertical spacing.',
    icon: AlignCenterVertical,
    category: 'Layout',
    defaultContent: { height: '32px' }
  },
  services: {
    name: 'Services Grid',
    description: 'Display services from the database.',
    icon: LayoutGrid,
    category: 'Content',
    defaultContent: { layout: 'grid', columns: '3' }
  },
  caseStudies: {
    name: 'Case Studies',
    description: 'Display portfolio/case studies.',
    icon: Briefcase,
    category: 'Content',
    defaultContent: { layout: 'grid', count: 3 }
  },
  statistics: {
    name: 'Statistics',
    description: 'Animated number counters.',
    icon: BarChart,
    category: 'Content',
    defaultContent: { number: '100', label: 'Completed Projects' }
  },
  testimonials: {
    name: 'Testimonials',
    description: 'Client reviews slider/grid.',
    icon: MessageSquare,
    category: 'Content',
    defaultContent: { layout: 'slider' }
  },
  clients: {
    name: 'Client Logos',
    description: 'Trust badges & client logos.',
    icon: Users,
    category: 'Marketing',
    defaultContent: {}
  },
  video: {
    name: 'Video',
    description: 'Embed YouTube or HTML5 video.',
    icon: PlaySquare,
    category: 'Media',
    defaultContent: { url: '' }
  },
  html: {
    name: 'Custom HTML',
    description: 'Add raw HTML code.',
    icon: Code,
    category: 'Advanced',
    defaultContent: { html: '<div>Hello World</div>' }
  },
  legacy_hero: {
    name: 'Legacy: Animated Hero',
    description: 'The original dark-themed animated hero section.',
    icon: LayoutGrid,
    category: 'Advanced',
    defaultContent: {
      badge: 'AI-POWERED DIGITAL AGENCY',
      titleLine1: 'WE BUILD',
      titleLine2: 'DIGITAL',
      titleLine3: 'EXPERIENCES',
      desc: 'We craft your digital presence to achieve real results. Web design, digital marketing, and smart applications for ambitious companies.',
      btn1Text: 'Start Your Project',
      btn1Url: '/contact',
      btn2Text: 'View Our Work',
      btn2Url: '/portfolio'
    }
  },
  legacy_about: {
    name: 'Legacy: About Stats',
    description: 'The original animated about and statistics section.',
    icon: LayoutGrid,
    category: 'Advanced',
    defaultContent: {
      title1: 'WE TURN VISION',
      title2: 'INTO',
      title3: 'REALITY',
      stat1Number: '500+',
      stat1Label: 'PROJECTS DELIVERED',
      stat2Number: '15+',
      stat2Label: 'YEARS EXPERIENCE',
      stat3Number: '98%',
      stat3Label: 'CLIENT SATISFACTION'
    }
  },
  legacy_services: {
    name: 'Legacy: Interactive Services',
    description: 'The original dark interactive services accordion.',
    icon: LayoutGrid,
    category: 'Advanced',
    defaultContent: {
      label: 'WHAT WE DO',
      title: 'OUR SERVICES'
    }
  },
  legacy_portfolio: {
    name: 'Legacy: Horizontal Portfolio',
    description: 'The original horizontal scrolling portfolio.',
    icon: LayoutGrid,
    category: 'Advanced',
    defaultContent: {
      label: 'SELECTED WORKS',
      title: 'FEATURED WORK',
      viewAllText: 'View All Projects'
    }
  },
  legacy_process: {
    name: 'Legacy: Process Steps',
    description: 'The original blue process steps section.',
    icon: LayoutGrid,
    category: 'Advanced',
    defaultContent: {
      title: 'HOW WE WORK',
      step1Title: 'STRATEGY',
      step1Desc: 'We start by understanding your business goals and target audience.',
      step2Title: 'DESIGN',
      step2Desc: 'Creating beautiful, intuitive interfaces that engage users.',
      step3Title: 'DEVELOPMENT',
      step3Desc: 'Building scalable, robust solutions using modern tech.'
    }
  }
};
