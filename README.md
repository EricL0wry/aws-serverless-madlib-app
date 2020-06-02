# AWS Serverless Framework MadLib Application

The AWS Serverless Framework MadLib Application is a Serverless deployment that creates
the back-end to serve a MadLib application.

This deployment is a monorepo that embraces the microservice pattern, meaning that
functionality is organized into modular services. There are three services that make up
this deployment:

- **deploy-db**
  - Provisions resources needed to deploy a database: Lambda, S3 Bucket, two DynamoDB tables, IAM roles
  - Uploads a JSON database file to the S3 bucket using the serverless-s3-sync plugin
  - Uses a custom plugin to invoke the Lambda, inserting the data into the database

- **api-gateway**
  - Provisions API Gateway along with three Lambda Functions
  - Creates 3 endpoints allowing users to retrieve a list of MadLibs, get details for a single MadLib, and post their own MadLib to be retrieved later by phone

- **connect-lambda**
  - Connnects an Amazon Connect call flow to the database
  - Allows users to call a phone number, enter a pin, and listen to their MadLib via text to speech.

This project also uses a separate React/Express front-end. The repo can be viewed at [https://github.com/EricL0wry/madlib-app-react-front-end](https://github.com/EricL0wry/madlib-app-react-front-end)

## Live Demo

Try the application live at [https://madlibs.ericmichaellowry.com](https://madlibs.ericmichaellowry.com)

## Technologies Used

- Serverless Framework
- AWS
  - Lambda
  - DynamoDB
  - S3
  - IAM
  - API Gateway
  - Connect
  - JavaScript SDK
- Node.js
- serverless-s3-sync plugin

## Features

- Users can get a list of available MadLibs
- Users can retrieve and fill out a MadLib template
- Users can submit their MadLib
- Users can listen to their compiled MadLib via telephone

## Development

### System Requirements

- NPM
- Node.js
- Serverless Framework CLI

### Prerequisites

Before getting started, if you do not have a Serverless and AWS account, you will need to sign up for
those first. Free accounts are available for both.

- AWS - [https://aws.amazon.com/free](https://aws.amazon.com/free)
- Serverless Framework - [https://www.serverless.com/](https://www.serverless.com/)
