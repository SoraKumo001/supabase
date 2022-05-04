import { Argument, program, Option } from "commander";
import { restoreDatabase } from "../../libs/database";
import { getDatabaseHost, getDatabasePassword } from "../../libs/supabase";

export const action = async (
  fileName: string,
  options: { host?: string; password?: string }
) => {
  const host = options.host || (await getDatabaseHost());
  if (!host) {
    console.error("Host name unknown");
    return;
  }
  const password = options.host || (await getDatabasePassword());
  if (!password) {
    console.error("Password unknown");
    return;
  }
  await restoreDatabase({ host, port: 5432, password, fileName });
};

export const restore = program
  .createCommand("restore")
  .description("Restore remote databases")
  .addOption(new Option("-a, --host <host>", "Host address of database"))
  .addOption(new Option("-p, --password <password>", "Password for database"))
  .addArgument(new Argument("filename", "Dump file").argRequired())
  .action(action);
