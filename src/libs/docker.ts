import { spawn } from "./stdlibs";

export const execDocker = (command: string, service?: string) => {
  const project = process.env.npm_package_name || "supabase";
  return spawn(
    `docker compose -p ${project} -f supabase/docker/docker-compose.yml ${command} -d ${
      service || ""
    }`
  );
};
