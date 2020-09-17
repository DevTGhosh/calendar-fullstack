# Calendar App

You can create calendar events for different users. Create a calendar event by clicking any empty cell. The events are saved in a `db.json` file.

Project was created with Next JS, Material UI, Redux, React-Scheduler, Express & DayJs.

# Changes

- Changed the architecture of the app to have different package.json for client and server
- Added a root package.json that can be used to run both client and server directly
- Changed the route handling for `patch` and `delete` events
- Added pre-commit linting and formatting rules for both client & server

# How to run this App

- Install `git`
- Install `node version 12.18` and `npm`
- Clone the git repo `git clone https://github.com/DevTGhosh/calendar-fullstack.git`
- Run `npm i` to install concurrently
- Run `npm install-dependencies` to download the necessary node modules for both client & server
- Run `npm run build` to build the production files
- Run `npm run start`
- View the App in your browser at `localhost:3000`
