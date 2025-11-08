import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const configPath = join(
  process.cwd(),
  ".vercel",
  "output",
  "functions",
  "_render.func",
  ".vc-config.json"
);

if (existsSync(configPath)) {
  try {
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    config.runtime = "nodejs20.x";
    writeFileSync(
      configPath,
      JSON.stringify(config, null, "\t") + "\n",
      "utf-8"
    );
    console.log("✅ Runtime actualizado a nodejs20.x en .vc-config.json");
  } catch (error) {
    console.error("❌ Error al actualizar el runtime:", error);
    process.exit(1);
  }
} else {
  console.log(
    "⚠️  Archivo .vc-config.json no encontrado, puede que el build no se haya completado"
  );
}
