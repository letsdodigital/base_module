import React from "react";

const enabledModules =
  process.env.NEXT_PUBLIC_ENABLED_MODULES?.split(",") || [];

const modules = {} as Record<string, React.FC<{ id: string }>>;

(async () => {
  await Promise.all(
    enabledModules.map(async (moduleName) => {
      try {
        // Dynamically import the module's main page
        const ModulePage = (
          await import(
            `../../modules/internal/${moduleName}/frontend/pages/${moduleName}`
          )
        ).default;
        modules[moduleName] = ModulePage;
      } catch (error) {
        console.warn(
          `Module ${moduleName} not found or failed to load - ${error}`
        );
      }
    })
  );
})();

export default modules;
