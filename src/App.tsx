import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/organisms";
import ErrorBoundary from "@/components/organisms/errorBoundary";
import { PokeBallIcon } from "@/components/atoms";

const PokemonListPage = React.lazy(() =>
  import("@/components/pages").then((module) => ({
    default: module.PokemonListPage,
  }))
);
const PokemonDetailPage = React.lazy(() =>
  import("@/components/pages").then((module) => ({
    default: module.PokemonDetailPage,
  }))
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <PokeBallIcon className="w-16 h-16 animate-spin" />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-background font-geist">
      <ErrorBoundary>
        <Header />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<PokemonListPage />} />
                <Route path="/p/:name" element={<PokemonDetailPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;
