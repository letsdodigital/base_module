import modules from "@/modules";

const DynamicModulePage = ({ id, module }: { id: string; module: string }) => {
  console.log("modules", modules);
  console.log("id", id);
  console.log("module", module);

  const ModuleComponent = modules[module];

  if (!ModuleComponent) {
    return (
      <div>
        Module not found: {module} - id: {id}
      </div>
    );
  }

  // TODO: ID is not currently passing through the module.
  return <ModuleComponent id={id} />;
};

export const getServerSideProps = async (context: any) => {
  const { id, module } = context.params;

  return {
    props: {
      id,
      module,
    },
  };
};

export default DynamicModulePage;
