import barberMockup from '@/src/assets/images/barber_platform_mockup_1790485324778.jpg';
import collegesMockup from '@/src/assets/images/colleges_portal_mockup_1790487091705.jpg';
import dashboardMockup from '@/src/assets/images/business_dashboard_mockup_1790487109870.jpg';
import backendDiagram from '@/src/assets/images/backend_api_diagram_1790485343073.jpg';
import restaurantMockup from '@/src/assets/images/restaurant_website_mockup_1790487126483.jpg';
import logisticsMockup from '@/src/assets/images/logistics_fleet_portal_1790485359936.jpg';

export type ProjectCategory = 
  | 'Full-Stack Business Platform' 
  | 'Education Website' 
  | 'Full-Stack Application' 
  | 'Backend / API' 
  | 'Full Stack' 
  | 'Business Website' 
  | 'Backend';

export type FilterCategory = 'All' | 'Websites' | 'Frontend' | 'Backend' | 'Full Stack' | 'Business';

export type ProjectStatus = 
  | 'Portfolio Project' 
  | 'Educational Web Project' 
  | 'Backend Portfolio Project' 
  | 'Concept Project' 
  | 'Full-Stack Project';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  filterCategories: FilterCategory[];
  status: ProjectStatus;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  featured: boolean;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    developmentFocus: string;
    architecture: string;
    keyDecisions: string[];
    technicalHighlights: string[];
    sampleCodeOrSchema?: string;
  };
}

export const projectFilterCategories: FilterCategory[] = [
  'All',
  'Websites',
  'Frontend',
  'Backend',
  'Full Stack',
  'Business',
];

