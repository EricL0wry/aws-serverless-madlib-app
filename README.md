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

Try the full stack application live at [https://madlibs.ericmichaellowry.com](https://madlibs.ericmichaellowry.com)

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

Once you have signed up for both, you will need to configure your Serverless CLI and AWS Credentials:
[https://www.serverless.com/framework/docs/getting-started/](https://www.serverless.com/framework/docs/getting-started/)

### Getting Started

If you would like to test this deployment for yourself, it has been created with portability in mind and can be deployed in any region or stage of development. The serverless.yml files utilize variables and export values needed for interdependency. There should be no need for manual input.

1. From a terminal, clone the repository and navigate to the new local directory.

```shell
git clone https://github.com/EricL0wry/aws-serverless-madlib-app.git
cd aws-serverless-madlib-app
```

2. Install the serverless-s3-sync plugin via **NPM**.

```shell
npm install
```

3. Navigate to the services/deploy-db directory.

```shell
cd services/deploy-db
```

4. Deploy the database.

```shell
serverless deploy
```

5. Serverless will create the CloudFormation templates and deploy your application. It may take a few minutes to complete.

6. Now check your AWS Dashboard for your new resources.

7. Next, you will need to navigate to the services/api-gateway and services/connect-lambda directories and run the serverless deploy command to deploy the remaining two services respectively.

```shell
cd ../api-gateway
serverless deploy

/* Allow process to complete */

cd ../connect-lambda
serverless deploy
```

8. That's it! Take a look around in your AWS Dashboard and explore. If you would like to connect a front-end to your API Gateway endpoints, visit the front-end repo at [https://github.com/EricL0wry/madlib-app-react-front-end](https://github.com/EricL0wry/madlib-app-react-front-end).

## Amazon Connect Notes

Amazon Connect is AWS' business contact center solution and it's included in AWS' free tier. Configuring an Connect contact flow to work with this application is outside of the scope of this readme, however, there is plenty of [official documentation](https://docs.aws.amazon.com/connect/) that can help you through the process.
