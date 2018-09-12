# Clozer Node Graphql Server

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

Download or clone

## Usage

### Description
This the express graphql api for an application that will allow users to keep track of clients and sales opportunities. This works in conjunction with any the [React frontend](https://github.com/cernanb/clozer-react)

### Installation instructions
Once you clone the project, go to [mLab](https://mlab.com/). This serves as the Mongo database service for the app. Once you sign up, click on the `Create New` button to start a new database. Select `Amazon Web Services`, then `Sandbox` (free) tier. Click `Continue`.
Select the region closest to you...click `Continue`. Enter in a name for the database (e.g. clozerdb) and click `Continue`. 

You will then be taken to your index to databases. Click on the database you just created. Click on the Users tab. Select `Add database user`. Enter in a db username and password, then click `Create`. Near the top of the page there is a box that contains the MongoDB URI. Copy that URI to your clipboard. 

Create a `.env` file at the root of the project. Add a MONGO_URI variable and set it equal to the URI you copied. Replace `<dbuser>:<dbpassword>` in the URI with the username and password for the user you just created.

In addition to the MONGO_URI, add a SESSION_SECRET variable to the `.env` file and set it equal to a string of your choice. 

 ```
MONGO_URI=mongodb://daisy:daisy@ds125881.mlab.com:34456/dbname
SESSION_SECRET=somerandomstring1234
 ```
Install `nodemon` globally `yarn global add nodemon` or `npm install -g nodemon`.

You should now be able to run `yarn start` or `npm start` to fire up the server. 

## Support

Please [open an issue](https://github.com/cernanb/clozer-graphql-server/issues/new) for support.