export const projects: ProjectItem[] = [
  {
    id: "us-barber",
    slug: "us-barber",
    title: "U.S. Barber",
    category: "Full-Stack Business Platform",
    filterCategories: ['Full Stack', 'Business', 'Websites'],
    status: "Portfolio Project",
    featured: true,
    tagline: "Modern barber appointment scheduling, service discovery & client management platform",
    description: "A modern barber business platform designed to provide customers with a convenient way to discover barber services, explore individual staff portfolios, and book appointment slots online, supported by an administrative scheduling dashboard.",
    image: barberMockup,
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Barber and grooming service discovery",
      "Interactive service listings with durations & pricing",
      "Real-time appointment booking calendar workflow",
      "Intuitive client experience optimized for mobile & desktop",
      "Responsive UI built with Tailwind CSS & type-safe React",
      "Comprehensive shop information, operating hours & location details",
      "Direct client contact & appointment inquiry functionality"
    ],
    liveUrl: undefined, // Real URL can be added when deployed
    githubUrl: undefined,
    caseStudy: {
      overview: "U.S. Barber is a full-stack business platform built to streamline the appointment booking workflow for modern barbershops and their clients. It addresses the friction of manual phone-based appointments and schedule confusion with a transparent, responsive online experience.",
      problem: "Traditional barbershop operations often suffer from double-bookings, missed appointments, and time wasted during haircutting hours answering phone calls to confirm open slots.",
      solution: "Engineered a unified digital platform allowing clients to explore services, choose a preferred barber, and reserve an open time slot. Barbers gain an organized schedule overview to manage their day without booking overlaps.",
      developmentFocus: "Built with React 19 and TypeScript, focusing on strict type safety, modular component hierarchy, and optimistic UI transitions. Integrated with Supabase for relational data storage and real-time appointment validation, styled with clean Tailwind CSS utilities.",
      architecture: "Client application built with React and TypeScript communicating with Supabase PostgreSQL tables. Appointment intervals are segmented into discrete time blocks with conflict-checking logic to prevent concurrent slot collisions.",
      keyDecisions: [
        "Selected React with TypeScript for clean component composition and reliable compile-time interface verification.",
        "Employed Supabase to leverage PostgreSQL relational schemas with Row Level Security.",
        "Implemented a mobile-first booking calendar designed for quick, touch-friendly selections on smartphones."
      ],
      technicalHighlights: [
        "Conflict-free booking workflow validating time slot availability before confirmation",
        "Type-safe service catalog supporting custom durations and price tiers",
        "Clean, responsive interface with accessible contrast and touch targets"
      ],
      sampleCodeOrSchema: `// Appointment Slot Conflict Checker
interface BookingSlot {
  barberId: string;
  startTime: string; // ISO String
  durationMinutes: number;
}

export function isSlotAvailable(
  existingBookings: BookingSlot[],
  candidateSlot: BookingSlot
): boolean {
  const candidateStart = new Date(candidateSlot.startTime).getTime();
  const candidateEnd = candidateStart + candidateSlot.durationMinutes * 60 * 1000;

  return !existingBookings.some((booking) => {
    if (booking.barberId !== candidateSlot.barberId) return false;
    const start = new Date(booking.startTime).getTime();
    const end = start + booking.durationMinutes * 60 * 1000;
    return candidateStart < end && candidateEnd > start;
  });
}`
    }
  },
  {
    id: "abaidullah-colleges",
    slug: "abaidullah-colleges",
    title: "AbaidUllah Group of Colleges",
    category: "Education Website",
    filterCategories: ['Websites', 'Frontend', 'Business'],
    status: "Educational Web Project",
    featured: true,
    tagline: "Modern educational institution portal showcasing academic programs, admissions & campus life",
    description: "A modern educational institution website concept demonstrating clear academic navigation, comprehensive program catalogs, admissions guidelines, campus facilities, and direct student inquiry channels.",
    image: collegesMockup,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive Web Design"],
    features: [
      "Institutional overview, leadership vision & campus philosophy",
      "Academic programs catalog spanning intermediate, graduate & professional disciplines",
      "Step-by-step admissions guidelines, eligibility criteria & deadlines",
      "Campus life showcase featuring laboratories, library & student facilities",
      "Notice board for institutional news, event dates & announcements",
      "Direct student inquiry intake with form validation and campus contact details",
      "Fully responsive navigation accessible across smartphones, tablets & desktops"
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudy: {
      overview: "AbaidUllah Group of Colleges is a comprehensive educational website project engineered to establish a credible digital presence for academic campuses. It provides prospective students and parents with instant access to curriculum outlines, admissions steps, and campus facilities.",
      problem: "Many educational websites are cluttered, poorly structured for mobile devices, and make finding key admissions criteria or program syllabi frustrating for prospective students.",
      solution: "Designed and developed an organized, legible academic portal with intuitive hierarchy. Categorized degree programs, clarified admission requirements, and integrated direct contact channels.",
      developmentFocus: "Prioritized clean typographic hierarchy, WCAG 2.2 AA accessibility contrast standards, semantic HTML structure, and fluid responsive grid layouts for multi-device browsing.",
      architecture: "Modular React component architecture with separated data layers for courses, faculty departments, and admissions notices, allowing rapid content updates without code refactoring.",
      keyDecisions: [
        "Structured program offerings into searchable disciplinary tracks (Computer Science, Commerce, Science, Humanities).",
        "Engineered an interactive admissions checklist clarifying required documentation and deadlines.",
        "Employed a dark-first corporate educational aesthetic balancing authority and modern design."
      ],
      technicalHighlights: [
        "Instant client-side program search and category filtering",
        "Accessible keyboard-friendly navigation with responsive mobile drawer",
        "Optimized layout with sub-second page rendering and zero layout shifts"
      ]
    }
  },
  {
    id: "business-management-dashboard",
    slug: "business-management-dashboard",
    title: "Business Management Dashboard",
    category: "Full-Stack Application",
    filterCategories: ['Full Stack', 'Business', 'Frontend'],
    status: "Portfolio Project",
    featured: false,
    tagline: "Administrative control center for customer records, appointments & business metrics",
    description: "A modern administrative dashboard built for business owners to oversee customer interactions, schedule appointments, track service catalog offerings, and inspect operational metrics in one workspace.",
    image: dashboardMockup,
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    features: [
      "Operational metrics overview (daily bookings, active clients, scheduled hours)",
      "Customer directory with search, contact notes, and booking histories",
      "Appointment calendar with day, week, and list view modes",
      "Service catalog manager for configuring prices, descriptions, and durations",
      "Multi-column data tables with sorting, filtering, and pagination",
      "Responsive layout engineered for both desktop monitors and tablet usage"
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudy: {
      overview: "A full-stack business management application concept designed to give service entrepreneurs a clear, unified view of daily operations without relying on complex, fragmented software.",
      problem: "Small service businesses struggle to coordinate appointments across staff, frequently misplacing customer contact records and losing track of cancellations.",
      solution: "Created an intuitive control center with real-time customer lookups, interactive schedule oversight, and simple service management controls.",
      developmentFocus: "State management architecture using custom React hooks, optimistic UI updates for schedule changes, and strict TypeScript types throughout all API payloads.",
      architecture: "React SPA backed by a PostgreSQL database via Supabase. Includes role-based UI views and data-table virtualization for smooth scrolling on large customer lists.",
      keyDecisions: [
        "Used Tailwind CSS to build high-density dashboard cards and data tables without bloated UI libraries.",
        "Separated business logic from presentation components using specialized domain hooks."
      ],
      technicalHighlights: [
        "Instant multi-field customer search with debounced keystroke handling",
        "Drag-and-drop schedule adjustment simulation with instant conflict warnings",
        "Responsive sidebar navigation with collapsed state for smaller viewports"
      ]
    }
  },
  {
    id: "business-rest-api",
    slug: "business-rest-api",
    title: "Business REST API",
    category: "Backend / API",
    filterCategories: ['Backend'],
    status: "Backend Portfolio Project",
    featured: false,
    tagline: "High-performance asynchronous Python REST API with Pydantic validation & PostgreSQL",
    description: "A production-grade backend service built with Python and FastAPI. Implements Pydantic request/response validation, user authentication with JWT tokens, relational PostgreSQL integration, and automated OpenAPI documentation.",
    image: backendDiagram,
    technologies: ["Python", "FastAPI", "PostgreSQL", "Pydantic", "SQLAlchemy"],
    features: [
      "Asynchronous REST endpoints with sub-25ms response latency",
      "Pydantic data models enforcing strict schema validation and error messages",
      "OAuth2 password bearer flow with secure JWT access tokens",
      "Relational database integration using SQLAlchemy async sessions",
      "Automated OpenAPI (Swagger) and ReDoc interactive documentation",
      "Paginated list endpoints with multi-field filtering and sorting",
      "Structured exception handling returning consistent JSON error envelopes"
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudy: {
      overview: "A backend API architecture designed to demonstrate scalable Python service engineering, relational database transactions, and clean API design standards.",
      problem: "Web applications frequently experience reliability issues and data corruption when backend APIs lack strict input validation, connection pooling, and atomic transaction controls.",
      solution: "Engineered an asynchronous FastAPI REST service enforcing strict schema validation, connection pooling with PostgreSQL, and deterministic error responses.",
      developmentFocus: "Asynchronous I/O execution, database session lifecycle management, Pydantic model serialization, and clean modular routers.",
      architecture: "FastAPI running on ASGI Uvicorn workers. Database access managed via asynchronous SQLAlchemy sessions with PostgreSQL, containerized for rapid local deployment.",
      keyDecisions: [
        "Adopted FastAPI for its native async event loop and native Python type-hint integration.",
        "Implemented repository pattern to decouple HTTP handlers from database query logic."
      ],
      technicalHighlights: [
        "Automated OpenAPI schema generation with sample payloads and status codes",
        "Atomic database transactions with automatic rollback on unhandled exceptions",
        "Modular router structure with versioned prefixing (/api/v1)"
      ],
      sampleCodeOrSchema: `@router.post("/services", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
async def create_business_service(
    payload: ServiceCreateIn,
    db: AsyncSession = Depends(get_db_session),
    current_admin: User = Depends(require_admin_role)
):
    """Create a new service listing with validated pricing and duration."""
    service = BusinessService(
        title=payload.title,
        price=payload.price,
        duration_minutes=payload.duration_minutes,
        category=payload.category,
        created_by=current_admin.id
    )
    db.add(service)
    await db.commit()
    await db.refresh(service)
    return service`
    }
  },
  {
    id: "modern-ecommerce-platform",
    slug: "modern-ecommerce-platform",
    title: "Modern E-Commerce Platform",
    category: "Full Stack",
    filterCategories: ['Full Stack', 'Websites', 'Business'],
    status: "Portfolio Project",
    featured: false,
    tagline: "Product discovery, dynamic cart state management & responsive checkout flow",
    description: "A full-stack e-commerce project demonstrating an end-to-end shopping workflow: searchable product catalog, category filtering, persistent shopping cart state, and order summary generation.",
    image: logisticsMockup,
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST APIs"],
    features: [
      "Product catalog with grid/list views and category filter tabs",
      "Dynamic search with real-time text matching and price sorting",
      "Interactive product details with image galleries and variant selection",
      "Client-side cart state with local persistence and quantity controls",
      "Checkout preview summarizing subtotal, tax estimation, and shipping options",
      "Responsive design optimized for touch gestures on mobile devices"
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudy: {
      overview: "A modern e-commerce storefront project engineered to explore state synchronization between product catalogs, client-side carts, and order checkout flows.",
      problem: "E-commerce sites often suffer from slow client-side filtering, laggy cart recalculations, and checkout flows that break on mobile screens.",
      solution: "Built a reactive storefront with instant client-side filtering, persistent cart state, and an accessible step-by-step order summary.",
      developmentFocus: "Cart state architecture, memoized price calculations, accessible form inputs, and responsive layout styling with Tailwind CSS.",
      architecture: "React components utilizing Context and custom hooks for shopping bag persistence. Clean REST API interfaces ready to connect to payment processors.",
      keyDecisions: [
        "Implemented optimistic cart updates for instantaneous UI feedback on 'Add to Cart'.",
        "Used localized number formatters for currencies and tax calculations."
      ],
      technicalHighlights: [
        "Persistent cart storage surviving page refreshes",
        "Responsive drawer cart with subtotal calculation and clear CTA",
        "Strict TypeScript typing across all product attributes and cart items"
      ]
    }
  },
  {
    id: "restaurant-business-website",
    slug: "restaurant-business-website",
    title: "Restaurant Business Website",
    category: "Business Website",
    filterCategories: ['Business', 'Websites', 'Frontend'],
    status: "Concept Project",
    featured: false,
    tagline: "Editorial food menu showcase, table reservation inquiry & business location details",
    description: "A modern restaurant web presence engineered to highlight culinary offerings, food menus with category filtering, operating hours, location details, and a reservation inquiry intake.",
    image: restaurantMockup,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Mobile-First Design"],
    features: [
      "Editorial culinary menu with category tabs (Starters, Mains, Desserts, Beverages)",
      "Dietary indicators (Vegetarian, Gluten-Free, Chef Specialty)",
      "Table reservation inquiry intake form with party size and date selection",
      "Operating hours, Google Maps location integration details, and contact info",
      "Rich visual presentation with dark-mode elegance and high contrast typography",
      "Mobile-first design ensuring smooth menu reading on customer smartphones"
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudy: {
      overview: "A restaurant business website concept built to solve the common issues with restaurant sites: unreadable PDF menus, missing hours of operation, and clumsy phone-only reservations.",
      problem: "Diners frequently abandon restaurant websites that require downloading PDF menus on mobile connections or fail to clearly show reservation options.",
      solution: "Created an interactive web menu that loads instantaneously on mobile, categorizes items cleanly, and provides a direct reservation inquiry mechanism.",
      developmentFocus: "Mobile-first CSS architecture, menu item filtering, accessible form controls, and fast image loading.",
      architecture: "Static component architecture with modular menu data sets and lightweight React state for category filtering.",
      keyDecisions: [
        "Built HTML-based responsive menus replacing archaic PDF downloads.",
        "Employed high-contrast typography ensuring effortless legibility in dim restaurant lighting."
      ],
      technicalHighlights: [
        "Zero-latency menu category switching",
        "Validated reservation inquiry form capturing date, time, and guest count",
        "Fluid responsive design scaling from 320px mobile screens to desktop"
      ]
    }
  },
  {
    id: "developer-api-platform",
    slug: "developer-api-platform",
    title: "Developer API Platform",
    category: "Backend",
    filterCategories: ['Backend'],
    status: "Backend Portfolio Project",
    featured: false,
    tagline: "Dedicated backend engine showcasing FastAPI, rate limiting, and PostgreSQL transactions",
    description: "A dedicated backend API platform illustrating server-side capabilities: asynchronous route handling, rate-limiting middleware, secure token authentication, PostgreSQL query optimization, and automated test suites.",
    image: backendDiagram,
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "Pytest", "REST APIs"],
    features: [
      "Asynchronous request pipeline handling concurrent traffic efficiently",
      "Rate-limiting and security middleware protecting against abuse",
      "Relational schema modeling with normalized foreign keys and indexes",
      "Comprehensive test suite using Pytest and async test client",
      "Dockerized development and production setup with health check endpoints",
      "Configurable environment secrets and database connection pooling"
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    caseStudy: {
      overview: "A technical portfolio project designed to showcase backend engineering standards: asynchronous Python, database transaction safety, rate limiting, and automated testing.",
      problem: "Demonstrating backend competency requires showing actual server architecture, data isolation, and API design rather than just user interfaces.",
      solution: "Architected a dedicated FastAPI service with comprehensive database integration, connection pooling, and automated test coverage.",
      developmentFocus: "Python asynchronous paradigms, connection pool sizing, transactional integrity, and Docker containerization.",
      architecture: "FastAPI running with Uvicorn, PostgreSQL database, Docker container environment, and Pytest automated testing suite.",
      keyDecisions: [
        "Structured code into core, api, models, schemas, and services modules for clear separation of concerns.",
        "Integrated Alembic database migrations to ensure traceable schema versioning."
      ],
      technicalHighlights: [
        "Asyncpg connection pooling for optimized database throughput",
        "Token-based authentication with expiration and refresh mechanics",
        "Deterministic JSON API error responses with standard HTTP status codes"
      ],
      sampleCodeOrSchema: `@app.middleware("http")
async def add_process_time_and_security(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}s"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    return response`
    }
  }
];
