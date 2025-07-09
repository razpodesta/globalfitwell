// RUTA: src/app/(components)/sections/IngredientAnalysis.tsx
import { Container } from "@/app/(components)/ui/Container";

interface Ingredient {
  name: string;
  description: string;
}

interface IngredientAnalysisProps {
  title: string;
  ingredients: Ingredient[];
}

export function IngredientAnalysis({
  title,
  ingredients,
}: IngredientAnalysisProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="p-6 border border-gray-200 rounded-lg shadow-sm text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-brand-blue mb-2">
                {ingredient.name}
              </h3>
              <p className="text-brand-text-light">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
// RUTA: src/app/(components)/sections/IngredientAnalysis.tsx
