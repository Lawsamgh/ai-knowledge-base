<template>
  <div class="min-h-screen flex flex-col w-full">
    <Header />
    
    <main class="flex-grow container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 max-w-full w-full lg:px-8 h-[calc(100vh-var(--header-height)-var(--footer-height))] overflow-y-auto mt-[var(--header-height)]">
      <div class="w-full mx-auto text-center pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-900 dark:text-white">
          Promasidor GH Knowledge Assistant
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 md:mb-10 text-gray-700 dark:text-gray-300 px-2 max-w-4xl mx-auto font-light">
          Your intelligent assistant for accessing information about Promasidor, our products, policies, and more.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 px-2">
          <router-link v-if="isAuthenticated" to="/chat" class="btn btn-primary text-center text-sm sm:text-base md:text-lg py-2 sm:py-2.5 md:py-3 px-6 md:px-8 hover:text-white">
            Ask About Promasidor
          </router-link>
          <button v-if="!isAuthenticated" @click="openLoginModal" class="btn btn-secondary text-center text-sm sm:text-base md:text-lg py-2 sm:py-2.5 md:py-3 px-6 md:px-8 hover:text-white">
            Login to Access AI Chat
          </button>
          <button @click="toggleTheme" class="btn btn-secondary text-sm sm:text-base md:text-lg py-2 sm:py-2.5 md:py-3 px-6 md:px-8">
            {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
          </button>
        </div>
        
        <!-- Feature Cards Carousel -->
        <div 
          class="carousel-container relative max-w-6xl mx-auto px-4 mt-8 sm:mt-12 mb-12 sm:mb-16"
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
        >
          <!-- Carousel track -->
          <div class="overflow-hidden">
            <div 
              class="carousel-track flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }"
            >
              <div 
                v-for="(card, index) in featureCards" 
                :key="index"
                class="carousel-slide px-2 sm:px-3 flex-shrink-0"
                :style="{ width: `${100 / slidesToShow}%`, '--order': index + 1 }"
              >
                <FeatureCard 
                  :title="card.title" 
                  :icon="card.icon"
                  :description="card.description"
                  class="h-full carousel-card"
                />
              </div>
            </div>
          </div>
          
          <!-- Navigation Arrows -->
          <button 
            @click="prevSlide" 
            class="carousel-arrow carousel-arrow-prev absolute top-1/2 -left-4 sm:left-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 focus:outline-none z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            @click="nextSlide" 
            class="carousel-arrow carousel-arrow-next absolute top-1/2 -right-4 sm:right-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 focus:outline-none z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <!-- Dots navigation -->
          <div class="carousel-dots flex justify-center mt-6">
            <button 
              v-for="i in dotsCount" 
              :key="i"
              @click="goToSlide(i-1)"
              class="carousel-dot w-2.5 h-2.5 mx-1 rounded-full transition-colors focus:outline-none"
              :class="currentSlide === i-1 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500'"
              :aria-label="`Go to slide ${i}`"
            ></button>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
    <LoginModal :is-open="isLoginModalOpen" @close="closeLoginModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useThemeStore } from '../stores/theme';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import FeatureCard from '../components/FeatureCard.vue';
import LoginModal from '../components/LoginModal.vue';
import { supabase } from '../lib/supabase';

// Define types for feature cards
type CardIcon = 'chat' | 'database' | 'computer' | 'lightning' | 'briefcase' | 'heart' | 'globe';
interface FeatureCardData {
  title: string;
  icon: CardIcon;
  description: string;
}

const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDark);
const toggleTheme = () => themeStore.toggleTheme();

// Carousel state
const currentSlide = ref(0);
const autoPlayInterval = ref<number | null>(null);
const isHovering = ref(false);
const slidesToShow = ref(3);
const totalSlides = 6; // Total number of feature cards

// Compute the number of dots needed
const dotsCount = computed(() => {
  return totalSlides - slidesToShow.value + 1;
});

// Adjust slides to show based on screen size
const updateSlidesToShow = () => {
  if (window.innerWidth < 640) {
    slidesToShow.value = 1;
  } else if (window.innerWidth < 1024) {
    slidesToShow.value = 2;
  } else {
    slidesToShow.value = 3;
  }
};

// Start autoplay
const startAutoPlay = () => {
  if (autoPlayInterval.value) clearInterval(autoPlayInterval.value);
  autoPlayInterval.value = window.setInterval(() => {
    if (!isHovering.value) {
      nextSlide();
    }
  }, 5000);
};

// Stop autoplay
const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
};

// Navigate to next slide
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % (totalSlides - slidesToShow.value + 1);
};

// Navigate to previous slide
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + (totalSlides - slidesToShow.value + 1)) % (totalSlides - slidesToShow.value + 1);
};

// Go to a specific slide
const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Auth state
const isAuthenticated = ref(false);

// Check authentication state
const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  isAuthenticated.value = !!session;
};

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  isAuthenticated.value = !!session;
});

onMounted(() => {
  checkAuth();
  updateSlidesToShow();
  startAutoPlay();
  
  window.addEventListener('resize', updateSlidesToShow);
  
  // Cleanup on component unmount
  return () => {
    window.removeEventListener('resize', updateSlidesToShow);
    stopAutoPlay();
  };
});

