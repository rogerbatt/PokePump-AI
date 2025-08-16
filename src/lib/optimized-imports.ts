// Optimized imports for better tree shaking
// This file helps reduce bundle size by providing specific imports

// Lucide React - only import what we need
export {
  ArrowLeft,
  BarChart3,
  Search,
  X,
  AlertTriangle,
  RefreshCw,
  CheckIcon as Check,
  ChevronDownIcon as ChevronDown,
  ChevronUpIcon as ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Globe,
  XIcon,
  Moon,
  SunDim,
  Plus,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Zap,
  Shield,
  Swords,
  Target,
  Eye,
  Filter,
  ArrowRight,
  Heart,
  Sun,
  MapPin,
  Clock,
  Users,
  Award,
  Sword,
  Star,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Motion - optimized imports (only what we need)
export { motion, AnimatePresence } from "motion/react";

// For even better tree shaking, we could use:
// export { motion } from "motion/react";
// export { AnimatePresence } from "motion/react";
// But motion/react already has good tree shaking

// Radix UI - optimized imports
export {
  Root as DialogRoot,
  Portal as DialogPortal,
  Overlay as DialogOverlay,
  Content as DialogContent,
  Title as DialogTitle,
  Description as DialogDescription,
  Close as DialogClose,
  Trigger as DialogTrigger,
} from "@radix-ui/react-dialog";

export {
  Root as ProgressRoot,
  Indicator as ProgressIndicator,
} from "@radix-ui/react-progress";

export {
  Root as SelectRoot,
  Trigger as SelectTrigger,
  Value as SelectValue,
  Content as SelectContent,
  Item as SelectItem,
  ItemText as SelectItemText,
  ItemIndicator as SelectItemIndicator,
  Viewport as SelectViewport,
} from "@radix-ui/react-select";

export { Slot } from "@radix-ui/react-slot";

// Utility functions - optimized
export { clsx } from "clsx";
export { cva } from "class-variance-authority";
export { twMerge } from "tailwind-merge";

// React Query - optimized imports
export {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// React Router - optimized imports
export {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  Navigate,
} from "react-router-dom";

// i18next - optimized imports
export { useTranslation } from "react-i18next";
export { t } from "i18next";
