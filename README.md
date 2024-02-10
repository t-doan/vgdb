# VGDB

A full stack TypeScript project that leverages Rawg.io API to create a database web application designed to provide users an experience in searching for their favorite video games.

## Getting Started

---

In order to use Rawg.io API, you will need to sign up to get an API key to make requests.

Make sure to install any dependencies needed.
This project uses

1.  Tailwind CSS
    ```
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
2.  DaisyUI

    ```
    npm i -D daisyui@latest
    ```

    In the tailwind.config.js, add

    ```
    module.exports = {
    //...
    plugins: [require("daisyui")],
     }
    ```

3.  NodeFetch
    This project used Node v.18 so fetch is not usable so this package allows the uses of Fetch

    ```
    npm i node-fetch
    ```

Install all dependencies with `npm install`.

---

#### Create the database

If your final project will be using a database, create it now.

Start PostgreSQL

```sh
sudo service postgresql start
```

Create database (replace `name-of-database` with a name of your choosing, such as the name of your app)

```sh
createdb name-of-database
```

In the `server/.env` file, in the `DATABASE_URL` value, replace `changeMe` with the name of your database, from the last step
While you are editing `server/.env`, also change the value of `TOKEN_SECRET` to a custom value, without spaces.
Make the same changes to `server/.env.example`.

If your final project will _not_ be using a database, edit `package.json` to remove the `dev:db` script.

#### Start the development servers

Start all the development servers with the `"dev"` script:

```sh
npm run dev
```

Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where the servers are running.

#### Set up the database

In your browser navigate to the site you used for your database design.
`DBDiagram.io`

Export your database as PostgreSQL, this should generate the SQL code for creating your database tables.

- Reach out to an instructor if you have any issues with this step
  Copy the generated SQL code and paste it into `database/schema.sql` below the preexisting sql code in the file.

In a separate terminal, run `npm run db:import` to create your tables
Use `psql` to verify your tables were created successfully (see [LFZ Database Guide](https://lms.learningfuze.com/code-guides/Learning-Fuze/curriculum/database) for tips). Your database and tables should be listed; if not, stop here and reach out to an instructor for help

At this point your database is setup and you are good to start using it. However there is no data in your database, which isn't necessarily a bad thing, but if you want some starting data in your database you need to add insert statements into the `database/data.sql` file. You can add whatever starting data you need/want.
After any changes to `database/schema.sql` or `database/data.sql` re-run the `npm run db:import` command to update your database. Use `psql` to verify your changes were successfully applied.

## Deployment

Once you are ready, deployment using AWS
`npm run deploy`