// Define feature cards data
const featureCards: FeatureCardData[] = [
  {
    title: "Company Information",
    icon: "chat",
    description: "Learn about Promasidor's history, mission, vision, and corporate structure. Discover our journey from inception to becoming a leading food manufacturer in Ghana and across Africa."
  },
  {
    title: "Products & Brands",
    icon: "database",
    description: "Explore our diverse product portfolio including Cowbell, Miksi, Yumvita, Onga, and more. Get nutritional information, ingredient details, packaging options, and recipe ideas for all our products."
  },
  {
    title: "Policies & Procedures",
    icon: "computer",
    description: "Access information about company policies, standard operating procedures, quality standards, and compliance guidelines. Find answers to frequently asked questions about our corporate governance."
  },
  {
    title: "Career Opportunities",
    icon: "briefcase",
    description: "Discover employment opportunities across departments including sales, marketing, production, logistics, and administration. Learn about our training programs, benefits packages, and career advancement paths."
  },
  {
    title: "Community Initiatives",
    icon: "heart",
    description: "Explore our corporate social responsibility programs, sustainability initiatives, and community engagement activities. Learn how Promasidor Ghana is making a positive impact through education, health, and environmental projects."
  },
  {
    title: "Distribution Network",
    icon: "globe",
    description: "Get details about our nationwide distribution system, regional warehouses, partner retailers, and market coverage. Find information about becoming a distributor, retailer incentives, and our supply chain innovations."
  }
];

// Add modal state
const isLoginModalOpen = ref(false);

// Add modal handlers
const openLoginModal = () => {
  isLoginModalOpen.value = true;
};

const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};
</script>

<style scoped>
@media (min-height: 800px) {
  main {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

@media (min-width: 1280px) {
  .max-w-6xl {
    max-width: 100%;
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  main {
    max-width: 100%;
    width: 100%;
  }
}

@media (min-width: 1536px) {
  .max-w-6xl {
    max-width: 100%;
    width: 100%;
  }
}

/* Small screen adaptations */
.small-screen :deep(.p-4) {
  padding: 0.75rem !important;
}

.small-screen :deep(.text-xl) {
  font-size: 1rem !important;
}

.small-screen :deep(.text-lg) {
  font-size: 0.875rem !important;
}

/* Fill available screen space */
.min-h-screen {
  min-height: 100vh;
}

main {
  width: 100%;
}

.max-w-full {
  max-width: 100% !important;
}

/* iOS Safari fix */
@supports (-webkit-touch-callout: none) {
  main {
    height: calc(100vh - var(--header-height) - var(--footer-height));
    height: calc(-webkit-fill-available - var(--header-height) - var(--footer-height));
  }
}

/* Carousel Styles */
.carousel-container {
  overflow: hidden;
  position: relative;
  min-height: 400px; /* Increased minimum height for the carousel */
}

.carousel-track {
  will-change: transform;
  min-height: 380px; /* Ensure track has enough height */
}

.carousel-slide {
  transition: opacity 0.5s ease, transform 0.5s ease;
  min-height: 360px; /* Minimum height for slides */
}

.carousel-card {
  transform: scale(0.95);
  transition: all 0.5s ease;
  opacity: 0.85;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 100%;
  min-height: 360px; /* Increased minimum height for cards */
  display: flex;
  flex-direction: column;
}

.carousel-slide:hover .carousel-card {
  transform: scale(1.03);
  opacity: 1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.carousel-slide:nth-child(3n+1) .carousel-card {
  animation: slideIn 0.7s ease forwards;
  animation-delay: calc(0.1s * var(--order, 1));
  transform-origin: bottom left;
}

.carousel-slide:nth-child(3n+2) .carousel-card {
  animation: slideUp 0.7s ease forwards;
  animation-delay: calc(0.15s * var(--order, 1));
}

.carousel-slide:nth-child(3n+3) .carousel-card {
  animation: fadeIn 0.7s ease forwards;
  animation-delay: calc(0.2s * var(--order, 1));
  transform-origin: bottom right;
}

@keyframes slideIn {
  0% {
    transform: scale(0.9) translateX(30px);
    opacity: 0;
  }
  60% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: scale(0.9) translateY(30px);
    opacity: 0;
  }
  60% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  60% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.carousel-arrow {
  opacity: 0.6;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carousel-arrow:hover {
  opacity: 1;
  transform: translateY(-50%) scale(1.15);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
}

.carousel-dot {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.carousel-dot:hover {
  transform: scale(1.4);
}

/* Add glowing effect to the active dot */
.carousel-dots button.bg-blue-600 {
  box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
}

.dark .carousel-dots button.bg-blue-400 {
  box-shadow: 0 0 5px rgba(96, 165, 250, 0.5);
}

/* Media queries for responsive heights */
@media (min-width: 640px) {
  .carousel-container {
    min-height: 420px;
  }
  
  .carousel-track {
    min-height: 400px;
  }
  
  .carousel-slide, .carousel-card {
    min-height: 390px;
  }
}

@media (min-width: 1024px) {
  .carousel-container {
    min-height: 450px;
  }
  
  .carousel-track {
    min-height: 430px;
  }
  
  .carousel-slide, .carousel-card {
    min-height: 420px;
  }
}
</style> 