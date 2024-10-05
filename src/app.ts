import { Enforcer, newEnforcer } from "casbin";
import { SequelizeAdapter } from "casbin-sequelize-adapter";
import path from "path";

class Casbin {
  private static enforcer: Enforcer;

  private static async setup(): Promise<void> {
    // Initialize a Sequelize adapter and use it in a Node-Casbin enforcer:
    // The adapter can not automatically create database.
    // But the adapter will automatically and use the table named "casbin_rule".
    // The second boolean argument: autoCreateTable determines whether the adapter will automatically create the "casbin_rule" table.
    // ORM should not create databases automatically.
    console.log("heerree");

    const a = await SequelizeAdapter.newAdapter(
      {
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123456",
        database: "test",
        dialect: "postgres",
        logging: false,
      },
      true
    );

    const modelPath = path.join(__dirname, "./", "model.conf");
    console.log(modelPath);

    this.enforcer = await newEnforcer(modelPath, a);
    await this.enforcer.loadPolicy();

    // console.log({ a });

    // const e = await this.enforcer.newEnforcer("examples/rbac_model.conf", a);

    // Check the permission.
    // e.enforce("alice", "data1", "read");

    // Modify the policy.
    // await e.addPolicy(...);
    // await e.removePolicy(...);

    // Save the policy back to DB.
    // await e.savePolicy();
  }

  static async initializeEnforcer(): Promise<void> {
    await this.setup();

    // Now enforcer is guaranteed to be initialized
    if (!this.enforcer) {
      throw new Error("Enforcer setup failed.");
    }
  }
}

Casbin.initializeEnforcer();
